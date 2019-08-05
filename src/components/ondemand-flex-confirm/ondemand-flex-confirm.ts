import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { InputControlWidget } from '../control-widget';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import {
  DynamicService
} from '../../providers/dynamic-service/dynamic-service';
import { RefreshService } from '../../providers/refresh-service/refresh-service';

import {
  D3,
  D3Service
} from 'd3-ng2-service';


@Component({
  selector: 'ondemand-flex-confirm',
  templateUrl: 'ondemand-flex-confirm.html'
})
export class OndemandFlexConfirm extends InputControlWidget {
  
  //isConfirm: boolean = true;
  public dataService: DynamicService;
  //public data;

  progStepArr: Array<string> = ["In-active", "In Progress", "Provisioning", "Deploying", "Active"];
  currStep: number = 0;
  progress2: number = 0;
  isConfirm: boolean = false;
  isOConfirm: boolean = false;
  isLoading: boolean = true;
  isLoadingProgress: boolean = false;
  isFailedStatus: boolean =false;
  request: number;
  data: any;
  refdata: any;
  progressPercent: number = 1;
  labelList = ['Cart', 'Pay', 'Enjoy'];
  index = 0;
  trackcount = 0;
  
  
  formSettings = {
    theme: 'ios',
    onInit: () => {
      let checkoutLabels = document.querySelectorAll('.md-demo .mbsc-progress-step-label');

      for (let i = 0; i < checkoutLabels.length; ++i) {
        checkoutLabels[i].innerHTML = this.labelList[i];
      }
    }
  };


  constructor(public viewCtrl: ViewController, public refservice: RefreshService, public _dataService: DynamicService) {
    super();
    this.dataService = _dataService;
    this.data = _dataService.getOption();
    this.refdata = refservice.getOption();
    if (this.data.hasOwnProperty("BrowserNotClosedByUser") == false)
      this._dataService.setOption('BrowserNotClosedByUser', "no");
  
    
  }
  ngOnInit() {
    super.ngOnInit();
    this.parent = this.schema.getParent();
    this.schema.datasource = this.data.datasource; //this.schema.getParent().datasource; 
    this.schema.data = this.data;



    console.log("frnd:dyn: CONFIRM schema", this.schema);

    if (this.data.hasOwnProperty("DynamicBWIsSubmitted")) {
      if (this.data.PermBWIsSubmitted == true) {
        this.bypasstprogress();
        
      }
    } else {
      this.trackProgress();
     
    }

  }

  trackProgress() {
    if (this.schema.onConfirmDynamicSubmit) this.schema.onConfirmDynamicSubmit(() => {
      console.log("fd:test dyn");
      if (this.schema.datasource) {
        console.log("FD:DYN SUBMIT RESPONSE FISRT ", this.schema.datasource);
        if (this.schema.datasource[0].model.orders[0])
          this.progressPercent = this.schema.datasource[0].model.orders[0].progress;
        console.log("FD:Percent completed first", this.progressPercent);
        if(this.progress2 !==this.progressPercent){
          this.progress2 = this.progressPercent;
        this.isLoadingProgress=false;
        }
        
        this.request = this.schema.datasource[0].model.orders[0].orderId;
        this.isLoading = false;
        this.tprogress();
      }
    });


  }//end of trackProgress

  getCall2() {
    if (this.schema.onIsSubmitProgress) this.schema.onIsSubmitProgress(() => {
     // console.log("fd:test: track");
      if (this.schema.datasource) {
        //console.log("FD:PERM SUBMIT TRACK RESPONSE", this.schema.datasource);
        //console.log("this.schema.datasource[0].model.orders.LENGTH", this.schema.datasource[0].model.orders.length);
        if (this.schema.datasource[0].model.orders.length>0) {
          this.progressPercent = this.schema.datasource[0].model.orders[0].progress;
          this.request = this.schema.datasource[0].model.orders[0].orderId;
          if(this.progress2 !==this.progressPercent){
            this.progress2 = this.progressPercent;
            this.isLoadingProgress=false;
          }
          if(this.schema.datasource[0].model.orders[0].substatus=='Failed'){
            this.isFailedStatus= true;
          }
          
        }
        else {// if orders array is empty than status is completed

          this.progress2 = 100;// this.progressPercent;
          this.isLoadingProgress=false;
        }
        console.log("FD:Percent completed track", this.progressPercent);
        this.isLoading = false;

      }
    });

  }

  getCall3() {
    if (this.schema.onByPassProgress) this.schema.onByPassProgress(() => {
     // console.log("fd:test: bypass track");
      if (this.schema.datasource) {
        //console.log("FD:PERM SUBMIT by passTRACK RESPONSE", this.schema.datasource);
       // console.log("this.schema.datasource[0].model.orders.LENGTH", this.schema.datasource[0].model.orders.length);
        if (this.schema.datasource[0].model.orders.length>0) {
          this.progressPercent = this.schema.datasource[0].model.orders[0].progress;
          this.request = this.schema.datasource[0].model.orders[0].orderId;
          if(this.progress2 !==this.progressPercent){
            this.progress2 = this.progressPercent;
            this.isLoadingProgress=false;
          }
          if(this.schema.datasource[0].model.orders[0].substatus=='Failed'){
            this.isFailedStatus= true;
          }
         
        } else {// if orders array is empty than status is completed

          this.progress2 = 100;// this.progressPercent;
          this.isLoadingProgress=false;
        }
        console.log("FD:Percent bypass completed track", this.progressPercent);
        this.isLoading = false;
      }

    });

  }

  bypasstprogress() {
    setInterval(() => {
      if (!this.isConfirm) {
        //below will stop at 99%
        if (this.progress2 < 100) {
          this.progress2 = this.progressPercent;
          if (this.data.hasOwnProperty("BrowserNotClosedByUser"))
          {
            this.isLoadingProgress=true;
            this.getCall3();
          }
           
          else {
            console.log("call stopped");
            this.isConfirm = true;
            this.isLoadingProgress=false;

          }

        }
        if (this.progress2 >= 100) {
          this.isConfirm = true;
          this.isLoadingProgress=false;
          //this.request = Math.random() * 100000000;
        }

      }

    }, Math.random() * 7500);
    // }, Math.random() * 7500);

  }



  tprogress() {

    setInterval(() => {
      if (!this.isConfirm) {
        if (this.progress2 < 100) {
          this.progress2 = this.progressPercent;
          if (this.data.hasOwnProperty("BrowserNotClosedByUser"))
          {
            this.isLoadingProgress=true;
            this.getCall2();
          }
            
          else {
            console.log("call stopped");
            this.isConfirm = true;
            this.isLoadingProgress=false;

          }

        }
        if (this.progress2 >= 100) {
          this.isConfirm = true;
          this.isLoadingProgress=false;
          // this.request = Math.random() * 100000000;
        }

      }

    }, Math.random() * 7500);


  }

  closeModel(){
    this.setdefault();
    this.viewCtrl.dismiss();
  }

  setdefault() {


    if (this.data.hasOwnProperty("BrowserNotClosedByUser")) {
      this.data.BrowserNotClosedByUser = null;
      delete this.data['BrowserNotClosedByUser'];
    }

    if (this.data.hasOwnProperty("PermBWIsSubmitted")) {
      this.data.PermBWIsSubmitted = null;
      delete this.data['PermBWIsSubmitted'];
    }
    if (this.data.hasOwnProperty("changeBW")) {
      this.data.changeBW = null;
      delete this.data['changeBW'];
    }

    if (this.data.hasOwnProperty("totalAend")) {
      // this.dynamicdata.totalAend = 750;  
      delete this.data['totalAend'];
    }

    if (this.data.hasOwnProperty("portCapacityAend")) {
      this.data.portCapacityAend = null;
      delete this.data['portCapacityAend'];
    }

    if (this.data.hasOwnProperty("portCapacityBend"))
      delete this.data['portCapacityBend'];
    // this.dynamicdata.portCapacityBend = null;
    if (this.data.hasOwnProperty("flexCapacityAend"))
      delete this.data['flexCapacityAend'];
    //this.dynamicdata.flexCapacityAend = null;
    if (this.data.hasOwnProperty("flexCapacityBend"))
      delete this.data['flexCapacityBend'];
    // this.dynamicdata.flexCapacityBend = null;
    if (this.data.hasOwnProperty("vlanA"))
      delete this.data['vlanA'];
    if (this.data.hasOwnProperty("vlanB"))
      delete this.data['vlanB'];
    if (this.data.hasOwnProperty("datasource")) {
      //        this.dynamicdata.datasource = null;  
      delete this.data['datasource'];
    }
    if (this.data.hasOwnProperty("addressON")) {
      this.data.addressON = null;
      delete this.data['addressON'];
    }


  }

}
