import { Injectable, NgZone, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Network } from '@ionic-native/network';
import { AppConstants } from '../avp.enum';
import { LoadingController, ToastController, AlertController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { Hardware } from '../../models/party';
import { Cookie } from 'ng2-cookies';
import * as CryptoJS  from 'crypto-js';
import * as _ from 'lodash';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class ExternalProvider {
	private store:string = "OPTUS" + AppConstants.APP_NAME;
	public isNetworkConnected=true;
	private token:string;
	private hardware: Hardware;
	cache:any={};
  	constructor (private http: Http, private network: Network, private toastCtrl: ToastController, private zone: NgZone,
  		private loadingCtrl:LoadingController, private modalCtrl: ModalController, private alertCtrl: AlertController, private logger: NGXLogger){}
	
	init (hardware: Hardware){
		try{
			if (!this.token)
			this.token = CryptoJS.AES.decrypt(Cookie.get (this.store), AppConstants.secret).toString(CryptoJS.enc.Utf8);
		} catch (e){ this.logger.debug(e); }
		this.token = this.token || "-1";
		this.hardware = hardware;
		if (hardware.isApp){
			this.network.onConnect().subscribe(() => {
				this.updateNetworkState(true);
				setTimeout(() => {
					if (this.network.type === 'none') {
						this.updateNetworkState(false);
					}
				}, 3000);
			});
			this.network.onDisconnect().subscribe(() => {
				this.updateNetworkState(false);
			});
			if (this.network.type != "none") 
				this.updateNetworkState(true);
		} else {
			window.addEventListener('online', () => {
				this.isNetworkConnected = true;
			});

			window.addEventListener('offline', () => {
				this.isNetworkConnected = false;
			});
		}
	}
	
	private updateToken (token:string){
		this.token = token;
		Cookie.set(this.store, CryptoJS.AES.encrypt (token, AppConstants.secret).toString(), 30);
		if (this.token != CryptoJS.AES.decrypt(Cookie.get (this.store), AppConstants.secret).toString(CryptoJS.enc.Utf8))
			this.showAlert ("Cookie unavailable!!! Please enable if you want the application to remember you");
		setTimeout (()=>{
			this.post ("process/0", {
				functionName: "extract party header",
				model: null
			}, false).subscribe(
			result => {
				if (result.model && result.model.title){
					this.set ("name", result.model.title);
				}
				if (result.model && result.model.images && result.model.images.length>0){
					this.set ("featureImage", AppConstants.API_ENDPOINT + result.model.images[0].path + '/' + result.model.images[0].filename + '-xl.png');
				}
			},
			error => {
				this.showToast(error);
			});
		});
	}

	signout (){
		this.token=null;
		Cookie.delete (this.store);
	}
	
	private updateNetworkState (state:boolean){
		this.zone.run(()=>{
			this.isNetworkConnected = state;
		});
	}

	post (uri, data, displayError) : Observable<any>{
		if (this.isNetworkConnected){
			//  uri = AppConstants.API_ENDPOINT + AppConstants.APP_NAME + "/" +  uri + "/" + new Date().getTimezoneOffset();
			uri = AppConstants.API_ENDPOINT + "?appName=" + AppConstants.APP_NAME + "&uri=" +  uri + "&offset=" + new Date().getTimezoneOffset();
			if (!data) data = {};
			data["device"] = this.hardware;
			data["hasDecoder"] = AppConstants.DECODER?true:false;
			
			return this.http.post(uri, data, new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'token': this.token })}))
				.map((res: Response) => {
					let response:any = res.json() || {};
					if (response.token) this.updateToken(response.token);
					delete response.token;
					return response;
				})
			   	.catch((error: Response | any) => {
			   		if (error.json().hasException) return Observable.throw(error.json().message);
			   		return this.handleError(error, displayError);
			   	});
		} else {
			return this.handleError("No Internet Connection", displayError);
		}
	}

	put (file: File, data:any, callback, error){
		if (this.isNetworkConnected){
			let uri = AppConstants.API_ENDPOINT + AppConstants.APP_NAME + "/upload/" + data.mediaType + "/" + data.id + "/" + new Date().getTimezoneOffset();
			let formData:FormData = new FormData();
			formData.append('file', file, file.name);

			this.http.post(uri, formData, new RequestOptions({ headers: new Headers({'token': this.token})}))
				.map((res: Response) => {
					callback (res.json());
				})
			   	.catch((err: Response | any) => {
			   		return error(err.json().message, data);
			   	})
			   	.subscribe(
	                data => this.logger.debug('success'),
	                error => this.logger.debug(error)
	            );
		}
		else {
			error ("No Internet Connection");
		}
	}
	
	get (key:string):any{
		return this.cache[key];
	}
	set (key:string, value:any){
		this.cache[key]=value;
	}

	showToast (message:any){
		this.toastCtrl.create({
    		message: message,
    		position: 'middle',
    		duration: 2000,
			dismissOnPageChange: true
  		}).present();
	}

	showLoading (message:any){
		let loading = this.loadingCtrl.create ({
			spinner: 'ios',
			content: message
		});
		loading.present();
		return loading;
	}

	showConfirm (settings:any){
		let confirm = this.alertCtrl.create (settings);
		confirm.present();
	}

	showPrompt (settings:any){
		let prompt = this.alertCtrl.create (settings);
		prompt.present();
	}

	uuid (){
		return AppConstants.uuid();
	}
	
	getLodash() {
		return _;
	}

	private alert: any;
	showAlert (message:any){
		if (!this.alert && message.length<140){
			this.alert = this.toastCtrl.create({
				message: message,
				position: 'middle',
				showCloseButton: true,
				closeButtonText: 'Ok'
			});
			this.alert.onDidDismiss(() => {
				this.alert = null;
			});
			this.alert.present();
		} else 
			this.modalCtrl.create (LongAlerts, { text: message }).present();
	}
	
	private handleError (error: Response | any, displayError) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
			if (error.status == 0) errMsg = "Either server / internet not available or poor internet connection. Try again!!!";
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		if (displayError) this.showToast (errMsg);
		return Observable.throw(errMsg);
	}
}

@Component({
	template: `
		<ion-header>
			<ion-navbar color="md-black">
				<ion-title>Alert</ion-title>
				<ion-buttons start>
		  			<button ion-button clear icon-only item-right (click)="dismiss()">
						<ion-icon name="close"></ion-icon>
					</button>
				</ion-buttons>
			</ion-navbar>
		</ion-header>
		<ion-content padding>
			<pre text-wrap>{{text}}</pre>
		</ion-content>
	`
})
export class LongAlerts {
	private text;
	constructor(public params: NavParams, private viewCtrl: ViewController) {
		this.text = params.get('text');
	}
	dismiss() {
	    this.viewCtrl.dismiss();
	}
}