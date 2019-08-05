import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Controls } from "../../components/control-widget/control-widget";
import { PopoverController } from "ionic-angular";
import { TabService } from "../../providers/tab-service/tab-service";
import { InputControlWidget } from "../../components/control-widget";

@Component({
  selector: "sidebar",
  templateUrl: "sidebar.html"
})
export class Sidebar {
  @Input("schema") schema: any;
  @Input("model") model: any;
  @Output() sidebarClose = new EventEmitter();
  serviceDeataildata: any;
  sidebarStatus: { close: boolean };
  private controls = [];
  tabdata: any;

  @Output() product = new EventEmitter();

  constructor(public popoverCtrl: PopoverController, public tabservice: TabService) { 
    //super();
  }

  ngOnInit() {
    let _th = this;
    this.schema.onControlsFilter = (success, error, controlSettings) => {
      _th.controls = _th.schema.child.controls.filter(schemaControl =>
        controlSettings.includes(schemaControl.id)
      );
    };

    //pegman fix (commented call)
    //if (this.schema.onChildLoad) this.schema.onChildLoad();

    this.serviceDeataildata = {
      products: this.schema.datasource,
      selectedproduct: {}

    };

    //console.log("SIDEBAR serviceDeataildata", this.serviceDeataildata);
    //console.log("model and schema SIDEBAR", this.model, this.schema );


  }

  private getValue(key: string, model) {

    if (!key) return;
    let path = key.split(".");
    let value = model;
    for (let element of path) {
      if (value.hasOwnProperty(element)) value = value[element];
      else return;
    }
    if(key =='properties.Flexing' && value=='') 
     return "no events scheduled";
    

    return value;
  }

  private getDataFromTemplate(row: any, model) {
    let template;
    if (this.schema.child && this.schema.child[row.event]) {
      this.schema.child[row.event](
        value => {
          template = value;
        },
        null,
        model
      );
    } else if (this.schema.child && this.schema.child[row.html]) {
      template = row.html;
    }
    return template;
  }

  private showMenu(event, service) {
    this.model.selected = service;
    if (this.schema.getControls) this.schema.getControls();
    
    
    var testControls = this.controls;

    this.popoverCtrl
      .create(Controls, {
        callback: (control: any) => {

          if(control.event.type =='getserviceDeatilforServiceFromMap') 
          this.getDetail(service);
          else {
            if (this.schema[control.event.type]  && service.properties.service.properties.serviceId !='TBA') {
              this.schema[control.event.type]();
            } else {
              alert('Service does not have a valid service ID');
              return false;
            }
          }
        
        },
        controls: this.controls
      })
      .present({
        ev: event
      });
  }



  getDetail(service) {

    this.serviceDeataildata.selectedproduct = service;



   // this.logger.debug("this.serviceDeatildata:", this.serviceDeataildata);

    //this.formProperty.setValue(this.serviceDeataildata, false);

    if (this.schema.getserviceDeatilforServiceFromMap) this.schema.getserviceDeatilforServiceFromMap();


    this.tabservice.setOption('showServiceList', false);
    this.tabservice.setOption('serviceID', service.properties.service.properties.serviceId);

    this.product = service;



  }


  private onClose() {
    this.sidebarStatus = { close: true };
    this.sidebarClose.emit(this.sidebarStatus);
    if (this.schema.onClose) this.schema.onClose();
   // console.log("this.schema MAP", this.schema);
    this.schema.settings.zoom = 4.2;
   // console.log("this.schema MAP after change", this.schema);
  }
}
