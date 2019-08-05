import { Component, ViewChild } from "@angular/core";
import { InputControlWidget } from "../control-widget";
import { PopoverController } from "ionic-angular";
import { NguiMapComponent } from "../../../node_modules/@ngui/map";
import { Filters } from "../filter-widget/filter-widget";
import { ActivatedRoute } from "@angular/router";
import { TabService } from '../../providers/tab-service/tab-service';
import { NGXLogger } from "ngx-logger";
import * as _ from 'lodash';

@Component({
  selector: "map-widget",
  templateUrl: "map-widget.html"
})
export class MapWidget extends InputControlWidget {
  @ViewChild("iw") iw;
  @ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent;
  private mappointer: any = {
    filter: {}
  };
  private sidebar: boolean;
  private datasource: any[] = [];
  map: any;
  customerid: any;
  private infoWindowCheck: boolean = false;
  tabdata: any;
  constructor(public popoverCtrl: PopoverController, private route: ActivatedRoute, public tabservice: TabService, private logger: NGXLogger) {
    super();
    this.route.queryParams.subscribe(params => {
      this.customerid = params['id'];      
  });
  this.tabdata = this.tabservice.getOption();
  }

  onMapReady(map) {
    this.map = map;
  }

  ngOnInit() {
    super.ngOnInit(); 
    // let _th = this;
    this.logger.debug("inside map", this.datasource);
    this.mappointer['customerid'] = this.customerid;
    this.MapLoad();
    // this.formProperty.setValue(this.mappointer, false);
    // // this.formProperty.setValue(this.customerid, false);
    // this.schema.onControlsReload = (success, error, controlSettings) => {
    //   controlSettings.forEach(control => {
    //     let schemaControl = this.schema.controls.find(
    //       schemaControl => schemaControl.id === control.id
    //     );
    //     if (schemaControl) {
    //       Object.keys(control).forEach(key => {
    //         schemaControl[key] = control[key];
    //       });
    //     }
    //   });
    // };
    // this.schema.updateBehaviour = (success, error, behaviourSettings) => {
    //   Object.keys(behaviourSettings).forEach(key => {
    //     this.schema.settings.behaviour[key] = behaviourSettings[key];
    //   });
    // };

    setInterval(() => {
      this.reloadData(); 

    }, 20000); 


  }

  reloadData(){
    //console.log("inside map reload");
    

    if (this.schema.onReloadedMap) this.schema.onReloadedMap((result) => {
     // console.log("fd:test: Map Reload", result);

     // this.datasource = result;
      // let model1 = {model: "test"}
      // this.formProperty.setValue(model1,false);
      // if (this.schema.onReloadedMapInitialize) this.schema.onReloadedMapInitialize((result) => {
      //   console.log("fd:test: Map Reload - onReloadedMapInitialize", result);
      // });
     // this.MapLoad();
    //   this.mappointer['customerid'] = this.customerid;
    // this.formProperty.setValue(this.mappointer, false);
    // // this.formProperty.setValue(this.customerid, false);
    // this.schema.onControlsReload = (success, error, controlSettings) => {
    //   controlSettings.forEach(control => {
    //     let schemaControl = this.schema.controls.find(
    //       schemaControl => schemaControl.id === control.id
    //     );
    //     if (schemaControl) {
    //       Object.keys(control).forEach(key => {
    //         schemaControl[key] = control[key];
    //       });
    //     }
    //   });
    // };
    // this.schema.updateBehaviour = (success, error, behaviourSettings) => {
    //   Object.keys(behaviourSettings).forEach(key => {
    //     this.schema.settings.behaviour[key] = behaviourSettings[key];
    //   });
    // };

     });
     
    //  if (this.schema.onReloadedMapInitialize) this.schema.onReloadedMapInitialize((result) => {
    //   console.log("fd:test: Map Reload - onReloadedMapInitialize", result);
    // });

  }

  MapLoad(){
    this.mappointer['customerid'] = this.customerid;
    this.formProperty.setValue(this.mappointer, false);
    // this.formProperty.setValue(this.customerid, false);
    this.schema.onControlsReload = (success, error, controlSettings) => {
      controlSettings.forEach(control => {
        let schemaControl = this.schema.controls.find(
          schemaControl => schemaControl.id === control.id
        );
        if (schemaControl) {
          Object.keys(control).forEach(key => {
            schemaControl[key] = control[key];
          });
        }
      });
    };
    this.schema.updateBehaviour = (success, error, behaviourSettings) => {
      Object.keys(behaviourSettings).forEach(key => {
        this.schema.settings.behaviour[key] = behaviourSettings[key];
      });
    };

   
  }

  private onCustomMarkerInit(customMarker, markerPoint) {
    markerPoint.customMarker = customMarker;
  }

  private onHover(data) {
    this.mappointer.location = data.address;
    if (this.schema.onHover) this.schema.onHover();
    this.nguiMapComponent.openInfoWindow("iw", data.customMarker);
    this.tabservice.setOption("infowindowState", true);
  }

  private onMapClick(event){
    if(this.infoWindowCheck==false)
    this.nguiMapComponent.closeInfoWindow("iw");
    this.tabservice.setOption("infowindowState", false);
  }

  private onHoverOut() {
    // this.nguiMapComponent.closeInfoWindow("iw");
  }

  private onClick() {
    this.infoWindowCheck = true;

    if (this.schema.onClick) this.schema.onClick();
    this.logger.debug("on click ", this.map, this.mappointer.location);
    let position =new google.maps.LatLng(_.toNumber(this.mappointer.location.lat), _.toNumber(this.mappointer.location.long))
    this.map.setZoom(16);
    this.map.setCenter(position)
  }

  getCloseStats(event){
    if(event.close==true){
      this.infoWindowCheck =false;
      this.nguiMapComponent.closeInfoWindow("iw");
    }
    
  }

  private onControlClick(control, event) {
    this.datasource = this.schema.datasource;
    if (control.event && this.schema[control.event.type]) {
      this.schema[control.event.type](filters => {
        this.popoverCtrl
          .create(Filters, {
            callback: (filter: any) => {
              Object.keys(filter).forEach(key => {
                let a = []
                Object.keys(filter[key].values).forEach(key1 => {
                  if (filter[key].values[key1]) a.push(key1)
                })
                this.mappointer.filter[key]= a;
              });
            },
            filters: filters
          })
          .present({
            ev: event
          });
      });
      this.datasource = this.schema.datasource;
    }
  }

  private getAllValues(object: object) {
    let values = []
    for (let key of Object.keys(object)) {
      if (typeof object[key] !== 'object') values.push(object[key]);
      else values = [...values, ...this.getAllValues(object[key])]
    }
    return values;
  }

  private updateFilter(event) {
    if (this.datasource.length < 1) this.datasource = this.schema.datasource;
    let temp;
    temp = [...this.datasource];
    temp = temp.map(({ customMarker, ...item }) => item);
    const val = event ? event.target.value.toLowerCase() : "";
    let _th = this;
    this.schema.datasource = temp.filter(function(d) {
      return (
        JSON.stringify(_th.getAllValues(d))
          .toLowerCase()
          .indexOf(val) !== -1 || !val
      );
    });
  }
}