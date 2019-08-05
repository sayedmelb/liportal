import { Component, Input, SimpleChanges } from "@angular/core";
import { DynamicService } from '../../providers/dynamic-service/dynamic-service';
import { ExternalProvider } from "../../providers/external/external";
import { AppConstants } from '../../providers/avp.enum';
//import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { HttpClient } from "@angular/common/http";
import { NGXLogger } from "ngx-logger";

const MESH_KEYWORD = "Mesh";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";

@Component({
  selector: "toggle-combo",
  templateUrl: "toggle-combo.html"
})

export class ToggleCombo {
  @Input("schema") schema: any; 
  @Input("model") model: any;

  isToggleAend: string = 'on';
  isToggleBend: string = 'on';

  toggle01: boolean = false;
  toggle02: boolean = false;


  public dynamicdata: any;
  networkType: string = "P2P";




  constructor(public permdataService: DynamicService, private externalProvider: ExternalProvider, private http: HttpClient, private logger: NGXLogger) {

    this.dynamicdata = permdataService.getOption();
    
  }

  ngOnInit() {
    this.logger.debug("SCHEMA vlan", this.schema);
    this.checkdefaultvalues();
    

  }


  toggleOne() {
    this.toggle01 = !this.toggle01;
   
    if (this.toggle01 === true) {
      this.model[0].proactiveMonitoring = 'on';
  
    }

    else {
      this.model[0].proactiveMonitoring = 'off';
    }

  }

  toggleTwo() {
    this.toggle02 = !this.toggle02;
    if (this.toggle02 === true) {
      this.model[1].proactiveMonitoring = 'on';
    }

    else {
      this.model[1].proactiveMonitoring = 'off';
    }

  }



  ngOnChanges(changes: SimpleChanges) {

    if (this.schema.datasource && _.has(this.schema.datasource[0], TOPOLOGY_PATH)) {
      if (this.schema.datasource[0].selectedProduct.properties.topology == MESH_KEYWORD) { 
        this.networkType = "Mesh";
      } else {
        this.networkType = "P2P";
      }

    }

  }

  checkdefaultvalues() {

    if (this.model[0].proactiveMonitoring) {

      if (this.model[0].proactiveMonitoring == 'on') {
        this.toggle01 = true;
      }
      else {
        this.toggle01 = false;
      }




    }


    if(this.networkType!=="Mesh"){ 

      if (this.model[1].proactiveMonitoring) {
        // this.model[1].proactiveMonitoring = 'off';
  
  
        if (this.model[1].proactiveMonitoring == 'on') {
          this.toggle02 = true;
        }
        else {
          this.toggle02 = false;
        }
  
      }
    }
   


  }


  // removeDynamicClass(type: string) {

  //   const togglea = document.getElementsByClassName("toggleA") as HTMLCollectionOf<
  //     HTMLElement
  //   >;
  //   const toggleb = document.getElementsByClassName(
  //     "toggleB"
  //   ) as HTMLCollectionOf<HTMLElement>;


  //   if (type == 'A')
  //     togglea[0].classList.remove("toggle-checked");
  //   else
  //     toggleb[0].classList.remove("toggle-checked");


  // }

  // addDynamicClass(type: string) {
  //   const toga = document.getElementsByClassName("togA") as HTMLCollectionOf<
  //     HTMLElement
  //   >;
  //   const togb = document.getElementsByClassName(
  //     "togB"
  //   ) as HTMLCollectionOf<HTMLElement>;

  //   if (type == 'A')
  //     toga[0].classList.add("toggle-checked");
  //   else
  //     togb[0].classList.add("toggle-checked");

  // }




  setaddresson() {
    let tempdata: any = this.permdataService.getOption();
    if (tempdata.addressON === "none" && tempdata.addressON !== "portCapacity" && tempdata.addressON !== "speed" && tempdata.addressON !== "flexCapacity" && tempdata.addressON !== "vlan") {
      this.permdataService.setOption('addressON', "proactiveMonitoring");
    }




  }




}
