import {
    Component,
    Input
  } from "@angular/core";
  import { NGXLogger } from "ngx-logger";
  import * as _ from 'lodash';
import { DynamicService } from "../../providers/dynamic-service/dynamic-service";
  
  @Component({
    selector: "review-proactive-monitoring",
    templateUrl: "review-proactive-monitoring.html"
  }) 
  
  export class ReviewProactiveMonitoring {
    @Input("schema") schema: any;
    @Input("model") data: any;
    @Input("network") network: any;
    public dataDynamic;

    constructor(private logger: NGXLogger,public permdataService: DynamicService) {
      this.dataDynamic = permdataService.getOption();
    }
    ngOnInit() {
       
     
    }

    checkAddressState(cname: string) {
      let tempdata = this.permdataService.getOption();
      let addressobj = this.dataDynamic.addressObj;
      let state = false;
      _.forEach(addressobj, comp => {
  
        if (comp.component.name == cname) {
          if (comp.component.state == true) {
            state = true;
  
          }
        }
      });
      return state;
    }

    
  }
  