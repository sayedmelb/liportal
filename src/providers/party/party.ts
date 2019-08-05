import { Injectable } from '@angular/core';
import { AppConstants }  from '../avp.enum';
import { Party, Hardware } from '../../models/party';
import { ExternalProvider } from '../../providers/external/external';
import { Platform } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Ng2DeviceService } from 'ng2-device-detector';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Injectable()
export class PartyProvider {
	party:Party = new Party ();
	
	constructor(private externalProvider: ExternalProvider, private device: Device, 
		private deviceWeb: Ng2DeviceService, private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen) {}

	init (callback){		
		let hardware:Hardware = this.updateDevice();
		this.party.hardware = hardware;
		this.externalProvider.init (hardware);
		this.retrieveBootstarp (callback);
	}

	signout (){
		this.externalProvider.signout ();
		if (!this.party.hardware.isApp){
			this.splashScreen.show();
			window.location.reload();
		} else {
			this.platform.exitApp();
		}
	}
	
	retrieveBootstarp (callback){
		this.externalProvider.post ("process/0", {
			model: {
				custId: "PORTAL"
			}
		}, false).subscribe(
			result => {;
				if (!result.hasException){
					if (result.model){
						if (result.model.title){
							this.externalProvider.set ("name", result.model.title);
						}
						if (result.model.images && result.model.images.length>0){
							this.externalProvider.set ("featureImage", AppConstants.API_ENDPOINT + result.model.images[0].path + '/' + result.model.images[0].filename + '-xl.png');
						}
					}
					callback(result);
				} else
					this.externalProvider.showAlert (result.message);
			},
			error => {
				setTimeout(()=>{
					this.retrieveBootstarp (callback);
				}, 5000);
				if (error.hasException) this.externalProvider.showToast(error.message);
				else this.externalProvider.showToast(error);
			});
	}

	private updateDevice ():Hardware{
		let hardware = new Hardware();
		hardware.height = this.platform.height();
		hardware.width = this.platform.width();
		hardware.isApp = !(this.platform.is('core') || this.platform.is('mobileweb') || this.platform.is('cordova'));
		if (hardware.isApp){
			hardware.cordova = ""+this.device.cordova;
			hardware.isVirtual = ""+this.device.isVirtual;
			hardware.manufacturer = ""+this.device.manufacturer;
			hardware.model = ""+this.device.model;
			hardware.platform = this.device.platform;
			hardware.serial = ""+this.device.serial;
			hardware.uuid = ""+this.device.uuid;
			hardware.version = ""+this.device.version;
			this.statusBar.styleDefault();
		} else {
			hardware.manufacturer = this.deviceWeb.os;
			hardware.model = ""+this.deviceWeb.browser;
			hardware.platform = this.deviceWeb.device;
			hardware.serial = ""+this.deviceWeb.os_version;
			hardware.version = ""+this.deviceWeb.browser_version;
		}
		this.splashScreen.hide();
		
		if (hardware.width<576) hardware.layout = "xs";
		if (hardware.width>=576 && hardware.width < 768) hardware.layout = "sm";
		if (hardware.width>=768 && hardware.width < 992) hardware.layout = "md";
		if (hardware.width>=992 && hardware.width < 1200) hardware.layout = "lg";
		if (hardware.width>=1200) hardware.layout = "xl";
		
		return hardware;
	}
}
