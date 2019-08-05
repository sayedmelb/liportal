import {
  Component,
  Input
} from "@angular/core";
import * as _ from 'lodash';
import { DynamicService } from "../../providers/dynamic-service/dynamic-service";
@Component({
  selector: "readonly-label",
  templateUrl: "readonly-label.html"
}) 

export class ReadOnlyLabel {
  @Input("column") column: any;
  @Input("schema") schema: any;
  //@Input("model") model: any;
  @Input("addresssource") addresssource: any;
  @Input("addresson") addresson: any;
  @Input("index") index: any;
  @Input("service") service: any; 
  @Input("network") network: any; 
  fieldid: string;
  public dataDynamic;
  
  constructor( public permdataService: DynamicService) {
    this.dataDynamic = permdataService.getOption();
  }
  ngOnInit() {
    //console.log("addresssource", this.addresssource);
    this.fieldid = this.service.service;
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

  // getLabel(columnId): string{
  //   let ds =_.find(this.schema.dataSource, (source)=> {
  //       return source.id==this.model[this.schema.id][columnId];
  //   })
  //   return ds ? ds.value: "";
  // }
}
