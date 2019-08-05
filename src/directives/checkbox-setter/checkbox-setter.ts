import {
  Component, Input, Output,
  EventEmitter,
} from "@angular/core";

import * as _ from 'lodash';
import { NGXLogger } from "ngx-logger";
import { mobiscroll, MbscDatetimeOptions, MbscCalendarOptions } from '@mobiscroll/angular';
import moment from 'moment';


const MESH_KEYWORD = "Mesh";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";

@Component({
  selector: "checkbox-setter",
  templateUrl: "checkbox-setter.html"
})

export class CheckboxSetter {
  @Input("schema") schema: any;
  @Input("model") model: any;
  @Input("stateControl") stateControl: any;
  @Input("network") network: any;
  @Input("checkboxlist") checkboxlist: any;
  @Output() checkboxlistChange = new EventEmitter();
  @Output() weeklyCountChange = new EventEmitter();

  weeklyCount: number =1;




  public dynamicdata: any;
  networkType: string = "P2P";

  public disabled: boolean = false;
  public is_valid: boolean = false;


  desktopSettings: MbscDatetimeOptions = {
    touchUi: false,
    dateFormat: 'D d M, yy'
  };





  single_occurance_date = new Date();


  dayslist: any = [
  ];


  constructor(private logger: NGXLogger) {

    //this.dynamicdata = permdataService.getOption();
  }

  ngOnInit() {
    this.single_occurance_date = new Date();
    this.dayslist = this.checkboxlist;
  }



  checkDay(day) {
    if (this.model) {
      if (this.network && this.network == "P2P") {
        delete this.model[0]['recurrence'];
        this.model[0]['recurrence'] = { type: this.stateControl, values: this.dayslist }
        delete this.model[1]['recurrence'];
        this.model[1]['recurrence'] = { type: this.stateControl, values: this.dayslist }
      } else {
        delete this.model[0]['recurrence'];
        this.model[0]['recurrence'] = { type: this.stateControl, values: this.dayslist }
      }

      this.checkboxlistChange.emit({ checkboxlist: this.dayslist });
    }


   // console.log("weekdays IN model ", this.model);
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  updateWeeklyCount(event) {

    //console.log("this. weekly count",this.weeklyCount);
    if(this.weeklyCount<1)
    {
      alert("Minimum cannot be less than 1 week");
    //reset to min
    this.weeklyCount =1;
    }

    this.weeklyCountChange.emit({ weeklyCountChange: this.weeklyCount });


  }










}
