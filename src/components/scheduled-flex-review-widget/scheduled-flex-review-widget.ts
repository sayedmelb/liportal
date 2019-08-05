import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { InputControlWidget } from '../control-widget';
import { Service } from '../../interfaces/service';
import { ShowHideChild } from '../../providers/show-hide-child/show-hide-child';
import { DynamicService } from '../../providers/dynamic-service/dynamic-service';
import * as _ from 'lodash';
import { ParseTreeResult } from '@angular/compiler';
import { NGXLogger } from "ngx-logger";

const MESH_KEYWORD = "Mesh";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";

@Component({
  selector: 'scheduled-flex-review-widget',
  templateUrl: 'scheduled-flex-review-widget.html'
})
export class ScheduledFlexReviewWidget extends InputControlWidget {

  public tnc: Boolean = false;
  //public data: Service;
  public data;
  public dataDynamic;
  //public parent: any;
  isValid: boolean = true;
  isSaveLatter: boolean = false;
  model: any;
  grade: any = { service: 'gradeOfService' };
  sla: any = { service: 'serviceLevel' }
  networkType: string = '';

  addressAend: string = "";
  addressBend: string = "";
  public dataService: DynamicService;

  constructor(public _dataService: DynamicService,public viewCtrl: ViewController, public sibling: ShowHideChild) {
    super();
    this.dataService = _dataService;
    this.data = _dataService.getOption();
  }

  ngOnInit() {
    super.ngOnInit();
    this.parent = this.schema.getParent();

    this.schema.datasource = this.data.datasource; //this.schema.getParent().datasource; 
    this.schema.data = this.data;

    this.setNetworkType();
    //console.log("review NW", this.networkType);
   // console.log("REVIEW -datasource", this.schema.datasource);
    //console.log("REVIEW data", this.data);
  //  this.data = this.parent.getValue("configure"); 
  }

  setNetworkType() {

    if (this.schema.datasource[0].selectedProduct.properties.topology == MESH_KEYWORD) {
      this.networkType = "Mesh";
    } else {
      this.networkType = "P2P";
    }

  }

  termsAndConditions = [
    {
      id: "tnc1",
      label: {
        text: "You confirm the changes & accept the charges above"
      },
      options: {
        "style.checkbox.class": "default"
      },
      isChecked: false,
      required: true
    }
  ];
  getSchemaForTnC() {
    return this.termsAndConditions;
  }

  
  isSubmitDisabled() {
    let disabled = false;
    _.forEach(this.termsAndConditions, (tnc) => {
      if (!tnc.isChecked) {
        disabled = true;
        return 0;
      }
    })
    return disabled;
  }

  openTnC() {
    if (this.tnc) {
      this.tnc = false;
    } else {
      this.tnc = true;
    }
  }

  goToNext() {
    this.updateRecurrencetoLowercase();
    this.prexfixTimewithLeadingZero();
    var parent = this.schema.getParent();
    this.sibling.updateSibling(this.parent.fieldsets[0].fields[2]);
  }

  updateRecurrencetoLowercase() {

    _.forEach(this.schema.datasource[0].model, model => {
      _.forIn(model, (value, key) => {

        if (key == 'recurrence_type')
          model.recurrence_type = model.recurrence_type.toLocaleLowerCase();
      });
    });
  }

  prexfixTimewithLeadingZero() {
    _.forEach(this.schema.datasource[0].model, model => {
      _.forIn(model, (value, key) => {

        if (key == 'start_time') {
          let arystart_time = _.words(model.start_time);
          console.log("arystart_time", arystart_time);
          if (arystart_time[0].length < 2) {
            arystart_time[0] = "0" + arystart_time[0];


          }
          if (arystart_time[1].length < 2) {
            arystart_time[1] = "0" + arystart_time[1];
          }
          model.start_time = arystart_time[0] + ":" + arystart_time[1] + " " + arystart_time[2];


        }
        if (key == 'end_time') {
          let aryend_time = _.words(model.end_time);
          console.log("aryend_time", aryend_time);
          if (aryend_time[0].length < 2) {
            aryend_time[0] = "0" + aryend_time[0];

          }
          if (aryend_time[1].length < 2) {
            aryend_time[1] = "0" + aryend_time[1];
          }
          model.end_time = aryend_time[0] + ":" + aryend_time[1] + " " + aryend_time[2];

        }

      });
    });
  }

  goToPrevious() {
    let data = { data: 'review' }
    if (this.isValid) {

      var parent = this.schema.getParent();
      //this.formProperty.setValue(data, false);
      parent.setValue("configure", data);
      this.sibling.updateSibling(parent.fieldsets[0].fields[0]);
    }
    //this.sibling.updateSibling(this.parent.fieldsets[0].fields[0]);
  }

  closeModel() {
    this.setdefault();
    this.viewCtrl.dismiss();
  }

  setdefault() {

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

    // if (this.data.hasOwnProperty("portCapacityAend"))
    //   this.data.portCapacityAend = null;
    // if (this.data.hasOwnProperty("portCapacityBend"))
    //   this.data.portCapacityBend = null;
    // if (this.data.hasOwnProperty("flexCapacityAend"))
    //   this.data.flexCapacityAend = null;
    // if (this.data.hasOwnProperty("flexCapacityBend"))
    //   this.data.flexCapacityBend = null;
    // if (this.data.hasOwnProperty("vlanA"))
    //   this.data.vlanA = null;
    // if (this.data.hasOwnProperty("vlanB"))
    //   this.data.vlanB = null;

  }

}