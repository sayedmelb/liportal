import { Component, ViewChild, ViewEncapsulation, Output, EventEmitter, ɵConsole, Input, OnChanges, SimpleChanges } from "@angular/core";
import { InputControlWidget } from "../control-widget";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { PopoverController } from "ionic-angular";
import { Controls } from "../control-widget/control-widget";
import { TabService } from "../../providers/tab-service/tab-service";
import { NGXLogger } from "ngx-logger";
import { DynamicService } from '../../providers/dynamic-service/dynamic-service';
import { RefreshService } from '../../providers/refresh-service/refresh-service';
import * as _ from 'lodash';

@Component({
  selector: "table-widget",
  templateUrl: "table-widget.html"
  , encapsulation: ViewEncapsulation.None
})
export class TableWidget extends InputControlWidget {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  private temp = [];
  private rows = [];
  private selected;
  private columns: any[];
  private controls = [];
  tabdata: any;
  serviceDeataildata: any;
  public dynamicdata: any;
  public refdata: any;
  // showList: boolean = true;
  @Output() product = new EventEmitter();

  @Input() data: any[];
  @Input() frontEndSchema: any[];

  constructor(public refservice: RefreshService,public popoverCtrl: PopoverController, public tabservice: TabService, private logger: NGXLogger, public permdataService: DynamicService) {
    super();
    this.dynamicdata = permdataService.getOption();
  }

  ngOnInit() {
    super.ngOnInit();
    this.logger.debug("TABLE WIDGET schema", this.schema);

    this.tabdata = this.tabservice.getOption();
    this.refdata = this.refservice.getOption();
    let _th = this;

    if (this.frontEndSchema) {
      this.schema = this.frontEndSchema;
    }
    else {
      this.schema.onControlsFilter = (success, error, controlSettings) => {
        _th.controls = _th.schema.controls.filter(schemaControl =>
          controlSettings.includes(schemaControl.id)
        );
      };
    }
    if (!this.schema.datasource) this.schema.datasource = [];

    if (this.schema.settings && this.schema.settings.columns) {
      this.columns = this.schema.settings.columns;
      this.logger.info("columns schema: ", this.columns);
    }

    if (!this.data && !this.frontEndSchema) {
      this.schema.onLoad = (success, error, rows) => {
        this.schema.datasource = rows;
        this.permdataService.setOption('productSeriveList', rows);
        this.permdataService.setOption('otherDetailserviceid', 'TBA');
        this.logger.debug("permdataService TABLE WID", this.permdataService); 
        this.serviceDeataildata = {
          products: this.schema.datasource,
          selectedproduct: {}

        };
        this.selected = null;
        this.rows = rows;
        this.temp = [...this.rows];
      };
    }
    else {
      this.schema.datasource = this.data;
      this.serviceDeataildata = {
        products: this.schema.datasource,
        selectedproduct: {}

      };
      this.selected = null;
      this.rows = this.data;
      this.temp = [...this.rows];
      //this.temp = this.rows;
    }

    //this.autoRefresh();

    setInterval(() => {
      this.reloadData(); 

    }, 22000);

   
  }

  autoRefresh(){
    setInterval(() => {
      //console.log("FD:TABLE REFRESH");

      if (this.schema.getReloadedServiceList) this.schema.getReloadedServiceList((result) => {
       // console.log("FD:TABLE REFRESH INSIDE", result);
      });
      // this.schema.getReloadedServiceList = (success, error, rows) => {
      //   this.schema.datasource = rows;
      //   console.log("FD:TABLE REFRESH INSIDE");
      //   this.selected = null;
      //   this.rows = rows;
      //   this.temp = [...this.rows];
      // };

    }, Math.random() * 9500);
  }

  private updateFilter(event) {
    this.temp = [...this.schema.datasource];
    const val = event ? event.target.value.toLowerCase() : "";
    let _th = this;
    const temp = this.temp.filter(function (d) {
      return JSON.stringify(_th.getAllValues(d)).toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  private getAllValues(object: object) {
    let values = []
    for (let key of Object.keys(object)) {
      if (typeof object[key] !== 'object') values.push(object[key]);
      else values = [...values, ...this.getAllValues(object[key])]
    }
    return values;
  }

  onSelect({ selected }) {
    this.selected = selected[0];
    this.formProperty.setValue(this.selected, false);
  }

  private getValue(column, row) {
    if (!row) return;
    let path = column.prop.split(".");
    let value = row;
    for (let key of path) {
      if (value.hasOwnProperty(key)) value = value[key];
      else return;
    }
    if (value instanceof Array) return value.join(",");
    else {
      if (typeof value === "string") return value.replace(/<[^>]+>/gm, "");
      else return value;
    }
  }

  private getTemplate1(col, row) {
    let template;

    this.formProperty.setValue(row, false);
    if (this.schema[col.event])
      this.schema[col.event](data => {
        template = data;
      });
    return template || "";
  }



  private showMenu(event, service) {
    this.formProperty.setValue(service, false);
    this.logger.debug("For service::  ", service);
    if (this.schema.getControls) this.schema.getControls();

    var testControls = this.controls;

    let popover =  this.popoverCtrl
      .create(Controls, { 
        callback: (control: any) => {
          if(control.event.type =='getserviceDeatilforService') 
          this.getDetail(null, service);
          else
          {
           if (this.schema[control.event.type] && service.properties.service.properties.serviceId !='TBA')
           //if (this.schema[control.event.type])
            this.schema[control.event.type]();
            else {
              alert('Service does not have a valid service ID');
              return false;
            }
            
          }
         
        },
        controls: this.controls
      });
      
      popover.dismiss((data) => {
       // console.log("DATA from PB", data);
      });

      popover.present({ 
        ev: event
      });
  }
  //onDidDismiss

  reloadData(){
    //console.log("inside reload TABLE WIDGET 31 MAY");
    

    if (this.schema.onReloadedServiceList) this.schema.onReloadedServiceList((result) => {
      //console.log("fd:test: TABLE w", result);
      let rows = result.product;
     
      this.schema.datasource = rows;
      this.permdataService.setOption('productSeriveList', rows);
      this.permdataService.setOption('otherDetailserviceid', 'TBA');
      //this.logger.debug("permdataService TABLE WID", this.permdataService); 
      this.serviceDeataildata = {
        products: this.schema.datasource,
        selectedproduct: {}

      };
      this.selected = null;
      this.rows = rows;
      this.temp = [...this.rows];


    });


  }
  getDetail(col, service) {


    this.serviceDeataildata.selectedproduct = service;



    this.logger.debug("this.serviceDeatildata:", this.serviceDeataildata);
    // let template;

    this.formProperty.setValue(this.serviceDeataildata, false);

    if (this.schema.getserviceDeatilforService) this.schema.getserviceDeatilforService();


    this.tabservice.setOption('showServiceList', false);
    this.tabservice.setOption('serviceID', service.properties.service.properties.serviceId);


    // this.logger.debug(" servivce ID", service.id);
    // this.logger.debug(" this.tabservice",  this.tabservice);
    this.product = service;



  }

  

  ngDoCheck() {

    if (this.permdataService && this.dynamicdata.otherDetailserviceid !== 'TBA' && typeof this.dynamicdata.otherDetailserviceid !== 'undefined') {
      let serviceid;
      let selectedproduct;
      serviceid = this.dynamicdata.otherDetailserviceid;
      //first check the product for the selected serviceid
      _.forEach(this.dynamicdata.productSeriveList, prod => {
        if (prod.properties.service.properties.serviceId == serviceid)
          selectedproduct = prod;
        // console.log("prod", prod);
      });

      this.permdataService.setOption('otherDetailserviceid', 'TBA');

      this.getDetail(null, selectedproduct);
    }

    if(this.refservice && this.refdata.hasOwnProperty("PBChangeRefresh")) {
      if(this.refdata.PBChangeRefresh=="yes"){
        this.reloadData();
        this.refservice.setOption("PBChangeRefresh", "no");
      }
     
     
        

      
      //once reloaded delete reference
     
    }
   
  }

  showGridList() {
    if (this.tabdata.hasOwnProperty("showServiceList")) {
      if (this.tabdata.showServiceList == false)
        return false;
      else
        return true;


    } else
      return true;

  }

}
