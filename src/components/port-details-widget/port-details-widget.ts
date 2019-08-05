import {
  Component, Input, TemplateRef, ViewChild
} from "@angular/core";
import {
  NGXLogger
} from "ngx-logger";
import * as _ from 'lodash';
import { DynamicPipe } from '../../pipes/DynamicPipe';
import { ControlContainer } from "@angular/forms";
import { Widget } from "@mobiscroll/angular/src/js/classes/popup";

import { TableDisplay, TableColumn } from '../tabular-widget/tabular-widget'

const ON_LOAD_EVENT: string = "onPortDetailLoad";

@Component({
  selector: "port-details-widget",
  templateUrl: "port-details-widget.html"
})
export class PortDetailsWidget {
    @Input('schema') schema;
    @Input('model') model;
    private isLoading: boolean;

    serviceId: string;
    
    display: TableDisplay;
    @ViewChild('templateServiceId') templateServiceId: TemplateRef<any>;

    //ctor
    constructor(private logger: NGXLogger, private dynamicPipe: DynamicPipe) {      
    }

    products: any[];

    ngOnInit() {
        this.initialize();
        this.logger.info(this.schema); 
        
        this.serviceId = this.schema.datasource[0].selectedProduct.properties.service.properties.serviceId;

        this.bindTable();

        this.isLoading = false;
    }

    bindTable() {
      let display: TableDisplay = new TableDisplay();

      let serviceIdColumn: TableColumn = new TableColumn("Service ID", "serviceId", "xl-cell-header", "xl-cell-row", this.templateServiceId);
      let portIdColumn: TableColumn = new TableColumn("UNI Port", "portId", "xl-cell-header", "xl-cell-row");
      let bandwidthColumn: TableColumn = new TableColumn("Contracted Bandwidth", "bandwidth", "xl-cell-header", "xl-cell-row");      
      let dynamicFlexEnabledColumn: TableColumn = new TableColumn("Dynamic Flex Enabled", "dynamicFlexEnabled", "xl-cell-header", "xl-cell-row");
      let totalsColumn: TableColumn = new TableColumn("Totals", "bandwidth", "xl-cell-header", "xl-cell-row");      

      let data: any[] = new Array<any>();

      let i:number = 0;

      this.schema.datasource[0].portDetailData.forEach(element => {        
        if (i == 0) {
          data.push(
            { 
              serviceId: element.properties.service.properties.serviceId, 
              bandwidth: this.dynamicPipe.bandwidth(element.properties.service.properties.bandwidth),
              selectedRow: true
            });  
        }
        else {
          data.push(
            { 
              serviceId: element.properties.service.properties.serviceId, 
              bandwidth: this.dynamicPipe.bandwidth(element.properties.service.properties.bandwidth)
            });
        }
        i++;        
      });
      
      display.columns = new Array<TableColumn>();
      display.columns.push(serviceIdColumn);
      display.columns.push(portIdColumn);
      display.columns.push(bandwidthColumn);      
      display.columns.push(dynamicFlexEnabledColumn);
      display.columns.push(totalsColumn);

      display.rows = data;

      this.display = display;
    }

    initialize() {
        this.isLoading = true;
        if(this.schema && this.schema.events) {
            let index = _.findIndex(this.schema.events, (event)=> {return event==ON_LOAD_EVENT});
            this.schema[this.schema.events[index]]();
        }
    }

    ngOnDestroy() {
        delete this.isLoading;
    }
}
