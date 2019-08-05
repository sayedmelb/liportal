import { Component, Input, Output, EventEmitter, } from "@angular/core";
import * as _ from 'lodash';
import { NGXLogger } from "ngx-logger";
import moment from 'moment';
import { NumberFormatStyle } from "@angular/common";

const MESH_KEYWORD = "Mesh";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";

@Component({
  selector: "flex-scheduling",
  templateUrl: "flex-scheduling.html"
})

export class FlexScheduling {
  @Input("schema") schema: any;
  @Input("model") model: any;
  //@Output() network = new EventEmitter();

  public dynamicdata: any;

  public disabled: boolean = false;
  public is_valid: boolean = false;
  networkType: string = "P2P"
  stateControl: string = "Once";

  checkboxlist: any = [];
  noOfOccurance: number = 1;
  totalHoursAllOccurances: number = 0;
  totalHoursAllOccurancesRaw: string = "";
  perweeklyoccuranceCount: number = 1;
  start_date: Date = new Date();
  end_date: Date = new Date();
  timehourslocal: string = "";
  single_date: Date = new Date();
  single_date1: Date = new Date();






  show: boolean = true;


  constructor(private logger: NGXLogger) {

    //this.dynamicdata = permdataService.getOption();
  }

  ngOnInit() {

    if (this.schema.datasource && _.has(this.schema.datasource[0], TOPOLOGY_PATH)) {
      if (this.schema.datasource[0].selectedProduct.properties.topology == MESH_KEYWORD) {
        this.networkType = "Mesh";
      } else {
        this.networkType = "P2P";
      }

      //this.network.emit({ network: this.networkType });
    }

    this.assignInitialValuetoModel()


  }

  ngDoCheck() {
    if (this.schema.datasource && _.has(this.schema.datasource[0], TOPOLOGY_PATH)) {
      if (this.schema.datasource[0].selectedProduct.properties.topology == MESH_KEYWORD) {
        this.networkType = "Mesh";
      } else {
        this.networkType = "P2P";
      }

    }

  }

  assignInitialValuetoModel() {
    let curdate = new Date();
    if (this.stateControl == 'Once') {
      this.noOfOccurance = 1;// this.calculateTotalOccurancesInDateRangeforOnce();
      this.totalHoursAllOccurancesRaw = this.convertToHourMinWords(this.timehourslocal);
    }

    this.addToModel();
    this.addreoccurancetoModel("recurrence_type", "Once");
    let datetimeval = new Date();

    datetimeval = new Date(2018, 10, 1, datetimeval.getHours(), datetimeval.getMinutes(), datetimeval.getSeconds());
    let starttime = this.getTimeformatampm(datetimeval);
    console.log("datetime", datetimeval);
    this.addtimecontroltoModel("start_time", starttime);
    //this.addtimecontroltoModel("start_time", "08:30 am");
    // this.addtimecontroltoModel("end_time", "09:30 am");
    this.addDatePickedToModel("single_date", moment(curdate).format("YYYY-MM-DD"));

  }

  getTimeformatampm(datetime: Date) {
    let hr = datetime.getHours();
    let min = datetime.getMinutes();
    let hourmin = "";
    let ampm = "am";//default
    if (hr > 12) {
      hr = hr % 12;
      ampm = "pm";
    } else if (hr == 12) {
      hr = 12;
      ampm = "am";
    } else {
      ampm = "am";
    }

    hourmin = hr + ":" + min + " " + ampm;
    return hourmin;


  }

  OnTimePicked(event) {
    let timesetterId = event.timecontrolId;
    this.addtimecontroltoModel(timesetterId, event.time);


  }

  addtimecontroltoModel(timesetterId, time) {

    if (this.networkType == "P2P") {
      delete this.model[0][timesetterId];

      this.model[0][timesetterId] = time;
      delete this.model[1][timesetterId];
      this.model[1][timesetterId] = time;


    } else {
      delete this.model[0][timesetterId];
      this.model[0][timesetterId] = time;
    }
  }

  OnDatePicked(event) {

    let datesetterId = event.datecontrolId;
    this.addDatePickedToModel(datesetterId, event.date);

    if (this.stateControl == 'Once') {

      this.noOfOccurance = 1;// this.calculateTotalOccurancesInDateRangeforOnce();
      //alert("this.noOfOccurance" + this.noOfOccurance);
      this.totalHoursAllOccurancesRaw = this.calculateTotalHours(this.noOfOccurance, this.calculateTotalHoursForOnce(this.noOfOccurance));// this.calculateTotalHours(this.noOfOccurance, this.totalHoursAllOccurances);
    }


    console.log("flex-scheduleing model after new date", this.model);

    if (this.stateControl == 'Monthly') {
      this.noOfOccurance = this.calculateTotalOccurancesInMonthRange();
      this.totalHoursAllOccurancesRaw = this.calculateTotalHours(this.noOfOccurance, this.totalHoursAllOccurances);
    } else if (this.stateControl !== 'Once') {
      this.noOfOccurance = this.calculateTotalOccurancesInDateRange();
      this.totalHoursAllOccurancesRaw = this.calculateTotalHours(this.noOfOccurance, this.totalHoursAllOccurances);
    }

    this.addToModel();

  }

  addDatePickedToModel(datesetterId, datevalue) {
    if (datesetterId == 'start_date')
      this.start_date = datevalue;
    if (datesetterId == 'end_date')
      this.end_date = datevalue;



    if (datesetterId == 'single_date') {
      this.single_date = datevalue;
    }
    if (datesetterId == 'single_date1') {
      this.single_date1 = datevalue;
    }

    if (this.networkType == "P2P") {
      delete this.model[0][datesetterId];

      this.model[0][datesetterId] = datevalue;
      delete this.model[1][datesetterId];
      this.model[1][datesetterId] = datevalue;


    } else {
      delete this.model[0][datesetterId];
      this.model[0][datesetterId] = datevalue;
    }

  }



  UpdateStartEndDate(state: string) {
    let curdate = new Date();

    if (state == 'removesingles') {
      if (this.networkType == "P2P") {
        delete this.model[0]['single_date'];

        this.model[0]['start_date'] = moment(curdate).format("YYYY-MM-DD");
        delete this.model[1]['single_date'];
        this.model[1]['start_date'] = moment(curdate).format("YYYY-MM-DD");

        delete this.model[0]['single_date1'];
        this.model[0]['end_date'] = moment(curdate).format("YYYY-MM-DD");
        delete this.model[1]['single_date1'];
        this.model[1]['end_date'] = moment(curdate).format("YYYY-MM-DD");

        //this.model[1]['end_date'] = moment(curdate).format("YYYY-MM-DD");


      } else {
        delete this.model[0]['single_date'];
        this.model[0]['start_date'] = moment(curdate).format("YYYY-MM-DD");
        delete this.model[0]['single_date1'];
        this.model[0]['end_date'] = moment(curdate).format("YYYY-MM-DD");


      }

    } else {

      if (this.networkType == "P2P") {
        delete this.model[0]['start_date'];

        this.model[0]['single_date'] = moment(curdate).format("YYYY-MM-DD");
        delete this.model[1]['start_date'];
        this.model[1]['single_date'] = moment(curdate).format("YYYY-MM-DD");

        delete this.model[0]['end_date'];
        this.model[0]['single_date1'] = moment(curdate).format("YYYY-MM-DD");
        delete this.model[1]['end_date'];
        this.model[1]['single_date1'] = moment(curdate).format("YYYY-MM-DD");

        //this.model[1]['end_date'] = moment(curdate).format("YYYY-MM-DD");


      } else {
        delete this.model[0]['start_date'];
        this.model[0]['single_date'] = moment(curdate).format("YYYY-MM-DD");
        delete this.model[0]['end_date'];
        this.model[0]['single_date1'] = moment(curdate).format("YYYY-MM-DD");


      }

    }

  }

  OnRecurrencePicked(event) {



    let recurrenceId = event.recurrencecontrolId;

    this.stateControl = event.value;

    //if state not once then remove single date in model and add start 
    //end date will be only added if user selects. this will be used for validation to go to next page (review)

    if (this.stateControl !== 'Once') {
      this.UpdateStartEndDate('removesingles');
    }

    if (this.stateControl == 'Daily' || this.stateControl == 'Weekly') {
      this.checkboxlist = this.schema.settings.radiolist[0].dataSource[1].weekdays;
      this.noOfOccurance = this.calculateTotalOccurances(this.checkboxlist);
      this.totalHoursAllOccurancesRaw = this.calculateTotalHours(this.noOfOccurance, this.timehourslocal);
    }

    if (this.stateControl == 'Monthly') {
      this.checkboxlist = this.schema.settings.radiolist[0].dataSource[3].monthdays;
      this.noOfOccurance = this.calculateTotalOccurances(this.checkboxlist);
      this.totalHoursAllOccurancesRaw = this.calculateTotalHours(this.noOfOccurance, this.timehourslocal);

    }


    if (this.stateControl == 'Once') {
      this.noOfOccurance = 1;
      this.totalHoursAllOccurancesRaw = this.convertToHourMinWords(this.timehourslocal);
      this.UpdateStartEndDate('addsingles');
    }

    this.addToModel();

    this.addreoccurancetoModel(recurrenceId, event.value)



    console.log("flex-scheduleing recurrence", this.model);

  }
  addreoccurancetoModel(recurrenceId, value) {
    if (this.networkType == "P2P") {
      delete this.model[0][recurrenceId];

      this.model[0][recurrenceId] = value;
      delete this.model[1][recurrenceId];
      this.model[1][recurrenceId] = value;




    } else {
      delete this.model[0][recurrenceId];
      this.model[0][recurrenceId] = value;
    }
    console.log("flex-scheduleing recurrence", this.model);
  }

  OnTimeHoursMinutes(event) {
    if (this.stateControl == 'Once') {
      this.totalHoursAllOccurances = event.timehours;
      this.totalHoursAllOccurancesRaw = this.convertToHourMinWords(event.timehours);
      this.timehourslocal = event.timehours;
      this.noOfOccurance = 1;// this.calculateTotalOccurancesInDateRangeforOnce();
      this.addToModel();
    }
    else // else has to be updated
    {

      this.totalHoursAllOccurances = event.timehours;
      this.noOfOccurance = this.calculateTotalOccurances(this.checkboxlist);

      this.totalHoursAllOccurancesRaw = this.calculateTotalHours(this.noOfOccurance, this.totalHoursAllOccurances); //this.convertToHourMinWords(event.timehours);
      this.addToModel();
    }


  }

  OnCheckBoxListChange(event) {

    if (this.stateControl == 'Daily') {
      this.noOfOccurance = this.calculateTotalOccurances(event.checkboxlist);
      this.totalHoursAllOccurancesRaw = this.calculateTotalHours(this.noOfOccurance, this.totalHoursAllOccurances);
    }

    if (this.stateControl == 'Weekly') {
      this.noOfOccurance = this.calculateTotalOccurances(event.checkboxlist);
      this.totalHoursAllOccurancesRaw = this.calculateTotalHours(this.noOfOccurance, this.totalHoursAllOccurances);
    }
    if (this.stateControl == 'Monthly') {
      this.noOfOccurance = this.calculateTotalOccurances(event.checkboxlist);
      this.totalHoursAllOccurancesRaw = this.calculateTotalHours(this.noOfOccurance, this.totalHoursAllOccurances);
    }
    this.addToModel();

  }

  OnWeeklyChangeCount(event) {
    this.perweeklyoccuranceCount = parseInt(event.weeklyCountChange);

  }

  calculateTotalOccurances(list) {
    let count = 0;
    _.forEach(list, model => {
      console.log("model", model);
      if (model.checked)
        count++;

    });


    return count;
  }

  calculateTotalHoursForOnce(occurance) {
    let timediff: any;
    
    let timeary = _.words(this.model[0].start_time);
    let hh = timeary[0]
    let mm = timeary[1];
    let ampm = timeary[2];

    if (ampm == 'am') {
      if (hh == '12')
        hh = '00';

    } else {
      if (parseInt(hh) > 0 && parseInt(hh) < 12)
        hh = (parseInt(hh) + 12).toString();

    }


    let start_time = new Date(parseInt(moment(this.model[0].single_date).format("YYYY")), parseInt(moment(this.model[0].single_date).format("MM")), parseInt(moment(this.model[0].single_date).format("DD")), parseInt(hh), parseInt(mm), 0);

    timeary = _.words(this.model[0].end_time);
    hh = timeary[0]
    mm = timeary[1];
    ampm = timeary[2];

    if (ampm == 'am') {
      if (hh == '12')
        hh = '00';

    } else {
      if (parseInt(hh) > 0 && parseInt(hh) < 12)
        hh = (parseInt(hh) + 12).toString();

    }

    
    let end_time = new Date(parseInt(moment(this.model[0].single_date1).format("YYYY")), parseInt(moment(this.model[0].single_date1).format("MM")), parseInt(moment(this.model[0].single_date1).format("DD")), parseInt(hh), parseInt(mm), 0);

    let ms = moment(end_time, "DD/MM/YYYY HH:mm:ss").diff(moment(start_time, "DD/MM/YYYY HH:mm:ss"));
    let d = moment.duration(ms);


    timediff = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");

    

    return timediff;

  }

  calculateTotalHours(occurance, hours): string {

    let hour = 0;
    let min = 0;
    let totalOccurHours = 0;
    let totalOccurMins = 0;

    let hrminArray = _.words(hours);
    if (occurance == 0)
      return this.totalHoursAllOccurancesRaw;

    hour = parseInt(hrminArray[0]);

    totalOccurHours = hour * occurance;
    let temptotalOccurHoursinmin = totalOccurHours * 60;

    if (hrminArray[1] == '00')
      min = 0;
    else
      min = parseInt(hrminArray[1]);

    totalOccurMins = min * occurance;

    temptotalOccurHoursinmin = temptotalOccurHoursinmin + totalOccurMins;

    let tempstr: string = (temptotalOccurHoursinmin / 60).toString();
    let temphour = parseInt(tempstr);
    let tempmin = temptotalOccurHoursinmin % 60;
    totalOccurHours = temphour;
    totalOccurMins = tempmin;

    return totalOccurHours + " hour(s) " + totalOccurMins + " min(s)"

  }

  calculateTotalOccurancesInDateRange() {

    var dates = [];
    var count = 0;

    var currDate = moment(this.start_date).startOf('day');
    currDate.subtract(1, 'days'); // to include start date;

    var actualcurrDate = moment(this.start_date).startOf('day');

    var startWeedDayName = actualcurrDate.format('dddd');

    let curWeekdayname;

    var lastDate = moment(this.end_date).startOf('day');
    lastDate.add(1, 'days'); //to include end date

    let runningweekCount: number = 0;
    let recurfreq; //running frequency
    recurfreq = this.perweeklyoccuranceCount;
    recurfreq = parseInt(recurfreq);
    let wcount: number = 1; // initial working count (week to consider counts)
    let nextwcount = wcount + recurfreq; // nextwcount is the next week to count days (like step value in for loop


    while (currDate.add(1, 'days').diff(lastDate) < 0) {

      curWeekdayname = currDate.format('dddd');

      if (startWeedDayName == curWeekdayname) {
        runningweekCount++;
        if (runningweekCount == nextwcount) {
          wcount = nextwcount;
          nextwcount = nextwcount + recurfreq;
        }

      }

      if (wcount == runningweekCount) {
        _.forEach(this.checkboxlist, p => {
          if (p.day == curWeekdayname && p.checked == true)
            count++;

        });
      }

    }
    return count;

  }

  calculateTotalOccurancesInDateRangeforOnce() {
    var dates = [];
    var count = 0;

    var currDate = moment(this.single_date).startOf('day');
    currDate.subtract(1, 'days'); // to include start date;

    var actualcurrDate = moment(this.single_date).startOf('day');

    var startWeedDayName = actualcurrDate.format('dddd');

    let curWeekdayname;

    var lastDate = moment(this.single_date1).startOf('day');
    lastDate.add(1, 'days'); //to include end date
    while (currDate.add(1, 'days').diff(lastDate) < 0) {
      //logic to be add in latter stage just get count
      count++;
    }
    //count = currDate.add(1, 'days').diff(lastDate);
    //alert(count);
    if (count > 0)
      return count;
    else
      return 1;
  }

  calculateTotalOccurancesInMonthRange() {
    var dates = [];
    var count = 0;

    var currDate = moment(this.start_date).startOf('day');
    currDate.subtract(1, 'days'); // to include start date;

    var lastDate = moment(this.end_date).startOf('day');
    lastDate.add(1, 'days'); //to include end date
    while (currDate.add(1, 'days').diff(lastDate) < 0) {

      _.forEach(this.checkboxlist, p => {
        if (p.day == currDate.date() && p.checked == true)
          count++;

      });
    }

    return count;

  }


  convertToHourMinWords(hourmin) {
    let hrminArray = _.words(hourmin);
    let preparedhrmin
    if (hrminArray[1] == "00")
      preparedhrmin = hrminArray[0] + " hour(s)"
    else
      preparedhrmin = hrminArray[0] + " hour(s) " + hrminArray[1] + " min(s)"
    return preparedhrmin;
  }

  addToModel() {
    if (this.model) {
      if (this.networkType == "P2P") {
        delete this.model[0]["totalOccurance"];
        delete this.model[0]["totalHoursOccurance"];

        this.model[0]["totalOccurance"] = this.noOfOccurance;
        this.model[0]["totalHoursOccurance"] = this.totalHoursAllOccurancesRaw;

        delete this.model[1]["totalOccurance"];
        delete this.model[1]["totalHoursOccurance"];

        this.model[1]["totalOccurance"] = this.noOfOccurance;
        this.model[1]["totalHoursOccurance"] = this.totalHoursAllOccurancesRaw;


      } else {
        delete this.model[0]["totalOccurance"];
        delete this.model[0]["totalHoursOccurance"];

        this.model[0]["totalOccurance"] = this.noOfOccurance;
        this.model[0]["totalHoursOccurance"] = this.totalHoursAllOccurancesRaw;

      }
    }

  }





}
