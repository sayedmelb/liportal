import { Component, Input, Output, EventEmitter, } from "@angular/core";
import * as _ from 'lodash';
import { mobiscroll, MbscDatetimeOptions } from "@mobiscroll/angular";
import { NGXLogger } from "ngx-logger";
import moment from 'moment';
import { NumberFormatStyle } from "@angular/common";

const MESH_KEYWORD = "Mesh";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";

@Component({
  selector: "time-box",
  templateUrl: "time-box.html"
})

export class TimeBox {
  @Input("schema") schema: any;
  @Input("model") model: any;
  //@Input("model") model: any;
  //@Output() network = new EventEmitter();





  show: boolean = true;

  //from on demand

  initialRange: { lower: number; upper: number; flexmax: number };
  leftknob: number = 100;
  changeFlexValue: string;


  timeBox: string = "off";

  private stime: Date = new Date(2018, 0, 1, 8, 30);
  private etime: Date = new Date(2018, 0, 1, 17, 0);
  private timeSettings: MbscDatetimeOptions = {
    touchUi: false
  };

  // weekFlexDays: {
  //   mon: true;
  //   tue: true;
  //   wed: true;
  //   thu: true;
  //   fri: true;
  //   sat: false;
  //   sun: false;
  // };
  weekFlexDays: {
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    sun: boolean;
  };

  dynamicBandwidthmodel: {
    weekFlexDays: {
      mon: boolean;
      tue: boolean;
      wed: boolean;
      thu: boolean;
      fri: boolean;
      sat: boolean;
      sun: boolean;
    };
  } = {
      weekFlexDays: {
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: false,
        sun: false
      }
    };


  isValid: boolean = true;

  // this.initialRange = {
  //   lower: this.minValue,
  //   upper: this.maxValue,
  //   flexmax: this.dynamicBandwidthmodel.flexmax
  // };

  //end from on demand

  constructor(private logger: NGXLogger) {

    //this.dynamicdata = permdataService.getOption();
  }

  ngOnInit() {

    console.log("time box", this.schema);

    this.setInitialsettings();
    this.addTimeBoxFlexStatustoModel();

  }

  setInitialsettings() {
    this.weekFlexDays = {
      mon: this.dynamicBandwidthmodel.weekFlexDays.mon,
      tue: this.dynamicBandwidthmodel.weekFlexDays.tue,
      wed: this.dynamicBandwidthmodel.weekFlexDays.wed,
      thu: this.dynamicBandwidthmodel.weekFlexDays.thu,
      fri: this.dynamicBandwidthmodel.weekFlexDays.fri,
      sat: this.dynamicBandwidthmodel.weekFlexDays.sat,
      sun: this.dynamicBandwidthmodel.weekFlexDays.sun
    };
  }

  // ngDoCheck() {


  // }


  //from on-demand configure page ts

  checkFlexCondition() {
    let validcount: number = 0;
    if (!this.weekFlexDays.mon) validcount = validcount + 1;
    if (!this.weekFlexDays.tue) validcount = validcount + 1;
    if (!this.weekFlexDays.wed) validcount = validcount + 1;
    if (!this.weekFlexDays.thu) validcount = validcount + 1;
    if (!this.weekFlexDays.fri) validcount = validcount + 1;
    if (!this.weekFlexDays.sat) validcount = validcount + 1;
    if (!this.weekFlexDays.sun) validcount = validcount + 1;
    if (validcount > 6) return false;
    else {
      if (this.stime < this.etime) return true;
      else return false;
    }
  }

  checkDattimeValidation(controlId, data) {
    if (this.checkFlexCondition())
      this.isValid = true;
    else
      this.isValid = false;

    this.addtoModel(controlId, data);
  }

  addtoModel(controlId, data) {
    let time = moment(data).format("hh:mm a");
    //if(controlId=='start')

    if (this.model) {
      if (controlId == 'start') {
        delete this.model[0]["timebox_start_time"];
        this.model[0]["timebox_start_time"] = time;
      } else {
        delete this.model[0]["timebox_end_time"];
        this.model[0]["timebox_end_time"] = time;

      }



    }
    console.log("this.schema", this.schema);
    console.log("this.weekFlexDays", this.weekFlexDays);




  }

  addweekdaystoModel() {
    if (this.model) {
      delete this.model[0]["weekFlexDays"];
      this.model[0]["weekFlexDays"] = this.weekFlexDays;

    }


  }

  addTimeBoxFlexStatustoModel(){
    if (this.model) {
      if(this.timeBox =='on'){
        delete this.model[0]["timeBox"];
        this.model[0]["timeBox"] = this.timeBox;

        delete this.model[0]["timebox_start_time"];
        this.model[0]["timebox_start_time"] = moment(this.stime).format("hh:mm a");

        delete this.model[0]["timebox_end_time"];
        this.model[0]["timebox_end_time"] = moment(this.etime).format("hh:mm a");

        delete this.model[0]["weekFlexDays"];
        this.model[0]["weekFlexDays"] = this.weekFlexDays;

      } else {

        delete this.model[0]["timeBox"];
        this.model[0]["timeBox"] = this.timeBox;

        //delete rest from model
        delete this.model[0]["timebox_start_time"];
      
        delete this.model[0]["timebox_end_time"];
      
        delete this.model[0]["weekFlexDays"];
     
      }
    }

  }

  // addToModel() {
  //   if (this.model) {
  //     delete this.model[0]["utilisation_increase_threshold_pc"];
  //     this.model[0]["utilisation_increase_threshold_pc"] = this.flexupUtilisation;
  //     delete this.model[0]["increased_utilisation_mode"];
  //     this.model[0]["increased_utilisation_mode"] = this.flexUp;


  //     delete this.model[0]["increased_utilisation_monitor_time_period"];
  //     this.model[0]["increased_utilisation_monitor_time_period"] = this.flexupUtilisationMinutes;


  //   }
  //   console.log("this.schema", this.schema);

  // }


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }



  setFlexButtonstyle(btn: any, type: any) {
    if (type == "up") {
      const btnNor = document.getElementsByClassName(
        "btnActivated"
      ) as HTMLCollectionOf<HTMLElement>;
      btnNor[0].classList.remove("btnActivated");
      const btnAct = document.getElementsByClassName(btn) as HTMLCollectionOf<
        HTMLElement
      >;
      btnAct[0].classList.add("btnActivated");
    } else {
      const btnNor = document.getElementsByClassName(
        "btnActivatedDown"
      ) as HTMLCollectionOf<HTMLElement>;
      btnNor[0].classList.remove("btnActivatedDown");
      const btnAct = document.getElementsByClassName(btn) as HTMLCollectionOf<
        HTMLElement
      >;
      btnAct[0].classList.add("btnActivatedDown");
    }
  }

  setTimeBox(event: any, timeboxState: any) {
    this.timeBox = timeboxState;
    const btnNor = document.getElementsByClassName(
      "btnActivatedTimebox"
    ) as HTMLCollectionOf<HTMLElement>;
    btnNor[0].classList.remove("btnActivatedTimebox");
    event.currentTarget.classList.add("btnActivatedTimebox");
    this.addTimeBoxFlexStatustoModel();
  }

  setWeekDay(event: any, day: any) {
    this.weekFlexDays[day] = !this.weekFlexDays[day];
    if (!this.checkFlexCondition()) this.isValid = false;
    else {
      //if (this.leftknob > this.minValue) 
      this.isValid = true;
      //else this.isValid = false;
    }
    this.addweekdaystoModel();
  }

  //end of from on-demand configure page


}
