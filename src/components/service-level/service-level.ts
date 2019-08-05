import {
  Component,
  Input,
  Output,
  EventEmitter,
  ɵConsole
} from "@angular/core";
import {
  DynamicService
} from '../../providers/dynamic-service/dynamic-service';
import { ModalController, ModalOptions } from "ionic-angular";
import { ServiceLevelWidget } from "../service-level-widget/service-level-widget";

@Component({
  selector: "service-level",
  templateUrl: "service-level.html"
})

//TODO: Change name as this is generic.
export class ServiceLevel {
  @Input("schema") schema: any;
  @Input("model") model: any;
  @Input("property") property: any;
  @Input("addressEnds") addressEnds: any;
  @Output() valueChange = new EventEmitter();
  @Input("addressSource") addressSource: any;
  @Input("networkType") networkType: any;
  
  data: any;
  portCapInfoText = 'Port capacity is the physical port speed provided to you as part of the service. Port capacity does not guarantee speed throughput or availability. Port upgrade may require onsite work.';
  flexCapInfoText = 'Flex capacity is the maximum speed capacity available on this service for temporary speed increases. The actual Flex capacity speeds are shown on the contracted speed slider above and labelled as “Flex Max”. Optus does not guarantee that the flex speed is always available, additional usage charges will be applied if this is used.';
  gosInfoText = 'SD Ethernet point to point service offers three Classes of Service (CoS). Each service has to belong to one and only one of these three grades. Full CoS description is available in the Service Description.';
  serviceLevelInfoText = 'Service Level fault restoration targets as specified in your service description.';
  tooltipText: string;

  ngOnInit() {
    console.log("address ENDS",this.addressEnds, this.schema, this.model, this.property, this.addressSource, this.networkType );
    this.setTooltipText();
  }
  constructor(public dataService: DynamicService, private modalCtrl: ModalController) {
  }

  slaModalOptions: ModalOptions = {
    enableBackdropDismiss: false,
    showBackdrop: true,
    cssClass: 'dscp-widget'
  };
  
  setTooltipText() {
    if(this.property == 'flex_capacity') {
        this.tooltipText = this.flexCapInfoText;
    } else if(this.property == 'portCapacity') {
      this.tooltipText = this.portCapInfoText;
    }else if(this.property == 'gradeOfService') {
      this.tooltipText = this.gosInfoText;
    }else if(this.property == 'serviceLevel') {
      this.tooltipText = this.serviceLevelInfoText;
    }
  }
  selectedOption(option) {
    if(option.column==="flex_capacity") {
      this.model[0].flex_capacity = option.model.flex_capacity;
      if(this.model[1])
        this.model[1].flex_capacity = option.model.flex_capacity;
      // this.model[0] = option.model;
      // this.model[1] = option.model; 
    } else if (option.column==="gradeOfService") {
      this.model[0].gradeOfService = option.model.gradeOfService;
      if(this.model[1])
        this.model[1].gradeOfService = option.model.gradeOfService;
    } else {
      this.model[option.index] = option.model;
    }
    
    this.valueChange.emit({model: this.model, column: option.column }); 
  }

  openServiceLevelDetails() {
    this.modalCtrl
      .create(ServiceLevelWidget, {
        callback: (filter: any) => {
        }
      }, this.slaModalOptions)
      .present({
        ev: event
      });
  }
}
