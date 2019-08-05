import { Component, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";
import {
  DynamicService
} from '../../providers/dynamic-service/dynamic-service';
import { NGXLogger } from "ngx-logger";
import * as _ from 'lodash';

const MESH_KEYWORD = "Mesh";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";

@Component({
  selector: "radio-list",
  templateUrl: "radio-list.html"
})

export class RadioList {
  @Input("schema") schema: any;
  @Input("list") list: any;

  @Output() portChange = new EventEmitter();
  @Output() recurrenceChange = new EventEmitter();

  updatedPort: { port: string, capacity: string };
  public dynamicdata: any;
  _radiolist: any = {};
  networkType = "P2P";

  ngOnChanges(changes: SimpleChanges) {
    this.logger.debug("changes in Radio list -> ", changes);

  }

  constructor(
    public permdataService: DynamicService,
    private logger: NGXLogger
  ) {

    this._radiolist = {

      model: {
        recurrence: {
          once: "Once",
          daily: "Daily",
          weekly: "Weekly",
          monthly: "Monthly"
        }

      }
    };
    this.dynamicdata = permdataService.getOption();
  }

  ngOnInit() {
    // this.setDefaultRadioValues();
    console.log("RADIO schema", this.schema);
    console.log("RADIO list", this.list);

  }

  ngDoCheck() { //This is a interim solution for now
    if (this.schema.datasource && _.has(this.schema.datasource[0], TOPOLOGY_PATH)) {

      // this.recurrenceChange.emit({recurrencecontrolId: 'once', value: 'Once'});  

      if (this.schema.datasource[0].selectedProduct.properties.topology == MESH_KEYWORD) {
        this.networkType = "Mesh";
      } else {
        this.networkType = "P2P";
      }

    }
  }




  setradioStatus(evn: any, type: any, end: any, value: any) {
    //console.log("RADIO", evn, type, end, value, this.networkType);
    //this._radiolist.model[type][end] = value;
    this.recurrenceChange.emit({ recurrencecontrolId: 'recurrence_type', value: value });


  }



}