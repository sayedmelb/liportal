import {
  Component,
  Input,
  Output,
  EventEmitter

} from "@angular/core";
import {
  DynamicService
} from '../../providers/dynamic-service/dynamic-service';

import {
  TabService
} from '../../providers/tab-service/tab-service';

import {
  InputControlWidget
} from "../control-widget";
import {
  NGXLogger
} from "ngx-logger";
import {trigger, transition, style, animate, state} from '@angular/animations';

@Component({
  selector: "service-detail",
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: "service-detail.html"
})

//TODO: Change name as this is generic.
export class ServiceDetail extends InputControlWidget {
  //  @Input("schema") schema: any;
  //  @Input("model") model: any; 
  showdata: boolean = false;
  public dynamicdata: any;
  showUtilization: boolean = false;
  showScheduleFlex: boolean = false;
  showDynamicFlex: boolean = false;
  data: any;
  tabdata: any;

  tabs: any = [];
  serviceDetails = {
    model: [{
      contractedBw: "100 Mbps",
      flex_pack: "2x",
      port: "1 Gpbs",
      vlan: "298",
      serviceLevel: "2x",
      proactiveMonitoring: "On",
      gradeOfService: "Basic",
      monthlyRecurring: "$0",
      serviceId: "SDE00001318",
      networkTopology: "P2P"
    }],
    schema: {
      contractedBw: {
        label: "Contracted Speed", 
        action_type: 2,
        flex: 40,
        options: ["Test1", "Test2"]
      },
      flex_pack: {
        label: "Flex Pack",
        flex: 20,
        action_type: 1
      },
      port: {
        label: "Port",
        flex: 20,
        action_type: 1
      },
      vlan: {
        label: "VLAN",
        flex: 20,
        action_type: 1
      },
      serviceLevel: {
        label: "Service Levels",
        flex: 20,
        action_type: 1
      },
      proactiveMonitoring: {
        label: "Proactive Monitoring",
        flex: 20,
        action_type: 1
      },
      gradeOfService: {
        label: "Grade Of Service",
        flex: 20,
        action_type: 1
      },
      monthlyRecurring: {
        label: "Monthly Recurring",
        flex: 20,
        action_type: 2,
        options: ["Install charge"]
      },
      serviceId: {
        label: "Service Id",
        flex: 20,
        action_type: 0
      },
      networkTopology: {
        label: "Network Topology",
        flex: 20,
        action_type: 0
      }
    }
  } 


  // tabs:
  subSelected: string = 'pop';
  ngOnInit() {
    //super.ngOnInit();
    this.tabs = this.schema.tabs;
    this.subSelected = this.tabs[0].id;
    this.logger.debug("schema in service DETAIL COMP:", this.schema);
    //this.logger.debug("model service DETAIL", this.model);
    if (this.schema.events && this.schema.events[0] && this.schema.events[0] == 'onInit') {
      this.schema[this.schema.events[0]]();
      this.logger.debug("SerC schema", this.schema);

  
    }

  }
  constructor(public dataService: DynamicService, public tabservice: TabService, private logger: NGXLogger) {
    super();
    this.tabdata = this.tabservice.getOption();
    this.dynamicdata = this.dataService.getOption();
  }

  checkChange(event) {
    if(event.linetype =='evolve') {
      if(this.tabs.length>2)
      this.tabs.splice(1,1); 
      

    }
  }

  onServiceClick(e) {    
    console.log("ServiceDetail: ", e);
    this.dataService.setOption('otherDetailserviceid', e.serviceId);

    // this.tabs = this.schema.tabs;
    // this.subSelected = this.tabs[0].id;
    // this.logger.debug("schema in service DETAIL onServiceClick:", this.schema);
    // //this.logger.debug("model service DETAIL", this.model);
    // if (this.schema.events && this.schema.events[0] && this.schema.events[0] == 'onInit') {
    //   this.schema[this.schema.events[0]]();
    //   this.logger.debug("SerC schema", this.schema);

  
    // }
  }


  showservicedata() {
    if (this.tabdata.hasOwnProperty("showServiceList")) {
      if (this.tabdata.showServiceList == false) {
        //this.serviceid = this.tabdata.serviceID;
        return true;
      } else {
        return false;
      }

    } else
      return false;

  }

  toggleUtilization() {
    this.showUtilization = !this.showUtilization;
  }
  toggleScheduleFlex() {
    this.showScheduleFlex = !this.showScheduleFlex;
  }
  toggleDynamicFlex() {
    this.showDynamicFlex = !this.showDynamicFlex;
  }
  goBack() {
    this.tabservice.setOption("showServiceList", true);
    window.history.back();
  }
}
