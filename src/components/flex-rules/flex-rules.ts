import { Component, Input, Output, EventEmitter, } from "@angular/core";
import * as _ from 'lodash';
import { NGXLogger } from "ngx-logger";
import moment from 'moment';
import { NumberFormatStyle } from "@angular/common";

const MESH_KEYWORD = "Mesh";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";

@Component({
  selector: "flex-rules",
  templateUrl: "flex-rules.html"
})

export class FlexRules {
  @Input("schema") schema: any;
  @Input("model") model: any;
  //@Input("model") model: any;
  //@Output() network = new EventEmitter();

  



  show: boolean = true;
  viewgraph: boolean = false;
 
  //from on demand
  flexUp: string = "balanced"; //default
  flexupUtilisation: number;
  flexupUtilisationMinutes: number;
  flexDown: string;
  flexupUtilisationDown: number;
  flexupUtilisationMinutesDown: number;
  initialRange: { lower: number; upper: number; flexmax: number };
  leftknob: number = 100;
  changeFlexValue: string;

  // this.initialRange = {
  //   lower: this.minValue,
  //   upper: this.maxValue,
  //   flexmax: this.dynamicBandwidthmodel.flexmax
  // };
  
  //end from on demand

  constructor(private logger: NGXLogger) {

    //this.dynamicdata = permdataService.getOption();
  }

  ngOnInit() {

console.log("flex rules", this.schema , this.model);

this.schema.datasource[0].increased_utilisation_mode = "relaxed";
//this.initialRange.lower =100;
//this.initialRange.flexmax = 200;
//below will come from datamodel latter and slider
this.initialRange = {
    lower: 100,
    upper: 200,
    flexmax: 200
  };
  this.flexupUtilisation = 80;
  this.flexupUtilisationMinutes = 3;

  this.mapToModel();

  this.addToModel();

  }

  mapToModel(){

    //1. Flexup
    if(this.model[0].service.length>0)
    {
      if(this.model[0].service[0].properties.increased_utilisation_mode)
      this.flexUp =this.model[0].service[0].properties.increased_utilisation_mode;
      this.flexUp = this.flexUp.toLowerCase();
      if(this.flexUp.toLowerCase() == "quickly" )
      this.flexUp = "aggresive";

      //this.schema.datasource[0].increased_utilisation_mode = "relaxed";

      _.forEach(this.schema.controlsup, control => {

        if(control.flextype==this.flexUp)
          control.active = true;
          else
          control.active = false;
      });
      if(this.model[0].service[0].properties.utilisation_increase_threshold_pc)
      this.flexupUtilisation = this.model[0].service[0].properties.utilisation_increase_threshold_pc;
      
      if(this.model[0].service[0].properties.increased_utilisation_monitor_time_period)
      this.flexupUtilisationMinutes = this.model[0].service[0].properties.increased_utilisation_monitor_time_period /60;

      
      

      
    }
 
    


  }

  // ngDoCheck() {
   

  // }

  toggleViewGraph(){
    this.viewgraph = !this.viewgraph;
  }


//from on-demand configure page ts

setFlex(event: any, state: any, type: any) {
  let evn = event;
  let styleclass: string;
  if (type == "up") {
    styleclass = "btnActivated";
  } else {
    styleclass = "btnActivatedDown";
  }
  const btnNor = document.getElementsByClassName(
    styleclass
  ) as HTMLCollectionOf<HTMLElement>;
  btnNor[0].classList.remove(styleclass);
  evn.currentTarget.classList.add(styleclass);
  if (state == "aggresive") {
    this.flexupUtilisation = 70;
    this.flexupUtilisationMinutes = 5;
  } else if (state == "balanced") {
    this.flexupUtilisation = 80;
    this.flexupUtilisationMinutes = 5;
  } else if (state == "relaxed") {
    this.flexupUtilisation = 90;
    this.flexupUtilisationMinutes = 10;
  } else if (state == "custom") {
  } else if (state == "aggresivedown") {
    this.flexupUtilisationDown = 70;
    this.flexupUtilisationMinutesDown = 5;
  } else if (state == "balanceddown") {
    this.flexupUtilisationDown = 80;
    this.flexupUtilisationMinutesDown = 5;
  } else if (state == "relaxeddown") {
    this.flexupUtilisationDown = 90;
    this.flexupUtilisationMinutesDown = 10;
  } else if (state == "customdown") {
  }
  this.setflexChart(state, type);
  this.addToModel();
}

addToModel(){
if(this.model) {
  delete this.model[0]["utilisation_increase_threshold_pc"];
  this.model[0]["utilisation_increase_threshold_pc"] = this.flexupUtilisation;
  delete this.model[0]["increased_utilisation_mode"];
  this.model[0]["increased_utilisation_mode"] = this.flexUp;

  
  delete this.model[0]["increased_utilisation_monitor_time_period"];
  this.model[0]["increased_utilisation_monitor_time_period"] = this.flexupUtilisationMinutes;


}
console.log("this.schema", this.schema);

}

setflexChart(state, type) {
  if (type == "up") this.flexUp = state;
  else this.flexDown = state;
}

keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;
  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

updateFlexUtil(val, type: any) {
  let flextemp: number;
  if (type == "up") {
    flextemp = this.flexupUtilisation;
  } else {
    flextemp = this.flexupUtilisationDown;
  }
  if (flextemp < 0) {
    flextemp = 0;
  }
  if (flextemp > 100) {
    flextemp = 100;
  }
  if (flextemp.toString() == "") {
    flextemp = 0;
  }
  if (type == "up") {
    this.flexupUtilisation = flextemp;
    this.checkFlexState("up");
  } else {
    this.flexupUtilisationDown = flextemp;
    this.checkFlexState("down");
  }
}

checkFlexState(type: any) {
  let flextemputil: number;
  let flextempmin: number;
  if (type == "up") {
    flextemputil = this.flexupUtilisation;
    flextempmin = this.flexupUtilisationMinutes;
  } else {
    flextemputil = this.flexupUtilisationDown;
    flextempmin = this.flexupUtilisationMinutesDown;
  }
  if (flextemputil == 70 && flextempmin == 5 && type == "up") {
    this.setFlexButtonstyle("btnagg", "up");
    this.setflexChart("aggresive", "up");
  } else if (flextemputil == 80 && flextempmin == 5 && type == "up") {
    this.setFlexButtonstyle("btnbal", "up");
    this.setflexChart("balanced", "up");
  } else if (flextemputil == 90 && flextempmin == 10 && type == "up") {
    this.setFlexButtonstyle("btnrel", "up");
    this.setflexChart("relaxed", "up");
  } else if (type == "up") {
    this.setFlexButtonstyle("btncus", "up");
    this.setflexChart("custom", "up");
  } else if (flextemputil == 90 && flextempmin == 10 && type == "down") {
    this.setFlexButtonstyle("btnreldown", "down");
    this.setflexChart("relaxeddown", "down");
  } else if (flextemputil == 80 && flextempmin == 5 && type == "down") {
    this.setFlexButtonstyle("btnbaldown", "down");
    this.setflexChart("balanceddown", "down");
  } else if (flextemputil == 70 && flextempmin == 5 && type == "down") {
    this.setFlexButtonstyle("btnaggdown", "down");
    this.setflexChart("aggresivedown", "down");
  } else if (type == "down") {
    this.setFlexButtonstyle("btncusdown", "down");
    this.setflexChart("customdown", "down");
  }
  this.addToModel();
}

setFlexButtonstyle(btn: any, type: any) {
  if (type == "up") {
    const btnNor = document.getElementsByClassName(
      "btnActivated"
    ) as HTMLCollectionOf<HTMLElement>;
    btnNor[0].classList.remove("btnActivated");
    const btnAct = document.getElementsByClassName(btn) as HTMLCollectionOf<
      HTMLElement
    >;
    btnAct[0].classList.add("btnActivated");
  } else {
    const btnNor = document.getElementsByClassName(
      "btnActivatedDown"
    ) as HTMLCollectionOf<HTMLElement>;
    btnNor[0].classList.remove("btnActivatedDown");
    const btnAct = document.getElementsByClassName(btn) as HTMLCollectionOf<
      HTMLElement
    >;
    btnAct[0].classList.add("btnActivatedDown");
  }
}


updateFlexMinutes(type: any) {
  let flextempminutes: number;
  if (type == "up") {
    flextempminutes = this.flexupUtilisationMinutes;
  } else {
    flextempminutes = this.flexupUtilisationMinutesDown;
  }
  if (flextempminutes == 1) flextempminutes = 5;
  if (flextempminutes > 1 && flextempminutes < 5) {
    flextempminutes = 5;
  }
  if (flextempminutes < 1) flextempminutes = 5;
  if (flextempminutes > 15) {
    flextempminutes = 15;
  }
  if (flextempminutes.toString() == "") {
    flextempminutes = 5;
  }
  if (type == "up") {
    this.flexupUtilisationMinutes = flextempminutes;
    this.checkFlexState("up");
  } else {
    this.flexupUtilisationMinutesDown = flextempminutes;
    this.checkFlexState("down");
  }
}

//end of from on-demand configure page


}
