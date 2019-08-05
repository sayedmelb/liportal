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
  selector: 'scheduled-flex-confirm-widget',
  templateUrl: 'scheduled-flex-confirm-widget.html'
})
export class ScheduledFlexConfirmWidget extends InputControlWidget {
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
  // public httpOptions = {
  //   headers: {
  //     ['Content-Type']: 'application/json'
  //   }
  // };
  // public res: any;
  // public spinner: Boolean = true;
  // public payload = {
  //   "reasonCode": {
  //     "remedy": "FULFILMENT",
  //     "cause": "CONTRACT",
  //     "problem": "PRODUCTORDER"
  //   },
  //   "properties": {
  //     "contact": {
  //       "id": "7f6097ac-02c3-41c4-96c5-0c9879ed68d9",
  //       "type": "Contact",
  //       "name": "Contract Contact",
  //       "properties": {
  //         "contract": {
  //           "email": "test_team@uecomm.com.au",
  //           "phone": "0300000000",
  //           "name": "Test Contract Contact"
  //         },
  //         "technical": {
  //           "email": "test_team@uecomm.com.au",
  //           "phone": "0300000000",
  //           "name": "Test Technical Contact"
  //         },
  //         "optus": {
  //           "accountMgr": "Test Account Manager",
  //           "consultant": "Test Solution Consultant",
  //           "consultantEmail": "test_team@uecomm.com.au",
  //           "accountMgrEmail": "test_team@uecomm.com.au"
  //         }
  //       }
  //     },
  //     "offers": [
  //       {
  //         "name": "Internet",
  //         "id": "6c1c150f-9e51-438f-8797-57d0054fd497",
  //         "type": "Default SD-Ethernet-Offer Test",
  //         "properties": {
  //           "topology": "",
  //           "locale": "Metro",
  //           "accessType": "Access_CE",
  //           "linkType": "Primary",
  //           "bandwidth": "2M/2M",
  //           "address": {
  //             "properties": {
  //               "streetName": "Collins",
  //               "originalType": "Address",
  //               "prequalifiable": true,
  //               "postcode": "3000",
  //               "notInitialized": false,
  //               "displayAddress": "367 Collins Street, Melbourne VIC 3000, AU",
  //               "originalAddress": "367 Collins Street Melbourne VIC 3000",
  //               "state": "VIC",
  //               "address": "367 Collins St, Melbourne VIC 3000, Australia",
  //               "types": [
  //                 "street_address"
  //               ],
  //               "formattedAddress": "367 Collins Street, Melbourne, VIC, 3000",
  //               "longitude": 144.9624228,
  //               "streetNumber": "367",
  //               "country": "AU",
  //               "suburb": "Melbourne",
  //               "latitude": -37.8171496,
  //               "name": "367 Collins St, Melbourne VIC 3000, Australia",
  //               "address_hash": "868588757##p##ChIJU00_XrNC1moRtzwODNJhg3E",
  //               "streetType": "Street",
  //               "place_id": "ChIJU00_XrNC1moRtzwODNJhg3E"
  //             },
  //             "reference": [
  //               {
  //                 "application": "CPQ",
  //                 "id": "6ae4d43b-ed03-4cd7-8925-40686ff5ec91"
  //               }
  //             ],
  //             "name": "367 Collins Street, Melbourne VIC 3000, AU",
  //             "type": "Address",
  //             "id": "6ae4d43b-ed03-4cd7-8925-40686ff5ec91"
  //           }
  //         }
  //       }
  //     ],
  //     "contract": {
  //       "type": "Contract",
  //       "name": "1-5K9I1P BRT Test Opp",
  //       "id": "ec6f5579-92e0-4701-a19f-a95daf619a77",
  //       "properties": {
  //         "id": "xxxxxxxxxxxxxxxxx",
  //         "term": 24,
  //         "price": {
  //           "totalCapex": 0,
  //           "totalContractRequestedValue": 16946.16,
  //           "standardInstall": 0,
  //           "totalInstall": 0,
  //           "nonStandardCommercialAvailability": {
  //             "siteCount": 1,
  //             "internetBillingOption": false,
  //             "invalidSiteCount": false,
  //             "invalidInternetBillingOptions": [],
  //             "invalidProducts": [],
  //             "available": true,
  //             "invalidProduct": false,
  //             "wipvpn": false,
  //             "sepResult": false
  //           },
  //           "totalMonthly": 706.1039999999999,
  //           "annualOrderValue": 8473.248,
  //           "totalContractValue": 16946.496,
  //           "specialInstall": 0,
  //           "totalContractMaxSalesDiscountValue": 16946.4
  //         },
  //         "opportunityId": "1-5K9I1P"
  //       },
  //       "reference": [
  //         {
  //           "application": "CPQ",
  //           "id": "1-5K9I1P"
  //         }
  //       ]
  //     },
  //     "uid": "35914"
  //   },
  //   "name": "putProductOrder",
  //   "timestamp": "20180905T02:09:32.575",
  //   "id": "c55a71bf-6def-4341-9045-844c28f4a7dd",
  //   "type": "Product Order"
  // }

  // constructor(private viewCtrl: ViewController, private http: HttpClient, private logger: NGXLogger) {
  //   super();
  // }
  constructor(private d3Service: D3Service, public viewCtrl: ViewController, public permdataService: DynamicService
    , public refservice: RefreshService) {
    super();
    this.data = permdataService.getOption();
    this.refdata = refservice.getOption();
    if (this.data.hasOwnProperty("BrowserNotClosedByUser") == false)
      this.permdataService.setOption('BrowserNotClosedByUser', "no");
  }

  ngOnInit() {
    super.ngOnInit();
    // this._th = this.schema;
    this.parent = this.schema.getParent();
    console.log("CONFIRM schema", this.schema);
   
    if (this.data.hasOwnProperty("ScheduleBWIsSubmitted")) {
      if (this.data.ScheduleBWIsSubmitted == true) {
        this.bypasstprogress();
        
      }
    } else {
      this.trackProgress();
     
    }

   
    // this.renderSVG();
  }

  trackProgress() {
    if (this.schema.onConfirmSubmit) this.schema.onConfirmSubmit(() => {
      console.log("fd:test");
      if (this.schema.datasource) {
        console.log("FD:PERM SUBMIT RESPONSE FISRT ", this.schema.datasource);
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
      console.log("fd:test: track");
      if (this.schema.datasource) {
        console.log("FD:PERM SUBMIT TRACK RESPONSE", this.schema.datasource);
        console.log("this.schema.datasource[0].model.orders.LENGTH", this.schema.datasource[0].model.orders.length);
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
      console.log("fd:test: bypass track");
      if (this.schema.datasource) {
        console.log("FD:PERM SUBMIT by passTRACK RESPONSE", this.schema.datasource);
        console.log("this.schema.datasource[0].model.orders.LENGTH", this.schema.datasource[0].model.orders.length);
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




  closeModel() {
    if (this.data.hasOwnProperty("PBChangeRefresh") == false)
      this.refservice.setOption('PBChangeRefresh', "yes");
    this.setdefault();
    this.viewCtrl.dismiss();
  }

  setdefault() {


    if (this.data.hasOwnProperty("BrowserNotClosedByUser")) {
      this.data.BrowserNotClosedByUser = null;
      delete this.data['BrowserNotClosedByUser'];
    }

    if (this.data.hasOwnProperty("ScheduleBWIsSubmitted")) {
      this.data.ScheduleBWIsSubmitted = null;
      delete this.data['ScheduleBWIsSubmitted'];
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