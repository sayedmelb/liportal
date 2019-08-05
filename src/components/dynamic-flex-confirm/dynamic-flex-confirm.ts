import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'dynamic-flex-confirm',
  templateUrl: 'dynamic-flex-confirm.html'
})
export class DynamicFlexConfirmComponent {
  
  isConfirm: boolean = true;

  constructor(public viewCtrl: ViewController) {
  }

  closeModel(){
    this.viewCtrl.dismiss();
  }

}
