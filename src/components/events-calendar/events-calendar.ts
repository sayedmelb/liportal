import { Component, Input, SimpleChanges, EventEmitter, Output } from "@angular/core";
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
  selector: "events-calendar",
  templateUrl: "events-calendar.html"
})

export class EventsCalendar {
  @Input("schema") schema: any;
  @Input("model") model: any;
  @Output() checkCalendarOpenstatus = new EventEmitter();

  public dynamicdata: any;
  networkType: string = "P2P";

  show: boolean = false;
  events: CalendarEvent[] = [{ d: new Date(), text: 'My Big Event' }, { d: new Date(), text: 'My Big Event continued' }];
  eventdata: any;




  constructor(public permdataService: DynamicService, private externalProvider: ExternalProvider, private http: HttpClient, private logger: NGXLogger) {

    this.dynamicdata = permdataService.getOption();
  }

  ngOnInit() {
    if (this.model && this.model[0].events_calendar.products)
    this.eventdata = this.filterCancelledEvents(this.model[0].events_calendar.products[0]);
  }

  
  filterCancelledEvents(eventdata: any) {
    let count: number = 0;
    let tempeventsdata = [];

    let state: boolean = false;
    _.forEach(eventdata.scheduler, event => {
      if (event.status) {
        if (event.status[0].substatus == "cancelled") {
          state = true;
        }

      }
      if (state == false) {
        tempeventsdata.push(event);
      } else {
        //do not add
        state = false;
      }



    });
    console.log("filtered event list", tempeventsdata);



    let scheduler = {
      scheduler: tempeventsdata
    }
    return scheduler;




  }


  toggle() {
    this.show = !this.show;
    this.checkCalendarOpenstatus.emit({ status: this.show });
  }







}
