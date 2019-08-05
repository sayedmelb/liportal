import {
  Component, Input, Output,
  EventEmitter,
} from "@angular/core";
//import { AppConstants } from '../../providers/avp.enum';
//import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
//import { HttpClient } from "@angular/common/http";
import { NGXLogger } from "ngx-logger";
import { mobiscroll, MbscDatetimeOptions, MbscCalendarOptions } from '@mobiscroll/angular';
import moment from 'moment';
import { dateDataSortValue } from "ionic-angular/umd/util/datetime-util";


const MESH_KEYWORD = "Mesh";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";

@Component({
  selector: "time-setter-dual",
  templateUrl: "time-setter-dual.html"
})

export class TimeSetterDual {
  @Input("schema") schema: any;
  @Input("model") model: any;
  @Output() timesetterChange = new EventEmitter();
  @Output() timehoursChange = new EventEmitter();

  public dynamicdata: any;
  networkType: string = "P2P";
  timediff: any;

  public disabled: boolean = false;
  public is_valid: boolean = false;
  // public dateSettings: MbscCalendarOptions = {
  //   touchUi: false,
  //   controls: ['calendar', 'time'],
  //   min: new Date()
  // };

  // public timeSettings: MbscDatetimeOptions  = {
  //   touchUi: false,
  //   controls: ['calendar', 'time'],
  //   min: new Date()
  // };

  desktopSettings: MbscDatetimeOptions = {
    touchUi: false,
    timeFormat: 'hh:ii A'
  };





  scheduled_start_time =  new Date(); //Date(2018, 10, 1, 8, 30); //new Date();
  scheduled_end_time: any ;// new Date(); //Date(2018, 10, 1, 9, 30);// new Date();
 


  constructor(private logger: NGXLogger) {

    //this.dynamicdata = permdataService.getOption();
  }

  ngOnInit() {

    let datetimeval = new Date();
    console.log("datetime", datetimeval);
    this.scheduled_start_time = new Date(2018,10,1, datetimeval.getHours(), datetimeval.getMinutes(), datetimeval.getSeconds());


    //this.timediff = moment.utc(moment(this.scheduled_end_time, "DD/MM/YYYY HH:mm:ss").diff(moment(this.scheduled_start_time, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm");
    this.timediff = moment.utc(moment(this.scheduled_start_time, "DD/MM/YYYY HH:mm:ss").diff(moment(this.scheduled_start_time, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm");    
    this.timehoursChange.emit({ timehours: this.timediff });
    // console.log("MODEL IN TIME SETTER", this.model);
  }

  onPickTime(controlId, data) {
    //console.log("DATA TIME in time-setter: ", data);

    if(controlId =='end_time')// if end time is only selected
    this.scheduled_end_time = new Date(2018,10,1, this.scheduled_end_time.getHours(), this.scheduled_end_time.getMinutes(), this.scheduled_end_time.getSeconds());
    
    this.scheduled_start_time = new Date(2018,10,1, this.scheduled_start_time.getHours(), this.scheduled_start_time.getMinutes(), this.scheduled_start_time.getSeconds());

    let starttime = this.scheduled_start_time;
    let endtime = this.scheduled_end_time;
    console.log("Start time:", this.scheduled_start_time);
    console.log("End time:", this.scheduled_end_time);

    // if (starttime > endtime) {
    //   console.log("not allowed");
    //   alert("End time cannot be less than start time select some other time");
    //   if (controlId == 'start_time') {
    //     this.scheduled_start_time = new Date(2018, 10, 1, 8, 30); //new Date();
    //     starttime = this.scheduled_start_time;
    //   }

    //   if (controlId == 'end_time') {
    //     this.scheduled_end_time = new Date(2018, 10, 1, 17, 30);// new Date();
    //     endtime = this.scheduled_end_time;
    //   }

     

    // }
    
    // else {

    //   console.log("allowed");
    //   this.timediff = moment.utc(moment(endtime, "DD/MM/YYYY HH:mm:ss").diff(moment(starttime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm");
    //   console.log("timediff", this.timediff);

    // }

    this.timesetterChange.emit({ timecontrolId: controlId, time: moment(data).format("hh:mm a"), fulldate: data });
    this.timediff = moment.utc(moment(endtime, "DD/MM/YYYY HH:mm:ss").add(1,'minutes').diff(moment(starttime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm");
    this.timehoursChange.emit({ timehours: this.timediff });



  }










}
