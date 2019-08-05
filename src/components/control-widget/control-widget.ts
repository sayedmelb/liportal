import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { mobiscroll } from '@mobiscroll/angular';

mobiscroll.settings = {
    theme: 'ios'
};

@Component({
	selector: 'control-widget',
	templateUrl: 'control-widget.html'
})
export class Controls {
	private callback;
	private controls;
	constructor(public navParams: NavParams, public viewCtrl: ViewController) {
		this.callback = navParams.data.callback;
		this.controls = navParams.data.controls;
	}

	onClick(control:any) {
		this.callback (control);
		this.viewCtrl.dismiss();
	}
}
