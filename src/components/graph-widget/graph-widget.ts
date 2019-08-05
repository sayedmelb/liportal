import {
  Component,
  ViewChild,
  Input
} from "@angular/core";
import {
  ExternalProvider
} from "../../providers/external/external";
import {
  NGXLogger
} from "ngx-logger";
import {
  mobiscroll,
  MbscDatetimeOptions
} from '@mobiscroll/angular';
import moment from 'moment';
import * as _ from 'lodash';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { dateDataSortValue } from "ionic-angular/umd/util/datetime-util";

mobiscroll.settings = {
  theme: 'ios',
  display: 'bubble'
};
@Component({
  selector: "graph-widget",
  templateUrl: "graph-widget.html"
})
export class GraphWidget {
  @Input('schema') schema;
  isLoading: boolean = true;
  serviceID : string = '';
  isReporting: boolean = false;
  start: Date;
  end: Date;
  nonForm: Date;
  external: Date = new Date();
  groupWheel = 1;
  selectedFrame = "Today";
  frameSelection: Array<String> = ["Specific",
    "Past 1 Hour", "Past 2 Hours", "Past 4 Hours", "Past 8 Hours", "Past 24 Hours", "Past 48 Hours",
    "Today", "Yesterday",
    "Past 7 days", "Past week", "Last week", "Past 4 weeks", "Past 12 weeks",
    "Past month", "This month", "Last month", "Past 3 months",
    "Last quarter", "This quarter"
  ];
  selectedLocation = "Australia-Melbourne";
  locations = [
    {
      "group": "AUSTRALIA",
      "locations": [{
        "Value": "Antarctica-Macquarie",
        "Name": "Macquarie"
      }, {
        "Value": "Australia-Adelaide",
        "Name": "Adelaide"
      }, {
        "Value": "Australia-Brisbane",
        "Name": "Brisbane"
      }, {
        "Value": "Australia-Broken_Hill",
        "Name": "Broken Hill"
      }, {
        "Value": "Australia-Currie",
        "Name": "Currie"
      }, {
        "Value": "Australia-Darwin",
        "Name": "Darwin"
      }, {
        "Value": "Australia-Eucla",
        "Name": "Eucla"
      }, {
        "Value": "Australia-Hobart",
        "Name": "Hobart"
      }, {
        "Value": "Australia-Lindeman",
        "Name": "Lindeman"
      }, {
        "Value": "Australia-Lord_Howe",
        "Name": "Lord Howe"
      }, {
        "Value": "Australia-Melbourne",
        "Name": "Melbourne"
      }, {
        "Value": "Australia-Perth",
        "Name": "Perth"
      }, {
        "Value": "Australia-Sydney",
        "Name": "Sydney"
      }]
    }, {
      "group": "CHINA",
      "locations": [{
        "Value": "Asia-Shanghai",
        "Name": "Shanghai"
      }, {
        "Value": "Asia-Urumqi",
        "Name": "Urumqi"
      }]
    }, {
      "group": "COORDINATED UNIVERSAL TIME",
      "locations": [{
        "Value": "UTC",
        "Name": "UTC"
      }]
    }, {
      "group": "FRANCE",
      "locations": [{
        "Value": "Europe-Paris",
        "Name": "Paris"
      }]
    }, {
      "group": "GERMANY",
      "locations": [{
        "Value": "Europe-Berlin",
        "Name": "Berlin"
      }, {
        "Value": "Europe-Busingen",
        "Name": "Busingen"
      }]
    }, {
      "group": "INDIA",
      "locations": [{
        "Value": "Asia-Kolkata",
        "Name": "Kolkata"
      }]
    }, {
      "group": "JAPAN",
      "locations": [{
        "Value": "Asia-Tokyo",
        "Name": "Tokyo"
      }]
    }, {
      "group": "RUSSIAN FEDERATION",
      "locations": [{
        "Value": "Asia-Anadyr",
        "Name": "Anadyr"
      }, {
        "Value": "Asia-Chita",
        "Name": "Chita"
      }, {
        "Value": "Asia-Irkutsk",
        "Name": "Irkutsk"
      }, {
        "Value": "Asia-Kamchatka",
        "Name": "Kamchatka"
      }, {
        "Value": "Asia-Khandyga",
        "Name": "Khandyga"
      }, {
        "Value": "Asia-Krasnoyarsk",
        "Name": "Krasnoyarsk"
      }, {
        "Value": "Asia-Magadan",
        "Name": "Magadan"
      }, {
        "Value": "Asia-Novokuznetsk",
        "Name": "Novokuznetsk"
      }, {
        "Value": "Asia-Novosibirsk",
        "Name": "Novosibirsk"
      }, {
        "Value": "Asia-Omsk",
        "Name": "Omsk"
      }, {
        "Value": "Asia-Sakhalin",
        "Name": "Sakhalin"
      }, {
        "Value": "Asia-Srednekolymsk",
        "Name": "Srednekolymsk"
      }, {
        "Value": "Asia-Ust-Nera",
        "Name": "Ust-Nera"
      }, {
        "Value": "Asia-Vladivostok",
        "Name": "Vladivostok"
      }, {
        "Value": "Asia-Yakutsk",
        "Name": "Yakutsk"
      }, {
        "Value": "Asia-Yekaterinburg",
        "Name": "Yekaterinburg"
      }, {
        "Value": "Europe-Kaliningrad",
        "Name": "Kaliningrad"
      }, {
        "Value": "Europe-Moscow",
        "Name": "Moscow"
      }, {
        "Value": "Europe-Samara",
        "Name": "Samara"
      }, {
        "Value": "Europe-Simferopol",
        "Name": "Simferopol"
      }, {
        "Value": "Europe-Volgograd",
        "Name": "Volgograd"
      }]
    }, {
      "group": "UNITED KINGDOM",
      "locations": [{
        "Value": "Europe-London",
        "Name": "London"
      }]
    }, {
      "group": "UNITED STATES",
      "locations": [{
        "Value": "America-Adak",
        "Name": "Adak"
      }, {
        "Value": "America-Anchorage",
        "Name": "Anchorage"
      }, {
        "Value": "America-Boise",
        "Name": "Boise"
      }, {
        "Value": "America-Chicago",
        "Name": "Chicago"
      }, {
        "Value": "America-Denver",
        "Name": "Denver"
      }, {
        "Value": "America-Detroit",
        "Name": "Detroit"
      }, {
        "Value": "Pacific-Honolulu",
        "Name": "Honolulu"
      }, {
        "Value": "America-Indiana-Indianapolis",
        "Name": "Indiana-Indianapolis"
      }, {
        "Value": "America-Indiana-Knox",
        "Name": "Indiana-Knox"
      }, {
        "Value": "America-Indiana-Marengo",
        "Name": "Indiana-Marengo"
      }, {
        "Value": "America-Indiana-Petersburg",
        "Name": "Indiana-Petersburg"
      }, {
        "Value": "America-Indiana-Tell_City",
        "Name": "Indiana-Tell City"
      }, {
        "Value": "America-Indiana-Vevay",
        "Name": "Indiana-Vevay"
      }, {
        "Value": "America-Indiana-Vincennes",
        "Name": "Indiana-Vincennes"
      }, {
        "Value": "America-Indiana-Winamac",
        "Name": "Indiana-Winamac"
      }, {
        "Value": "America-Juneau",
        "Name": "Juneau"
      }, {
        "Value": "America-Kentucky-Louisville",
        "Name": "Kentucky-Louisville"
      }, {
        "Value": "America-Kentucky-Monticello",
        "Name": "Kentucky-Monticello"
      }, {
        "Value": "America-Los_Angeles",
        "Name": "Los Angeles"
      }, {
        "Value": "America-Menominee",
        "Name": "Menominee"
      }, {
        "Value": "America-Metlakatla",
        "Name": "Metlakatla"
      }, {
        "Value": "America-New_York",
        "Name": "New York"
      }, {
        "Value": "America-Nome",
        "Name": "Nome"
      }, {
        "Value": "America-North_Dakota-Beulah",
        "Name": "North Dakota-Beulah"
      }, {
        "Value": "America-North_Dakota-Center",
        "Name": "North Dakota-Center"
      }, {
        "Value": "America-North_Dakota-New_Salem",
        "Name": "North Dakota-New Salem"
      }, {
        "Value": "America-Phoenix",
        "Name": "Phoenix"
      }, {
        "Value": "America-Sitka",
        "Name": "Sitka"
      }, {
        "Value": "America-Yakutat",
        "Name": "Yakutat"
      }]
    }];
  selectedTimeFrame = "Minutes";
  timeFrames = ["Seconds", "Minutes", "Hours", "Days", "Weeks", "Months", "Quarters", "Years"];
  aggregate;
  externalSettings: MbscDatetimeOptions = {
    showOnTap: true,
    showOnFocus: false,
    touchUi: false,
    max: new Date(),
    steps: {
      minute: 5
    }
  };

  sapid: string;
  deviceName: string;

  custID: string;
  startepoch: any;
  endepoch: any;

  contractedBW: number;

  constructor(private externalProvider: ExternalProvider, private logger: NGXLogger, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(params => {
      const customerID = params['id'];
     // console.log("customerID", customerID);
      this.custID = customerID;
    });

  }
  ngOnInit() {
    this.logger.debug("graph widget ", this.schema);
    this.serviceID = this.schema.datasource[0].selectedProduct.properties.service.properties.serviceId;
   if(this.serviceID =='TBA'){
     this.isReporting=false;
   }
   else{
    this.isReporting=true;
   }
   // console.log("this.serviceID", this.serviceID);

    let pe = _.find(_.get(this.schema, "datasource[0].selectedProduct.properties.resources", []), (ref) => {
      return _.get(ref, 'properties.subtype', '') == 'pe';
    });
    let ce = _.find(_.get(this.schema, "datasource[0].selectedProduct.properties.resources", []), (ref) => {
      return _.get(ref, 'properties.subtype', '') == 'ce';
    })
    this.logger.debug("pe and ce ", pe, ce);
    this.sapid = "sap ";
    if (!pe) {
      this.deviceName = "alu77";
    }
  
    //Test Payload below
    // {
    //   "model": {
    //     "pageName": "portalGraph",
    //     "pagetype": "model",
    //     "properties": {
    //       "deviceName": "alu77",
    //       "isDeleted": false,
    //       "bandwidth": 30,
    //       "objectId": "SAP 2/2/1:500",
    //                    "startTime": "1556860910",
    //                    "endTime": "1556864539"
    //     }
    //   },
    //   "device": {
    //     "height": 1009,
    //     "width": 1920,
    //     "isApp": false,
    //     "manufacturer": "windows",
    //     "model": "chrome",
    //     "platform": "unknown",
    //     "serial": "windows-7",
    //     "version": "73.0.3683.103",
    //     "layout": "xl"
    //   },
    //   "hasDecoder": true
    // }

    if (!pe || !ce) {
      this.sapid = "SAP 2/2/1:500";

    } else {
      this.sapid = this.sapid.concat(pe.properties.pePort).concat(":").concat(ce.properties.vlan);
      this.deviceName = pe.properties.peName;
    }

   // console.log("Epoch time");
    let dt = new Date();
    let st = new Date();
    st.setHours(0,0,0,0); //start of cuurent day

    let enddate: any = dt.getTime() /1000;//  moment(dt,"DD/MM/YYYY HH:mm:ss").valueOf();//.format("DD/MM/YYYY HH:mm:ss"); //dt.getTime(); // moment(dt).subtract(0, 'minutes').format("DD/MM/YYYY HH:mm:ss");
    let startdate: any = st.getTime() /1000;// moment(st,"DD/MM/YYYY HH:mm:ss").valueOf();//.format("DD/MM/YYYY HH:mm:ss"); //st.getTime(); //moment(dt).startOf('day').format("DD/MM/YYYY HH:mm:ss");

    //let enddateepoch: any  = enddate.getTime();

    this.endepoch =  Math.trunc( enddate ); //.getTime();  //1556864539; // enddate; //moment(enddate).unix();
    this.startepoch = Math.trunc( startdate ) ; //.getTime(); //  1556860910;// startdate;  //moment(startdate).unix();


    let cbw = this.schema.datasource[0].model[0].contractedBw;

    let hrminArray = _.words(cbw);
    this.contractedBW = parseInt(hrminArray[0]);
    //console.log("contractedBw", hrminArray[0]);
    this.getBASE64();
    this.getAvailabiltyBASE64();
  } 
  base64URI: string;

  availabilityGraphBase64URI: string;
  isAvailabilityGraphLoading: boolean = true;
  availabilityPercent: string = "0%";

  OnRefresh() {
    //console.log("Epoch time 2");
    let dt = new Date();
    let st = new Date();
    st.setHours(0,0,0,0); //start of cuurent day

    let enddate: any = dt.getTime() /1000;//  moment(dt,"DD/MM/YYYY HH:mm:ss").valueOf();//.format("DD/MM/YYYY HH:mm:ss"); //dt.getTime(); // moment(dt).subtract(0, 'minutes').format("DD/MM/YYYY HH:mm:ss");
    let startdate: any = st.getTime() /1000;// moment(st,"DD/MM/YYYY HH:mm:ss").valueOf();//.format("DD/MM/YYYY HH:mm:ss"); //st.getTime(); //moment(dt).startOf('day').format("DD/MM/YYYY HH:mm:ss");

    //let enddateepoch: any  = enddate.getTime();

    this.endepoch =  Math.trunc( enddate ); //.getTime();  //1556864539; // enddate; //moment(enddate).unix();
    this.startepoch = Math.trunc( startdate ) ; //.getTime(); //  1556860910;// startdate;  //moment(startdate).unix();

    this.getBASE64();
    this.getAvailabiltyBASE64();

  }

  getBASE64() {
    this.logger.debug("Getting base 64", moment.now());
    this.externalProvider.post("data/0", {
      "model": {
        "pageName": "portalGraph",
        "pagetype": "model",
        "properties": {
          "customerId": this.custID,
          "deviceName": this.deviceName,
          "isDeleted": false,
          "bandwidth": this.contractedBW,
          "objectId": this.sapid,
          "startTime": this.startepoch,
          "endTime": this.endepoch
        }
      },
      "device": {
        "height": 939,
        "width": 813,
        "isApp": false,
        "manufacturer": "windows",
        "model": "chrome",
        "platform": "unknown",
        "serial": "windows-7",
        "version": "70.0.3538.110",
        "layout": "md"
      },
      "hasDecoder": true
    }, null).subscribe(data => {
      this.logger.debug("Data:", data);
      this.logger.debug("response for image === ", data);
      this.base64URI = "data:image/png;base64,".concat(data.utilizationGraph);
      this.availabilityPercent = data.utilizationPer;
      // this.availabilityGraphBase64URI = "data:image/png;base64,".concat(data.availabilityGraph);

      this.isLoading = false;
    })
  }

  getAvailabiltyBASE64() {
    this.logger.debug("Getting base 64", moment.now());
    this.externalProvider.post("data/0", {
      "model": {
        "pageName": "portalGraph",
        "pagetype": "model",
        "properties": {
          "customerId": this.custID,
          "deviceName": this.deviceName,
          "isDeleted": false,
          "bandwidth": this.contractedBW,
          "objectId": this.sapid,
          "startTime": this.startepoch,
          "endTime": this.endepoch
        }
      },
      "device": {
        "height": 939,
        "width": 813,
        "isApp": false,
        "manufacturer": "windows",
        "model": "chrome",
        "platform": "unknown",
        "serial": "windows-7",
        "version": "70.0.3538.110",
        "layout": "md"
      },
      "hasDecoder": true
    }, null).subscribe(data => {
      this.logger.debug("response for image === ", data);
      this.availabilityGraphBase64URI = "data:image/png;base64,".concat(data.availabilityGraph);
      this.isAvailabilityGraphLoading = false;
    })
  }

  // getBASE64() {
  //   this.logger.debug("Getting base 64", moment.now());
  //   this.externalProvider.post("data/0", 
  //   {
  //     "model": {
  //       "pageName": "portalGraph",
  //                   "pagetype": "model",
  //                   "properties": 
  //                    { 
  //                      "customerId": "210654",
  //                      "deviceName": "alu77",
  //                      "isDeleted": false,
  //                      "bandwidth": 2,
  //                      "objectId": "SAP 2/2/1:500",
  //                      "startTime": "1556860910",
  //                      "endTime": "1556864539"



  //                    }
  //     },
  //     "device": {
  //       "height": 939,
  //       "width": 813,
  //       "isApp": false,
  //       "manufacturer": "windows",
  //       "model": "chrome",
  //       "platform": "unknown",
  //       "serial": "windows-7",
  //       "version": "70.0.3538.110",
  //       "layout": "md"
  //     },
  //     "hasDecoder": true
  //   }
  //   , null).subscribe(data => {
  //     this.logger.debug("Data:", data);
  //     this.logger.debug("response for image === ", data);
  //     this.base64URI = "data:image/png;base64,".concat(data.utilizationGraph);
  //     this.isLoading = false;
  //   })
  // }

  // getAvailabiltyBASE64() {
  //   this.logger.debug("Getting base 64", moment.now());
  //   this.externalProvider.post("data/0", {
  //     "model": {
  //       "pageName": "portalGraph",
  //       "pagetype": "model",
  //       "properties": {
  //         "customerId": "210654",
  //         "deviceName": this.deviceName,
  //         "isDeleted": false,
  //         "bandwidth": 2,
  //         "objectId": this.sapid
  //       }
  //     },
  //     "device": {
  //       "height": 939,
  //       "width": 813,
  //       "isApp": false,
  //       "manufacturer": "windows",
  //       "model": "chrome",
  //       "platform": "unknown",
  //       "serial": "windows-7",
  //       "version": "70.0.3538.110",
  //       "layout": "md"
  //     },
  //     "hasDecoder": true
  //   }, null).subscribe(data => {
  //     this.logger.debug("response for image === ", data);
  //     this.availabilityGraphBase64URI = "data:image/png;base64,".concat(data);
  //     this.isAvailabilityGraphLoading = false;
  //   })
  // }

}
