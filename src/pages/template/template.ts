import { Component, ViewChild, NgZone } from '@angular/core';
import { NavParams, PopoverController, Events, NavController, App, Content, Navbar, ModalController } from 'ionic-angular';
import { PartyProvider } from '../../providers/party/party';
import { ExternalProvider } from '../../providers/external/external';
import { PopoverWidget } from '../../components/popover-widget/popover-widget';
import { AppConstants } from "../../providers/avp.enum";
import { RootPage } from "../../app/root.page";
import { NGXLogger } from 'ngx-logger';
@Component({
	selector: 'page-template',
	templateUrl: 'template.html',
})

export class TemplatePage {
	@ViewChild('fab') fab;
	@ViewChild(Content) body: Content;
	@ViewChild(Navbar) navBar: Navbar;
	private schema;
	private popover: any;
	private fabButton: any;
	private banner: any;
	private header: any;
	private content: any;
	private showFabAtBottom: boolean = true;

	constructor(public navParams: NavParams, private partyProvider: PartyProvider, private externalProvider: ExternalProvider, private logger: NGXLogger,
		private popoverCtrl: PopoverController, private events: Events, private navCtrl: NavController, private app: App, private zone: NgZone, private modalCtrl: ModalController) {
			this.logger.debug("inside template js -> ", navParams);
		let model: any = {
			specification: {},
			content: {}
		};
		if (navParams.data.model) {
			model = navParams.data.model;
			if (!model.specification) model.specification = {};
			if (!model.content) model.content = {};
		}
		this.schema = navParams.data.schema;
		this.schema.model = model;
		if (navParams.data.schema.decoder) {
			let decoder;
			try {
				eval(navParams.data.schema.decoder);
				if (decoder) {
					AppConstants.DECODER = decoder;
				}
			} catch (e) {
				this.logger.debug(e);
			}
		}
		try {
			AppConstants.DECODER.decode(this.schema);
		} catch (e) {
			this.logger.debug("Decoding failed: " + e);
		}
		this.createControls();
		if (navParams.data.callback) this.schema.callback = navParams.data.callback;
		if (navParams.data.onBack) this.schema.onBack = navParams.data.onBack;
	}

	ngAfterViewInit() {
		this.logger.debug("inside template js --- >", this.schema);
		
		if (this.fabButton && !(typeof this.fabButton.showAtBottom === "undefined") && !this.fabButton.showAtBottom)
			this.body.ionScroll.subscribe((event: any) => {
				this.zone.run(() => {
					if ((event.scrollHeight - event.contentHeight) <= (event.scrollTop + 28)) {
						this.showFabAtBottom = false;
					} else
						this.showFabAtBottom = true;
				});
			});
		if (this.navBar)
			this.navBar.backButtonClick = (e: UIEvent) => {
				if (this.schema.onBack) this.schema.onBack();
				this.navCtrl.pop();
			}
		this.schema.scrollToTop = () => {
			this.body.scrollToTop();
		};
		this.schema.scrollToBottom = () => {
			this.body.scrollToBottom();
		};
	}

	private createControls() {
		if (this.schema.setController) this.schema.setController(this.externalProvider, (result, setRoot) => {
			if (setRoot)
				this.app.getRootNav().setRoot(RootPage, result);
			else
				if (!result.schema.widget || result.schema.widget === "page")
					this.app.getRootNav().push(TemplatePage, result);
				else {
					if (result.schema.widget && result.schema.widget === "modal") {
						let modal = this.modalCtrl.create(TemplatePage, result);
						modal.present();
					}
					else if (result.schema.widget && result.schema.widget === "popover") {
						let popover = this.popoverCtrl.create(TemplatePage,
							result,
							{
								enableBackdropDismiss: false,
								cssClass: 'backdropOpacityPopover'
							});
						popover.present();
					}
				}
		}, () => {
			this.app.getRootNav().pop();
		});
		let menu = this.schema.menu || (this.schema.properties ? this.schema.properties.menu : null);
		if (menu) {
			this.events.publish("menu", menu);
		}
		
		let header = this.schema.header || (this.schema.properties ? this.schema.properties.header : null);
		if (header) {
			this.header = header;
			if (this.header.properties) {
				let keys = Object.keys(this.header.properties);
				(keys || []).forEach(key => {
					let property = this.header.properties[key];
					if (property.widget == 'popover')
						this.popover = property;
					if (property.widget == 'fabButton')
						this.fabButton = property;
					if (property.widget == 'banner')
						this.banner = property;
				});
			}
		}

		let content = this.schema.content || (this.schema.properties ? this.schema.properties.content : null);
		if (content) this.content = content;
	}

	action($event, property, eventType) {
		let schema;
		if (property.content)
			schema = Object.assign({}, property.content);
		else schema = Object.assign({}, property);

		if (property.widget == 'fabButton' || property.widget == 'popover') {
			if (property.properties) {
				this.popoverCtrl.create(
					PopoverWidget,
					{ schema: property.properties.content }
				).present({
					ev: $event
				});
			} else {
				if (property[eventType]) {
					property[eventType]();
					this.closeFab();
				}
			}
		}
	}

	closeFab() {
		if (this.fab) this.fab.close();
	}

	ngOnDestroy() {
		this.body.ionScroll.unsubscribe();
		this.schema = null;
	}
}
