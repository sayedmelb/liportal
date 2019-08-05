import { Component, Input, OnInit } from '@angular/core';
import { MbscEventcalendarOptions } from '@mobiscroll/angular';
import * as _ from 'lodash';

import moment from 'moment';
import { setupEvents } from 'ionic-angular';
const now = new Date();

/**
 * Generated class for the CalendarWidgetComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'calendar-widget',
  templateUrl: 'calendar-widget.html'
})
export class CalendarWidgetComponent implements OnInit {

  @Input() events: Array<CalendarEvent> = new Array<CalendarEvent>();
  @Input("eventdata") eventdata: any;


  calendarEvents: any[];

  calendar: Date;
  calendarSettings: MbscEventcalendarOptions = {
    display: 'inline',
    theme: 'material',
    layout: 'liquid',
    showEventCount: true,
    returnFormat: 'moment'

  };

  constructor() {
    //console.log('Hello CalendarWidgetComponent Component');
  }

  ngOnInit() {
    this.seteventcal(this.eventdata);
    console.log("eventsdata", this.eventdata)
  }

  seteventcal(product) {
    console.log("event product", product);
    let newModel = [];
    _.forEach(product.scheduler, model => {
    
      let newObj = {};

      _.forIn(model, (value, key) => {
        newObj['d'] = this.formatDate(model.properties.start_date, model.properties.start_time); // new Date(2019, 5, 15, 12, 32, 0, 0);//moment(ddate).format("MM/DD/YYYY HH:MM a");// + " ";// + model.properties.start_time;
        newObj['text'] = "Scheduled Event: " + moment(model.properties.start_date).startOf('day').format("LL") + " " +  model.properties.start_time + " to <br>" + moment(model.properties.end_date).startOf('day').format("LL")  + " " + model.properties.end_time + " Flex to " + model.properties.requestedBw;
      });
      newModel.push(newObj);
    });
    this.calendarEvents = newModel;
  }


  formatDate(input, start_time) {
    let datePart = input.match(/\d+/g),
      //year = datePart[0].substring(2), // get only two digits
      year = datePart[0].substring(0, 4),
      month = datePart[1], day = datePart[2];

    let timeary = _.words(start_time);
    let hh = timeary[0]
    let mm = timeary[1];
    let ampm = timeary[2];
    //console.log("ampm", ampm, ampm == 'am');

    if (ampm == 'am') {
      if (hh == '12')
        hh = '00';

    } else {
      if (parseInt(hh) > 0 && parseInt(hh) < 12)
        hh = (parseInt(hh) + 12).toString();
     // console.log("hh", hh);
      // if(parseInt(hh)<12)

    }
    //console.log("timeary", timeary);

    //return day + '/' + month + '/' + year;
    return new Date(year, parseInt(month) - 1, day, parseInt(hh), parseInt(mm), 0)
  }




}


export class CalendarEvent {
  d: Date;
  text: string;

  constructor(date: Date, text: string) {
    this.d = date;
    this.text = text;
  }
}
