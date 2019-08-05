import { Component} from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'service-level-widget',
  templateUrl: 'service-level-widget.html'
})
export class ServiceLevelWidget {

  private callback;
  
  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.callback = navParams.data.callback;
    this.callback();
    this.addDynamicClass();
  } 

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addDynamicClass(){
    setTimeout(function() {
      const modalMsgs = document.getElementsByClassName(
        "modal-wrapper"
      ) as HTMLCollectionOf<HTMLElement>;
      modalMsgs[0].classList.add("modalsizeController");
      modalMsgs[0].style.width = '800px';
      modalMsgs[0].style.height = '400px';
    }, 100);
  }

}
