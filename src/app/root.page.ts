import { Component, ViewChild } from '@angular/core';
import { Nav, NavParams } from 'ionic-angular';
import { PartyProvider } from '../providers/party/party';
import { TemplatePage } from '../pages/template/template';

@Component({
	template: `<ion-nav [root]="somepage" #content swipeBackEnabled="false"></ion-nav>`
})

export class RootPage {
	@ViewChild(Nav) nav;
	constructor(public navParams: NavParams, private partyProvider: PartyProvider) {}

	ngOnInit() {
		this.partyProvider.init ((bootstrap:any)=>{
			this.nav.push (TemplatePage, bootstrap);
			if (this.navParams.data.schema) this.nav.push (TemplatePage, this.navParams.data);
		});
	}	
}