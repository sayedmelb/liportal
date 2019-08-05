import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
	selector: 'popover-widget',
	templateUrl: 'popover-widget.html'
})
export class PopoverWidget {
	private schema;
	constructor(public navParams: NavParams, public viewCtrl: ViewController) {
		this.schema = navParams.data.schema || navParams.data;
	}

	dismiss (){
		this.viewCtrl.dismiss ();
	}
}
