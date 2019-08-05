import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { InputControlWidget } from '../control-widget';
import { ShowHideChild } from '../../providers/show-hide-child/show-hide-child';
import { DynamicService } from '../../providers/dynamic-service/dynamic-service';
import * as _ from 'lodash';

const MESH_KEYWORD = "Mesh";

@Component({
  selector: 'ondemand-review',
  templateUrl: 'ondemand-review.html'
})

export class OndemandReview extends InputControlWidget {
  
  @Input() getFlexStatus: string;
  @Output() getFlexStatusChange = new EventEmitter<string>();
  @Output() getFlexStatusChange2 = new EventEmitter<string>();
  public data;
  public dataDynamic;
  tnc:boolean = false;
  isValid: boolean = true;
  isSaveLatter: boolean = false;
  networkType: string = '';

  constructor(_dataService: DynamicService, public viewCtrl: ViewController, public sibling: ShowHideChild) {
    super();
    this.data = _dataService.getOption();
  }

  ngOnInit() {
    super.ngOnInit();
    this.parent = this.schema.getParent();
    this.dataDynamic = this.parent.getValue("configure");

    this.schema.datasource = this.data.datasource; //this.schema.getParent().datasource; 
    this.schema.data = this.data;
    //this.filterModelData();
    this.setNetworkType();
    console.log("this.schema DYN review oninit", this.schema, this.data);
    console.log("this.data DYNAMIC review oninit",  this.data)

  }

  setNetworkType() {
    if (this.data.datasource[0].selectedProduct.properties.topology == MESH_KEYWORD) {
      this.networkType = "Mesh";
    } else {
      this.networkType = "P2P";
    }
  }
  
  filterModelData(){
    let payload = this.schema.datasource[0].model;
    let temp_model = [];
    
   
    _.forEach( payload, model => {
      let newObj = {};
      _.forIn(model, (value, key)=> {
         if(key.startsWith("_")) delete model[key];
         if(key=='active')  newObj['active'] = model.active;
          

         

         if(key=='dynamic_flex_enabled') newObj['dynamic_flex_enabled'] = model.dynamic_flex_enabled;
         if(key=='localId') newObj['localId'] = model.localId;
         //if Yes thne add valus to new model
         // if(model.dynamic_flex_enabled =="Yes") {
         
         //     //flexup
         //     if(key=='increased_utilisation_mode') new_model.increased_utilisation_mode = model.increased_utilisation_mode;
         //     if(key=='utilisation_increase_threshold_pc') new_model.utilisation_increase_threshold_pc = model.utilisation_increase_threshold_pc;
         //     if(key=='increased_utilisation_monitor_time_period') new_model.increased_utilisation_monitor_time_period = model.increased_utilisation_monitor_time_period;
             
         //     //flexdown
         //       if(key=='decreased_utilisation_mode') {
         //           new_model.decreased_utilisation_mode = model.decreased_utilisation_mode;
         //           new_model.decreased_utilisation_mode.replace("down","");
                   
         //       } 
               
         //     if(key=='utilisation_decrease_threshold_pc') new_model.utilisation_decrease_threshold_pc = model.utilisation_decrease_threshold_pc;
         //     if(key=='decreased_utilisation_monitor_time_period') new_model.decreased_utilisation_monitor_time_period = model.decreased_utilisation_monitor_time_period;
             
         //     if(key=='contractedBw') {
         //         new_model.RequestedBw = model.contractedBw;
         //     }
             
         //     //timebox
         //     if(key=='timeBox') new_model.timeBox = model.timeBox;
         //     if(key=='timebox_start_time') new_model.timebox_start_time = model.timebox_start_time;
         //     if(key=='timebox_end_time') new_model.timebox_end_time = model.timebox_end_time;
         //     if(key=='weekFlexDays') new_model.weekFlexDays = model.weekFlexDays;
             
         //     //spendCap
             
         //     if(key=='spendCap') new_model.spendCap = model.spendCap;
         //     if(key=='spendCapAmountsitea') new_model.spendCapAmountsitea = model.spendCapAmountsitea;
         //     if(key=='spendCapHoursitea') new_model.spendCapHoursitea = model.spendCapHoursitea;
             
             
             
             
         // }
          
         
         
      });
    
      temp_model.push(newObj);
  });

  this.schema.datasource[0].model = temp_model;
 

  }

  closeModel() {
    this.viewCtrl.dismiss();
  }

  goToNext() {
    if (this.isValid) {
      var parent = this.schema.getParent();
      this.sibling.updateSibling(parent.fieldsets[0].fields[2]);
    }
  }

  saveforLatter(e) {
    this.isSaveLatter = true;
  }

  goToPrevious() {
    if (this.isValid) {
      var parent = this.schema.getParent();
      this.sibling.updateSibling(parent.fieldsets[0].fields[0]);
    }
  }

  totalCost() {
    return parseFloat(this.data.siteaFlexTotal) + parseFloat(this.data.sitebFlexTotal);
  }

  getFlexDown(ruleValue) {
    if (ruleValue == 'balanceddown')
      return 'Balanced';
    if (ruleValue == 'relaxeddown')
      return 'Relaxed';
    if (ruleValue == 'aggresivedown')
      return 'Aggresive';
    if (ruleValue == 'customdown')
      return 'Custom';
  }

  getWeekDaysList(flexWeekday) {
    if(!flexWeekday)
      return "";
    let weeklist = "";
    let flag = false;
    if (flexWeekday.mon == true) {
      weeklist = weeklist + 'Monday';
      flag = true;
    }
    if (flexWeekday.tue == true) {
      if (flag == true)
        weeklist = weeklist + ', Tuesday';
      else
        weeklist = weeklist + 'Tuesday';
      flag == true;
    }
    if (flexWeekday.wed == true) {
      if (flag == true)
        weeklist = weeklist + ', Wednesday';
      else
        weeklist = weeklist + 'Wednesday';
      flag == true;
    }
    if (flexWeekday.thu == true) {
      if (flag == true)
        weeklist = weeklist + ', Thursday';
      else
        weeklist = weeklist + 'Thursday';
      flag == true;
    }
    if (flexWeekday.fri == true) {
      if (flag == true)
        weeklist = weeklist + ', Friday';
      else
        weeklist = weeklist + 'Friday';
      flag == true;
    }
    if (flexWeekday.sat == true) {
      if (flag == true)
        weeklist = weeklist + ', Saturday';
      else
        weeklist = weeklist + 'Saturday';
      flag == true;
    }
     if (flexWeekday.sun == true) {
      if (flag == true)
        weeklist = weeklist + ' and Sunday';
      else
        weeklist = weeklist + 'Sunday';
      flag == true;
    }
    return weeklist;
  }

  openTnC() {
    if (this.tnc) {
      this.tnc = false;
    } else {
      this.tnc = true;
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

}
