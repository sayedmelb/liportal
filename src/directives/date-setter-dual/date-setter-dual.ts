import { Component, Input ,  Output,
    EventEmitter, } from "@angular/core";
//import { AppConstants } from '../../providers/avp.enum';
//import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
//import { HttpClient } from "@angular/common/http";
import { NGXLogger } from "ngx-logger";
import { mobiscroll, MbscDatetimeOptions , MbscCalendarOptions } from '@mobiscroll/angular';
import moment from 'moment';


const MESH_KEYWORD = "Mesh";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";

@Component({
  selector: "date-setter-dual",
  templateUrl: "date-setter-dual.html"
})

export class DateSetterDual {
  @Input("schema") schema: any;
  @Input("model") model: any;
  @Output() datesetterChange = new EventEmitter();
  
  public dynamicdata: any;
  networkType: string = "P2P";

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
    dateFormat: 'D d M, yy'
};



  

  scheduled_start_date = new Date();
  scheduled_end_date = "";//new Date(); //Date(2018, 10, 1, 17, 30);// new Date();



  constructor( private logger: NGXLogger) {

    //this.dynamicdata = permdataService.getOption();
  }

  ngOnInit() {
    
 // console.log("MODEL IN DATE SETTER", this.model);
  }

  onPickDate(controlId,data) {
  //  console.log("start date , end date", this.scheduled_start_date, this.scheduled_end_date);

    //if( controlId == 'end_date' && this.scheduled_start_date> this.scheduled_end_date) {
     // alert("Start date cannot be latter than End Date");
   //   return false;
  //  } else {
    let momentdate = moment(data);
    let momentdatefor=  moment(data).format("YYYY-MM-DD");
   // console.log("momentdate", momentdate);
  //  console.log("momentdatefor", momentdatefor);

      this.datesetterChange.emit({datecontrolId: controlId, date: moment(data).format("YYYY-MM-DD"), fulldate: data});  
    //}
    // console.log("DATA DATE in date-setter mobiscroll date: ", data);
    // console.log("DATA DATE in date-setter moment date date: ",moment(data));
    // console.log("DATA DATE in date-setter moment UTC date date: ",moment(data).format("YYYY-MM-DD HH:mm:ss"));
    
  }
 

  







}
