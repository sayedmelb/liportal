import { Component, Output, EventEmitter, Input } from '@angular/core';
import { InputControlWidget } from "../control-widget";
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'dscp-widget',
  templateUrl: 'dscp-widget.html'
})
export class DscpWidget {
  private callback;
  
  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.callback = navParams.data.callback;
    this.callback();
    this.addDynamicClass();
  } 

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }



  addDynamicClass(){


    setTimeout(function() {
      const modalMsgs = document.getElementsByClassName(
        "modal-wrapper"
      ) as HTMLCollectionOf<HTMLElement>;
      modalMsgs[0].classList.add("modalsizeController");
      modalMsgs[0].style.width = '800px';
      modalMsgs[0].style.height = '600px';

     

      

    }, 100);


    
  }

}
