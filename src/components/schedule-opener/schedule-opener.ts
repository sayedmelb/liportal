import { Component, Input, SimpleChanges } from "@angular/core";
import { DynamicService } from '../../providers/dynamic-service/dynamic-service';
import { ExternalProvider } from "../../providers/external/external";
import { AppConstants } from '../../providers/avp.enum';
//import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { HttpClient } from "@angular/common/http";
import { NGXLogger } from "ngx-logger";
import { CalendarEvent } from "../calendar-widget/calendar-widget";
import moment from 'moment';

const MESH_KEYWORD = "Mesh";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";

@Component({
  selector: "schedule-opener",
  templateUrl: "schedule-opener.html"
})

export class ScheduleOpener {
  @Input("schema") schema: any;
  @Input("model") model: any;
  
  public dynamicdata: any;
  networkType: string = "P2P";

  show: boolean = true;
  events: CalendarEvent[] = [{ d: new Date(), text: 'My Big Event' }, { d: new Date(), text: 'My Big Event continued' }];

  



  constructor(public permdataService: DynamicService, private externalProvider: ExternalProvider, private http: HttpClient, private logger: NGXLogger) {

    this.dynamicdata = permdataService.getOption();
  }

  ngOnInit() {
    // let date1: any = new Date();//  moment(dt,"DD/MM/YYYY HH:mm:ss").valueOf();//.format("DD/MM/YYYY HH:mm:ss"); //dt.getTime(); // moment(dt).subtract(0, 'minutes').format("DD/MM/YYYY HH:mm:ss");
    // let date2: any = new Date();
    // //utcformat
    // let date3: any = moment(date2).format("YYYY-MM-DDThh:mm:ssTZD"); //.format("DD/MM/YYYY HH:mm:ss");


    // console.log("events", this.events, date1, date2, date3);
    //[{ d: new Date(), text: 'My Big Event' }];
    
  
  }
 

  toggle() {
    this.show = !this.show;
  }







}
