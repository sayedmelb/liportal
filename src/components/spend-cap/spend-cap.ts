import { Component, Input, Output, EventEmitter, } from "@angular/core";
import * as _ from 'lodash';
import { NGXLogger } from "ngx-logger";
import moment from 'moment';
import { NumberFormatStyle } from "@angular/common";

const MESH_KEYWORD = "Mesh";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";

@Component({
  selector: "spend-cap",
  templateUrl: "spend-cap.html"
})

export class SpendCap {
  @Input("schema") schema: any;
  @Input("model") model: any;
  //@Input("model") model: any;
  //@Output() network = new EventEmitter();


  spendCapToggle: boolean = false;
  spendCapTotal: number = 0;
  //usageHour: number;
  //usageAmount: number;
  //usageEmail: string;
  //perhourcostsitea: number;
  //perhourcostsiteb: number;
  //siteaFlexTotal: number = 0;
  //sitebFlexTotal: number = 0;
  //sitesFlexTotal: number = 0;
  spendCapAmountsitea: number;
  spendCapHoursitea: number;
  spendCapAmountsiteb: number;
  spendCapHoursiteb: number;
  //flexIncreaseDecrease: boolean;
  //flexUsage: boolean;
  flexSpendCap: boolean;
  //timeBox: string;
  spendCap: string = 'off';



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
  perhourcostsitea: number;
  perhourcostsiteb: number;

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

    console.log("spend cap", this.schema);
    this.spendCapAmountsitea = 0;//this.dynamicBandwidthmodel.spendCapAmountsitea;
    this.spendCapHoursitea = 0;//this.dynamicBandwidthmodel.spendCapHoursitea;
    this.spendCapAmountsiteb = 0;//his.dynamicBandwidthmodel.spendCapAmountsiteb;
    this.spendCapHoursiteb = 0;//this.dynamicBandwidthmodel.spendCapHoursiteb;
    this.perhourcostsitea = 25;//this.dynamicBandwidthmodel.perhourcostsitea;
    this.perhourcostsiteb = 25;//this.dynamicBandwidthmodel.perhourcostsiteb;
    //this.initialRange.lower =100;
    //this.initialRange.flexmax = 200;
    //below will come from datamodel latter and slider
    this.initialRange = {
      lower: 100,
      upper: 200,
      flexmax: 200
    };
    this.flexupUtilisation = 80;
    this.flexupUtilisationMinutes = 5;

    this.addToModel();

  }

  // ngDoCheck() {


  // }


  setSpendCap(event: any, spendCapState: any) {
    this.spendCap = spendCapState;
    const btnNor = document.getElementsByClassName(
      "btnActivatedSpendCap"
    ) as HTMLCollectionOf<HTMLElement>;
    btnNor[0].classList.remove("btnActivatedSpendCap");
    event.currentTarget.classList.add("btnActivatedSpendCap");
    if (this.spendCap == "off") {
      this.spendCapAmountsitea = 0;
      this.spendCapAmountsiteb = 0;
      this.spendCapHoursitea = 0;
      this.spendCapHoursiteb = 0;
      this.spendCapTotal = 0;
      this.addToModel();
    }
  }


  onlyNumbersWithDotSpendCap(e: any) {
    let status: boolean = false;
    var charCode;
    let dotcheck: boolean = false;
    let inputChar = String.fromCharCode(e.charCode);
    if (e.keyCode > 0) {
      charCode = e.which || e.keyCode;
    } else if (typeof e.charCode != "undefined") {
      charCode = e.which || e.keyCode;
    }
    if (charCode == 46) {
      if ((e.currentTarget.value.match(/\./g) || []).length > 1) {
        e.currentTarget.value = e.currentTarget.value
          .toString()
          .substr(0, e.currentTarget.value.toString().length - 1);
        return false;
      }
      dotcheck = true;
      status = true;
    }
    if (!dotcheck) {
      if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    }
    status = true;
    if (status == true) {
      let tempValue = e.currentTarget.value + inputChar;
      if ((e.currentTarget.value.match(/\./g) || []).length > 1)
        e.currentTarget.value = e.currentTarget.value
          .toString()
          .substr(0, e.currentTarget.value.toString().length - 1);
      if (e.currentTarget.id == "curamountsitea") {
        this.spendCapCalculate("amtsitea", parseFloat(tempValue), "keypress");
        //scenario 1, if link is on
        if (this.spendCapToggle == false) {
          this.spendCapHoursiteb = this.spendCapHoursitea;
          this.spendCapCalculate("hrsiteb", this.spendCapHoursiteb, "keypress");
        }
      } else if (e.currentTarget.id == "houramtsitea") {
        this.spendCapCalculate("hrsitea", parseFloat(tempValue), "keypress");
        //scenario 1, if link is on
        if (this.spendCapToggle == false) {
          this.spendCapHoursiteb = parseFloat(tempValue);
          this.spendCapCalculate("hrsiteb", parseFloat(tempValue), "keypress");
        }
      } else if (e.currentTarget.id == "curamountsiteb") {
        this.spendCapCalculate("amtsiteb", parseFloat(tempValue), "keypress");
        //scenario 1, if link is on
        if (this.spendCapToggle == false) {
          this.spendCapHoursitea = this.spendCapHoursiteb;
          this.spendCapCalculate("hrsitea", this.spendCapHoursitea, "keypress");
        }
      } else if (e.currentTarget.id == "houramtsiteb") {
        this.spendCapCalculate("hrsiteb", parseFloat(tempValue), "keypress");
        //scenario 1, if link is on
        if (this.spendCapToggle == false) {
          this.spendCapHoursitea = parseFloat(tempValue);
          this.spendCapCalculate("hrsitea", parseFloat(tempValue), "keypress");
        }
      }
      return true;
    }
  }


  spendCaponBlur(type: string, keypressnum: number, keypress: string) {
    if (type == "amtsitea") {
      this.spendCapCalculate("amtsitea", 0, "");
      //scenario 1, if link is on
      if (this.spendCapToggle == false) {
        this.spendCapHoursiteb = this.spendCapHoursitea;
        this.spendCapCalculate("hrsiteb", 0, "");
      }
    } else if (type == "hrsitea") {
      this.spendCapCalculate("hrsitea", 0, "");
      //scenario 1, if link is on
      if (this.spendCapToggle == false) {
        this.spendCapHoursiteb = this.spendCapHoursitea; //parseFloat(tempValue);
        this.spendCapCalculate("hrsiteb", 0, "");
      }
    } else if (type == "amtsiteb") {
      this.spendCapCalculate("amtsiteb", 0, "");
      //scenario 1, if link is on
      if (this.spendCapToggle == false) {
        this.spendCapHoursitea = this.spendCapHoursiteb;
        this.spendCapCalculate("hrsitea", 0, "");
      }
    } else if (type == "hrsiteb") {
      this.spendCapCalculate("hrsiteb", 0, "");
      //scenario 1, if link is on
      if (this.spendCapToggle == false) {
        this.spendCapHoursitea = this.spendCapHoursiteb; //parseFloat(tempValue);
        this.spendCapCalculate("hrsitea", 0, "");
      }
    }
  }

  spendCapCalculate(type: string, keypressnum: number, keypress: string) {
    var hours: string;
    var uamount: string;
    var tempusageAmt: number;
    var tempusagehour: number;
    if (keypress == "keypress") {
      if (type == "amtsitea" || type == "amtsiteb") tempusageAmt = keypressnum;
      else tempusagehour = keypressnum;
    } else {
      if (type == "amtsitea") tempusageAmt = this.spendCapAmountsitea;
      else if (type == "amtsiteb") tempusageAmt = this.spendCapAmountsiteb;
      else if (type == "hrsitea") tempusagehour = this.spendCapHoursitea;
      else if (type == "hrsiteb") tempusagehour = this.spendCapHoursiteb;
    }
    if (type == "amtsitea") {
      hours = (tempusageAmt / this.perhourcostsitea).toFixed(2);
      this.spendCapHoursitea = parseFloat(hours);
      this.setSpendCapTotal();
    } else if (type == "amtsiteb") {
      hours = (tempusageAmt / this.perhourcostsiteb).toFixed(2);
      this.spendCapHoursiteb = parseFloat(hours);
      this.setSpendCapTotal();
    } else if (type == "hrsitea") {
      uamount = (this.perhourcostsitea * tempusagehour).toFixed(2);
      this.spendCapAmountsitea = parseFloat(uamount);
      this.setSpendCapTotal();
    } else if (type == "hrsiteb") {
      uamount = (this.perhourcostsiteb * tempusagehour).toFixed(2);
      this.spendCapAmountsiteb = parseFloat(uamount);
      this.setSpendCapTotal();
    }
  }


  setSpendCapTotal() {
    let total: number = 0;
    let amntsitea: number = 0;
    let amntsiteb: number = 0;
    if (typeof this.spendCapAmountsitea == "string")
      amntsitea = parseFloat(this.spendCapAmountsitea);
    else amntsitea = this.spendCapAmountsitea;
    if (typeof this.spendCapAmountsiteb == "string")
      amntsiteb = parseFloat(this.spendCapAmountsiteb);
    else amntsiteb = this.spendCapAmountsiteb;
    total = amntsitea + amntsiteb;
    this.spendCapTotal = total;
    this.addToModel();
  }


  updateSpendCap() {
    this.spendCapToggle = !this.spendCapToggle;
    //when sinked again scenario 3
    if (this.spendCapToggle == false) {
      if (this.spendCapAmountsitea > this.spendCapAmountsiteb) {
        this.spendCapHoursiteb = this.spendCapHoursitea;
        this.spendCapCalculate("hrsiteb", 0, ""); //sink
      } else if (this.spendCapAmountsiteb > this.spendCapAmountsitea) {
        this.spendCapHoursitea = this.spendCapHoursiteb;
        this.spendCapCalculate("hrsitea", 0, ""); //sink
      } else if (this.spendCapAmountsiteb == this.spendCapAmountsitea) {
        //if both cap amounts are equal 3rd scenario
        if (this.spendCapHoursitea > this.spendCapHoursiteb) {
          this.spendCapHoursiteb = this.spendCapHoursitea;
          this.spendCapCalculate("hrsiteb", 0, ""); //sink
        } else {
          this.spendCapHoursitea = this.spendCapHoursiteb;
          this.spendCapCalculate("hrsitea", 0, ""); //sink
        }
      }
    }
  }

  addToModel() {
    if (this.model) {
      if (this.spendCap == 'off') {
        delete this.model[0]["spendCap"];
        this.model[0]["spendCap"] = this.spendCap;
        delete this.model[0]["spendCapAmountsitea"];
        delete this.model[0]["spendCapHoursitea"];
      } else {

        delete this.model[0]["spendCap"];
      this.model[0]["spendCap"] = this.spendCap;
      delete this.model[0]["spendCapAmountsitea"];
      this.model[0]["spendCapAmountsitea"] = this.spendCapAmountsitea;


      delete this.model[0]["spendCapHoursitea"];
      this.model[0]["spendCapHoursitea"] = this.spendCapHoursitea;


      }
      

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
