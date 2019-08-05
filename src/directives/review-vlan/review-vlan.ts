import {
  Component,
  Input
} from "@angular/core";
import { NGXLogger } from "ngx-logger";
import { DynamicService } from '../../providers/dynamic-service/dynamic-service';
import * as _ from 'lodash';

@Component({
  selector: "review-vlan",
  templateUrl: "review-vlan.html"
})

export class ReviewVlan {
  @Input("schema") schema: any;
  @Input("model") data: any;
  @Input("network") network: any;
  public dataDynamic;

  constructor(private logger: NGXLogger, public permdataService: DynamicService) {
    this.dataDynamic = permdataService.getOption();
  }
  ngOnInit() {

    console.log("REVIEW VLAN ==>", this.schema, this.data);
  }

  checkAddressState() {
    let tempdata = this.permdataService.getOption();
    let addressobj = this.dataDynamic.addressObj;
    let state = false;
    _.forEach(addressobj, comp => {

      if (comp.component.name == 'vlan') {
        if (comp.component.state == true) {
          state = true;

        }
      }
    });
    return state;
  }


}
