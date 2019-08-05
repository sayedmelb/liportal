import { Component, Input } from '@angular/core';
import { MbscListviewOptions } from '@mobiscroll/angular';
import { ActionType } from '../../models/service-details';
import { InputControlWidget } from "../../components/control-widget";
import { PopoverController } from "ionic-angular";
import { Controls } from "../../components/control-widget/control-widget";
import { ModalController, ModalOptions } from 'ionic-angular';
import { PermanentWidget } from '../../components/permanent-widget/permanent-widget';
import * as _ from 'lodash';

const ON_LOAD_PB: string = "onPermBWLoad";

@Component({
  selector: 'service-details-card',
  templateUrl: 'service-details-card.html'
})
export class ServiceDetailsCardComponent {

  actionType = ActionType;

  @Input("schema") schema: any;
  @Input("model") model: any;
  @Input("parentschema") parentschema: any;

  settings: any = {
    theme: 'ios'
  };

  stripedSettings: MbscListviewOptions = {
    theme: 'ios',
    striped: true
  };

  show: boolean = false;

  myModalOptions: ModalOptions = {
    enableBackdropDismiss: true,
    showBackdrop: true,
    cssClass: 'other-services-widget'
  };
  presentModal() {
    this.modalCtrl
      .create(PermanentWidget, {
        callback: (filter: any) => {
          //this.logger.debug("Here");
          if (this.parentschema && this.parentschema.events) {
            let index = _.findIndex(this.parentschema.events, (event) => {
              return event == ON_LOAD_PB
            });
            // this.formProperty.setValue(service, false);

            this.parentschema[this.parentschema.events[index]]();
          }
        }
      }, this.myModalOptions)
      .present({
        ev: event
      });
  }

  constructor(public popoverCtrl: PopoverController, public modalCtrl: ModalController) {
    // super(); 
  }
  ngOnInit() {
    console.log("SERVICE DETAIL schema model", this.schema, this.model, this.parentschema);
  }
  //parentschema.datasource[0].selectedProduct.properties.service.properties.bandwidth
  getFlexMax(){
    let bandwidth = "";
    let flexpack= this.getDisplayValue();
    let ary1 = [];
    let ary2 = [];
    if(this.parentschema){
      bandwidth=this.parentschema.datasource[0].selectedProduct.properties.service.properties.bandwidth;
      ary1 = _.words(bandwidth);
    }
    ary2 = _.words(flexpack);
    if(ary1[1] =='M')
    return parseInt(ary1[0]) * parseInt(ary2[0]) + " Mbps";
    else
    return parseInt(ary1[0]) * parseInt(ary2[0]) + " Gbps";




  }
  // myModalOptions: ModalOptions = {
  //   enableBackdropDismiss: true,
  //   showBackdrop: true,
  //   cssClass : 'other-services-widget'
  // };


  getDisplayValue() {
    if (this.model) {
      return this.model;
    } else {
      return this.schema.default;
    }
  }

  getDisplayValueAddress(){
    let value=  this.getDisplayValue();

    var addressarray = value.split(',');
    let newlineAddress = ""
    for(let i=0; i<addressarray.length; i++) {
      newlineAddress = newlineAddress + addressarray[i] + "<br>";
    }

    return newlineAddress;

  }

  LoadChange() {

    //console.log("ITEM:", itm);
    // console.log("ITEM schema:", this.schema);
    // console.log("ITEM model:", this.model);
    // console.log("ITEM model:", this.parentschema);
    // console.log("test end");

    let controls = //this.schema.options;
    [
      {
      event: { type: "onPermBWLoad" },
      id: "c1",
      title: "Permanent Change",
    },
    
    {
      event: { type: "onScheduleBWLoad" },
      id: "c1",
      title: "Schedule Flex",
    },{
      event: { type: "onDynamicBWLoad" },
      id: "c1",
      title: "Dynamic Flex",
    }

    ];


   

    this.popoverCtrl
      .create(Controls, {
        callback: (control: any) => {


          if (this.parentschema && this.parentschema.events && this.parentschema.datasource && this.parentschema.datasource[0].selectedProduct.properties.service.properties.serviceId !='TBA'  ) {
            let index = _.findIndex(this.parentschema.events, (event) => {
              return event == control.event.type // ON_LOAD_PB
            });
      
            this.parentschema[this.parentschema.events[index]]();
          } else {
            alert('Service does not have a valid service ID');
            return false;
          }
        },
        controls: controls
      })
      .present({
        ev: event
      });




  }

  loadPermBWChange() {
    console.log("Load PBW");

    let controls =
      [{
        event: { type: "onPermBWLoad" },
        id: "c1",
        title: "Permanent Change",
      }
      ];

    let popover = this.popoverCtrl.create(Controls, {
      callback: (control: any) => {

        let ctrol = "onPermBWLoad";
        if (this.parentschema && this.parentschema.events && this.parentschema.datasource && this.parentschema.datasource[0].selectedProduct.properties.service.properties.serviceId !='TBA' ) {
          let index = _.findIndex(this.parentschema.events, (event) => {
            return event == ctrol //control.event.type // ON_LOAD_PB
          });

          this.parentschema[this.parentschema.events[index]]();
        }  else {
          alert('Service does not have a valid service ID');
          return false;
        }
      },
      controls: controls
    });



    popover.present({
      ev: event
    });


  }




}
