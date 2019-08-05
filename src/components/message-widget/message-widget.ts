import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { InputControlWidget } from "../control-widget";
import { NavParams, ViewController } from 'ionic-angular';
import { DynamicService } from '../../providers/dynamic-service/dynamic-service';

@Component({
  selector: 'message-widget',
  templateUrl: 'message-widget.html'
})
export class MessageWidget implements OnInit {
  private callback;
  public dynamicdata: any;
  public messageFor: string ="";

  messagetype: string ='on'; 
  constructor(public navParams: NavParams, public viewCtrl: ViewController, public permdataService: DynamicService) {
    this.dynamicdata = permdataService.getOption();
    this.callback = navParams.data.callback;
    this.callback();
    this.addDynamicClass();
    this.setMessage();
  }
  ngOnInit() {
    this.checkMessageFor();
  }

  checkMessageFor(){
    if (this.dynamicdata.hasOwnProperty("QoSMessage")) {
      this.messageFor = "Qos";
    } else  if(this.dynamicdata.hasOwnProperty("scheduleIsDynamic")) {
      this.messageFor = "scheduleDynamic";
    } else  if(this.dynamicdata.hasOwnProperty("scheduleIsPermanent")) {
      this.messageFor = "scheduleIsPermanent";
    } else  if(this.dynamicdata.hasOwnProperty("dynamicIsDynamic")) {
      this.messageFor = "dynamicIsDynamic";
      
    }
  }

  addDynamicClass(){


    setTimeout(function() {
      const modalMsg = document.getElementsByClassName(
        "modal-wrapper"
      ) as HTMLCollectionOf<HTMLElement>;
      modalMsg[0].classList.add("modalsizeController");
      modalMsg[0].style.width = '500px ';
      modalMsg[0].style.height = '200px';

      const backDrop = document.getElementsByClassName(
        "backdrop-no-tappable"
      ) as HTMLCollectionOf<HTMLElement>;
      backDrop[0].classList.add("modalsizeController1");
      backDrop[0].style.opacity= '0.0';

      

    }, 100);


    
  }
  setMessage(){
   
    if (this.dynamicdata.hasOwnProperty("QoSMessage")) {
      if (this.dynamicdata.QoSMessage === 'on')
        this.messagetype = 'on';
        else
        this.messagetype = 'off';
    }

  }

  dismiss(reqtype: string ) {
    let data : any;
    if (this.dynamicdata.hasOwnProperty("scheduleIsDynamic")){
      if(reqtype=='cancel'){
        this.permdataService.setOption('scheduleIsDynamic', false);
        data = { 'option': 'cancel' };   
      }
      if(reqtype=='continue'){
        this.permdataService.setOption('scheduleIsDynamic', true);
        data = { 'option': 'continue' };
      }
    
      if(reqtype=='empty')
      data = { 'option': 'empty' };

    } else  if (this.dynamicdata.hasOwnProperty("scheduleIsPermanent")){ 
      if(reqtype=='close'){
        this.permdataService.setOption('scheduleIsPermanent', true);
        data = { 'option': 'cancel' };
      }
    } else  if (this.dynamicdata.hasOwnProperty("dynamicIsDynamic")){ 
      if(reqtype=='close'){
        this.permdataService.setOption('dynamicIsDynamic', true);
        data = { 'option': 'cancel' };
      }
    }
    
    
    this.viewCtrl.dismiss(data);
  }
}
