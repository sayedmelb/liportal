import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ViewController } from "ionic-angular";
import { mobiscroll, MbscDatetimeOptions } from "@mobiscroll/angular";
import { ShowHideChild } from "../../providers/show-hide-child/show-hide-child";
import { DynamicService } from '../../providers/dynamic-service/dynamic-service';
import { InputControlWidget } from "../control-widget";

mobiscroll.settings = {
  theme: "ios"
};
 
@Component({
  selector: "dynamic-flex-configure",
  templateUrl: "dynamic-flex-configure.html"
})

export class DynamicFlexConfigureComponent extends InputControlWidget {
  now = new Date();
  time: Date = this.now;
  isSaveLatter: boolean = false;
  dynamicFlexSwitch: boolean = false;
  spendCapToggle: boolean = false;
  spendCapTotal: number = 0;
  usageHour: number;
  usageAmount: number;
  usageEmail: string;
  perhourcostsitea: number;
  perhourcostsiteb: number;
  siteaFlexTotal: number = 0;
  sitebFlexTotal: number = 0;
  sitesFlexTotal: number = 0;
  spendCapAmountsitea: number;
  spendCapHoursitea: number;
  spendCapAmountsiteb: number;
  spendCapHoursiteb: number;
  flexIncreaseDecrease: boolean;
  flexUsage: boolean;
  flexSpendCap: boolean;
  timeBox: string;
  spendCap: string;
  dynamicFlex: string;
  flexUp: string;
  flexupUtilisation: number;
  flexupUtilisationMinutes: number;
  flexDown: string;
  flexupUtilisationDown: number;
  flexupUtilisationMinutesDown: number;
  minValue: number;
  maxValue: number;
  changeFlexValue: string;
  step: number;
  limitMsg: boolean;
  initialRange: { lower: number; upper: number; flexmax: number };
  rate: number;
  isValid: boolean;
  endtime: string = "";
  starttime: string = "";
  startdate: string = "";
  enddate: string = "";
  noOfFlexHours: number;
  flexTotal: number;
  leftknob: number = 100;
  channelBandwidth: { upper: number; lower: number };
  recurs: string = "";
  controlValidate: boolean;
  weekFlexDays: {
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    sun: boolean;
  };
  macaddress1: string;
  macaddress2: string;

  //below will come from Schema model latter
  //"Mon Oct 29 2018 17:03:00 GMT+1100 (Australian Eastern Daylight Time)",
  dynamicBandwidthmodel: {
    macaddress1: string;
    macaddress2: string;
    existingStartFlex: number;
    existingEndFlex: number;
    maxValue: number;
    minValue: number;
    step: number;
    changeFlexValue: string;
    rate: number;
    isValid: boolean;
    limitMsg: boolean;
    flexmax: number;
    usageHour: number;
    usageAmount: number;
    perhourcostsitea: number;
    perhourcostsiteb: number;
    spendCapAmountsitea: number;
    spendCapHoursitea: number;
    spendCapAmountsiteb: number;
    spendCapHoursiteb: number;
    recurs: string;
    controlValidate: boolean;
    timeBox: string;
    spendCap: string;
    dynamicFlex: string;
    flexUp: string;
    flexupUtilisation: number;
    flexupUtilisationMinutes: number;
    flexDown: string;
    flexupUtilisationDown: number;
    flexupUtilisationMinutesDown: number;
    weekFlexDays: {
      mon: boolean;
      tue: boolean;
      wed: boolean;
      thu: boolean;
      fri: boolean;
      sat: boolean;
      sun: boolean;
    };
    flexIncreaseDecrease: boolean;
    flexUsage: boolean;
    flexSpendCap: boolean;
    usageEmail: string;
  } = {
    macaddress1: "SD Ethernet 01 Mac Park",
    macaddress2: "SD Ethernet 01 Noth Sydney",
    existingStartFlex: 100,
    existingEndFlex: 500,
    maxValue: 600,
    minValue: 100,
    step: 50,
    changeFlexValue: "100",
    rate: 60,
    isValid: false,
    limitMsg: false,
    flexmax: 500,
    usageHour: 0,
    usageAmount: 0,
    perhourcostsitea: 25,
    perhourcostsiteb: 25,
    spendCapAmountsitea: 0,
    spendCapHoursitea: 0,
    spendCapAmountsiteb: 0,
    spendCapHoursiteb: 0,
    recurs: "",
    controlValidate: false,
    timeBox: "off",
    spendCap: "off",
    dynamicFlex: "OFF",
    flexUp: "balanced",
    flexupUtilisation: 80,
    flexupUtilisationMinutes: 5,
    flexDown: "balanceddown",
    flexupUtilisationDown: 80,
    flexupUtilisationMinutesDown: 5,
    weekFlexDays: {
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: true,
      sat: false,
      sun: false
    },
    flexIncreaseDecrease: true,
    flexUsage: true,
    flexSpendCap: true,
    usageEmail: ""
  };
  @Input() getFlexStatus: string;
  @Output() getFlexStatusChange = new EventEmitter<string>();

  private size: number;
  private square: number;
  private stime: Date = new Date(2018, 0, 1, 8, 30);
  private etime: Date = new Date(2018, 0, 1, 17, 0); 

  private timeSettings: MbscDatetimeOptions = {
    touchUi: false
  };

  public data;
  public is_valid: boolean = false;
  constructor(
    public viewCtrl: ViewController,
    public dataService: DynamicService,
    public sibling: ShowHideChild
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    let _th = this;
    if (this.schema.getParent().getValue("configure")) {
      this.data = this.schema.getParent().getValue("configure");
      this.updateDataModel();
    } else if (this.schema.onLoad)
      this.schema.onLoad(() => {
        _th.data = _th.schema.datasource[0];
        this.setInitialsettings();
      });
  }

  updateDataModel() {
    for (let cont of this.schema.controlsup) {
      if (cont.flextype == this.data.increased_utilisation_mode)
        cont.active = true;
      else cont.active = false;
    }
    for (let cont of this.schema.controlsdown) {
      if (cont.flextype == this.data.decreased_utilisation_mode)
        cont.active = true;
      else cont.active = false;
    }
    this.updateSpenCapStyle();
    this.updateTimeBoxStyle();
    this.is_valid = true;
    this.dynamicFlexSwitch = true;
    this.setInitialsettings();
    this.displaySlider();
    this.isValid = true;
  }

  updateTimeBoxStyle() {
    if (this.data.timebox == "on" || this.timeBox == "on") {
      setTimeout(function() {
        const btnFlex = document.getElementsByClassName(
          "btnActivatedTimebox"
        ) as HTMLCollectionOf<HTMLElement>;
        btnFlex[0].classList.remove("btnActivatedTimebox");
        const btnSpe = document.getElementsByClassName(
          "btnflexspecified"
        ) as HTMLCollectionOf<HTMLElement>;
        btnSpe[0].classList.add("btnActivatedTimebox");
      }, 500);
    }
  }

  updateSpenCapStyle() {
    if (this.data.spendcap == "on" || this.spendCap == "on") {
      setTimeout(function() {
        const btnNor = document.getElementsByClassName(
          "btnActivatedSpendCap"
        ) as HTMLCollectionOf<HTMLElement>;
        btnNor[0].classList.remove("btnActivatedSpendCap");
        const btnSpend = document.getElementsByClassName(
          "btnSpendCap"
        ) as HTMLCollectionOf<HTMLElement>;
        btnSpend[0].classList.add("btnActivatedSpendCap");
      }, 500);
    }
  }

  saveforLatter(e) {
    this.isSaveLatter = true;
  }

  displaySlider() {
    setTimeout(function() {
      const slidr1 = document.getElementsByClassName(
        "dynamicslider"
      ) as HTMLCollectionOf<HTMLElement>;
      slidr1[0].classList.remove("sliderdisplay");
    }, 500);
  }

  editConfigure(e) {
    this.isSaveLatter = false;
    this.displaySlider();
    this.updateSpenCapStyle();
  }

  private updateDynamicSliderClass() {
    this.dynamicFlexSwitch = !this.dynamicFlexSwitch;
    const slidr = document.getElementsByClassName(
      "dynamicslider"
    ) as HTMLCollectionOf<HTMLElement>;
  }

  removeDynamicClass() {
    const inioff = document.getElementsByClassName("off") as HTMLCollectionOf<
      HTMLElement
    >;
    const slidr = document.getElementsByClassName(
      "dynamicslider"
    ) as HTMLCollectionOf<HTMLElement>;
    inioff[0].classList.remove("ini");
    slidr[0].classList.remove("sliderdisplay");
  }

  addDynamicClass() {
    const slidr = document.getElementsByClassName(
      "dynamicslider"
    ) as HTMLCollectionOf<HTMLElement>;
    slidr[0].classList.add("sliderdisplay");
    const inioff = document.getElementsByClassName("off") as HTMLCollectionOf<
      HTMLElement
    >;
    inioff[0].classList.add("ini");
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  UKeyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onlyNumbersWithDot(e: any) {
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
      if (e.currentTarget.id == "curamount") {
        this.updateExcessUsage(0, "amt", parseFloat(tempValue), "keypress");
      } else {
        this.updateExcessUsage(0, "hr", parseFloat(tempValue), "keypress");
      }
      return true;
    }
  }

  usagekeyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    var tempValue: string;
    let inputChar = String.fromCharCode(event.charCode);
    //keyup
    if (
      event.keyCode != 8 &&
      event.keyCode != 190 &&
      !pattern.test(inputChar)
    ) {
      event.preventDefault();
    }
    if (event.keyCode == 32)
      event.currentTarget.value = event.currentTarget.value.replace(" ", "");
    if ((event.currentTarget.value.match(/\./g) || []).length > 1)
      event.currentTarget.value = event.currentTarget.value
        .toString()
        .substr(0, event.currentTarget.value.toString().length - 1);
    tempValue = event.currentTarget.value + inputChar;
    if (event.currentTarget.id == "curamount") {
      this.updateExcessUsage(0, "amt", parseFloat(tempValue), "keypress");
    } else {
      this.updateExcessUsage(0, "hr", parseFloat(tempValue), "keypress");
    }
  }

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
  }

  setflexChart(state, type) {
    if (type == "up") this.flexUp = state;
    else this.flexDown = state;
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

  setbuttonActive(event) {
    event.currentTarget.classList.add("active");
  }

  setButtonInactive(event) {
    event.currentTarget.classList.remove("active");
  }

  updateDynamicmodel() {
    // this.dynamicBandwidthmodel.macaddress1 = this.data.address.toString();
    // this.dynamicBandwidthmodel.macaddress2 = this.data.from.toString();
    this.dynamicBandwidthmodel.maxValue = this.data.flex_pack;
    this.dynamicBandwidthmodel.minValue = this.data.dynamic_bw; //this.data.contracted_bw;
    this.dynamicBandwidthmodel.step = 50; /** this will be dynamic based on schema logic */
    this.dynamicBandwidthmodel.changeFlexValue = this.data.dynamic_bw.toString(); //this.data.contracted_bw.toString();
    this.dynamicBandwidthmodel.isValid = false;
    this.dynamicBandwidthmodel.flexUp = this.data.increased_utilisation_mode.toString();
    this.dynamicBandwidthmodel.flexDown = this.data.decreased_utilisation_mode.toString();
    this.dynamicBandwidthmodel.flexupUtilisation = this.data.utilisation_increase_threshold_pc;
    this.dynamicBandwidthmodel.flexupUtilisationDown = this.data.utilisation_decrease_threshold_pc;
    this.dynamicBandwidthmodel.flexupUtilisationMinutes = this.data.increased_utilisation_monitor_time_period;
    this.dynamicBandwidthmodel.flexupUtilisationMinutesDown = this.data.decreased_utilisation_monitor_time_period;
    this.dynamicBandwidthmodel.usageAmount = this.data.dynamic_notified_cost;
    this.dynamicBandwidthmodel.usageHour = this.data.dynamic_notified_hours;
    this.dynamicBandwidthmodel.spendCapAmountsitea = this.data.dynamic_max_cost_address;
    this.dynamicBandwidthmodel.spendCapAmountsiteb = this.data.dynamic_max_cost_from;
    this.dynamicBandwidthmodel.spendCapHoursitea = this.data.dynamic_max_hours_address;
    this.dynamicBandwidthmodel.spendCapHoursiteb = this.data.dynamic_max_hours_from;
    this.dynamicBandwidthmodel.spendCap = this.data.spendcap.toString();
    this.dynamicBandwidthmodel.timeBox = this.data.timebox.toString();
    this.dynamicBandwidthmodel.weekFlexDays.mon = this.data.dynamic_days.mon;
    this.dynamicBandwidthmodel.weekFlexDays.tue = this.data.dynamic_days.tue;
    this.dynamicBandwidthmodel.weekFlexDays.wed = this.data.dynamic_days.wed;
    this.dynamicBandwidthmodel.weekFlexDays.thu = this.data.dynamic_days.thu;
    this.dynamicBandwidthmodel.weekFlexDays.fri = this.data.dynamic_days.fri;
    this.dynamicBandwidthmodel.weekFlexDays.sat = this.data.dynamic_days.sat;
    this.dynamicBandwidthmodel.weekFlexDays.sun = this.data.dynamic_days.sun;
  }

  setInitialsettings() {
    // setTimeout(function() {
    //   const elementknobPressed = document.getElementsByClassName(
    //     "range-knob-handle"
    //   ) as HTMLCollectionOf<HTMLElement>;
    //   elementknobPressed[0].classList.add("range-knob-pressed");
    // }, 2000);
    this.updateDynamicmodel();
    // this.macaddress1 = this.dynamicBandwidthmodel.macaddress1;
    // this.macaddress2 = this.dynamicBandwidthmodel.macaddress2;
    this.maxValue = this.dynamicBandwidthmodel.maxValue;
    this.minValue = this.dynamicBandwidthmodel.minValue;
    this.step = this.dynamicBandwidthmodel.step;
    this.changeFlexValue = this.dynamicBandwidthmodel.changeFlexValue;
    this.rate = this.dynamicBandwidthmodel.step;
    this.isValid = this.dynamicBandwidthmodel.isValid;
    this.limitMsg = this.dynamicBandwidthmodel.isValid;
    this.channelBandwidth = {
      upper: this.maxValue,
      lower: this.minValue
    };
    this.timeBox = this.dynamicBandwidthmodel.timeBox;
    this.spendCap = this.dynamicBandwidthmodel.spendCap;
    this.dynamicFlex = this.dynamicBandwidthmodel.dynamicFlex;
    this.flexUp = this.dynamicBandwidthmodel.flexUp;
    this.flexupUtilisation = this.dynamicBandwidthmodel.flexupUtilisation;
    this.flexupUtilisationMinutes = this.dynamicBandwidthmodel.flexupUtilisationMinutes;
    this.flexDown = this.dynamicBandwidthmodel.flexDown;
    this.flexupUtilisationDown = this.dynamicBandwidthmodel.flexupUtilisationDown;
    this.flexupUtilisationMinutesDown = this.dynamicBandwidthmodel.flexupUtilisationMinutesDown;
    this.initialRange = {
      lower: this.minValue,
      upper: this.maxValue,
      flexmax: this.dynamicBandwidthmodel.flexmax
    };
    this.weekFlexDays = {
      mon: this.dynamicBandwidthmodel.weekFlexDays.mon,
      tue: this.dynamicBandwidthmodel.weekFlexDays.tue,
      wed: this.dynamicBandwidthmodel.weekFlexDays.wed,
      thu: this.dynamicBandwidthmodel.weekFlexDays.thu,
      fri: this.dynamicBandwidthmodel.weekFlexDays.fri,
      sat: this.dynamicBandwidthmodel.weekFlexDays.sat,
      sun: this.dynamicBandwidthmodel.weekFlexDays.sun
    };
    this.flexIncreaseDecrease = this.dynamicBandwidthmodel.flexIncreaseDecrease;
    this.flexUsage = this.dynamicBandwidthmodel.flexUsage;
    this.usageHour = this.dynamicBandwidthmodel.usageHour;
    this.usageAmount = this.dynamicBandwidthmodel.usageAmount;
    this.flexSpendCap = this.dynamicBandwidthmodel.flexSpendCap;
    this.usageEmail = this.dynamicBandwidthmodel.usageEmail;
    this.spendCapAmountsitea = this.dynamicBandwidthmodel.spendCapAmountsitea;
    this.spendCapHoursitea = this.dynamicBandwidthmodel.spendCapHoursitea;
    this.spendCapAmountsiteb = this.dynamicBandwidthmodel.spendCapAmountsiteb;
    this.spendCapHoursiteb = this.dynamicBandwidthmodel.spendCapHoursiteb;
    this.perhourcostsitea = this.dynamicBandwidthmodel.perhourcostsitea;
    this.perhourcostsiteb = this.dynamicBandwidthmodel.perhourcostsiteb;
    var knobloc = this.calculateKnobPosition(
      this.minValue,
      this.data.channel_bw,
      this.data.flex_pack
    );
    //commented by syed 14 jan 2019 
    // setTimeout(function() {
    //   const element = document.getElementsByClassName(
    //     "range-bar-active"
    //   ) as HTMLCollectionOf<HTMLElement>;
    //   element[0].style.right = knobloc + "%";
    //   element[0].style.left = "0%";
    // }, 2000);
  }

  calculateKnobPosition(min, max, flex) {
    let pc = 100 - ((flex - min) * 100) / (max - min);
    return pc;
  }

  IonSliderPressed(ev: any) {
    const elementknobPressed = document.getElementsByClassName(
      "range-knob-handle"
    ) as HTMLCollectionOf<HTMLElement>;
    elementknobPressed[0].classList.add("range-knob-pressed");
  }

  onChange(ev: any) {
    this.leftknob = ev["_valA"];
    this.changeFlexValue = this.leftknob + "";
    if (this.leftknob > this.data.flex_pack) {
      this.limitMsg = true;
      this.isValid = false; // this is needed in red zone "Cal to Action" button to be disabled as per Jira story requirement
      this.controlValidate = true;
      var knobloc = this.calculateKnobPosition(
        this.minValue,
        this.data.channel_bw,
        this.data.flex_pack
      );
      setTimeout(function() {
        const element = document.getElementsByClassName(
          "range-bar-active"
        ) as HTMLCollectionOf<HTMLElement>;
        element[0].style.right = knobloc + "%";
        element[0].style.left = "0%";
      }, 10);
    } else {
      this.limitMsg = false;
      this.controlValidate = false;
      //IsValid for dynamic is made true if slider chnages to max limit
      if (this.checkFlexCondition()) this.isValid = true;
      else this.isValid = false;
    }
    if (this.leftknob < this.data.flex_pack + 1)
      this.sitesFlexTotal = this.flexCostCalculate(
        this.leftknob - this.minValue
      );
  }

  flexCostCalculate(flex: number) {
    if (this.leftknob > this.minValue) {
      this.siteaFlexTotal = this.perhourcostsitea * flex;
      this.sitebFlexTotal = this.perhourcostsiteb * flex;
      return this.siteaFlexTotal + this.sitebFlexTotal;
    } else {
      this.siteaFlexTotal = 0;
      this.sitebFlexTotal = 0;
      return 0;
    }
  }

  setTimeBox(event: any, timeboxState: any) {
    this.timeBox = timeboxState;
    const btnNor = document.getElementsByClassName(
      "btnActivatedTimebox"
    ) as HTMLCollectionOf<HTMLElement>;
    btnNor[0].classList.remove("btnActivatedTimebox");
    event.currentTarget.classList.add("btnActivatedTimebox");
  }

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
    }
  }

  setWeekDay(event: any, day: any) {
    this.weekFlexDays[day] = !this.weekFlexDays[day];
    if (!this.checkFlexCondition()) this.isValid = false;
    else {
      if (this.leftknob > this.minValue) this.isValid = true;
      else this.isValid = false;
    }
  }

  setCalulate() {
    this.isValid = true;
    if (this.leftknob < this.initialRange.flexmax + 1)
      this.flexTotal = this.flexCalculate(
        this.leftknob - this.minValue,
        this.rate
      );
  }

  closeModel() {
    this.viewCtrl.dismiss();
  }

  setnextLevel(e) {
    if (!this.checkFlexCondition()) this.isValid = false;
    if (this.isValid) {
      this.setDynamicObj();
      var parent = this.schema.getParent();
      parent.setValue("configure", this.data);
      this.sibling.updateSibling(parent.fieldsets[0].fields[1]);
    }
  }

  checkFlexCondition() {
    let validcount: number = 0;
    if (!this.weekFlexDays.mon) validcount = validcount + 1;
    if (!this.weekFlexDays.tue) validcount = validcount + 1;
    if (!this.weekFlexDays.wed) validcount = validcount + 1;
    if (!this.weekFlexDays.thu) validcount = validcount + 1;
    if (!this.weekFlexDays.fri) validcount = validcount + 1;
    if (!this.weekFlexDays.sat) validcount = validcount + 1;
    if (!this.weekFlexDays.sun) validcount = validcount + 1;
    if (validcount > 6) return false;
    else {
      if (this.stime < this.etime) return true;
      else return false;
    }
  }

  checkDattimeValidation() {
    if (this.checkFlexCondition()) this.isValid = true;
    else this.isValid = false;
  }

  dateChange(ev: any) {
    if (this.leftknob < this.initialRange.flexmax + 1 && this.isValid)
      this.flexTotal = this.flexCalculate(
        this.leftknob - this.minValue,
        this.rate
      );
  }

  flexCalculate(flexChange: number, rate: number) {
    if (this.leftknob > this.minValue) {
      return 0;
    }
  }

  updateExcessUsage(
    val: number,
    type: string,
    keypressnum: number,
    keypress: string
  ) {
    var hours: string;
    var uamount: string;
    var tempusageAmt: number;
    var tempusagehour: number;
    if (keypress == "keypress") {
      if (type == "amt") tempusageAmt = keypressnum;
      else tempusagehour = keypressnum;
    } else {
      tempusageAmt = this.usageAmount;
      tempusagehour = this.usageHour;
    }
    if (type == "amt") {
      hours = (tempusageAmt / this.perhourcostsitea).toFixed(2);
      this.usageHour = parseFloat(hours);
    } else {
      uamount = (this.perhourcostsitea * tempusagehour).toFixed(2);
      this.usageAmount = parseFloat(uamount);
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

  spendCapkeyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    var tempValue: string;
    let inputChar = String.fromCharCode(event.charCode);
    if (
      event.keyCode != 8 &&
      event.keyCode != 190 &&
      !pattern.test(inputChar)
    ) {
      event.preventDefault();
    }
    if (event.keyCode == 32)
      event.currentTarget.value = event.currentTarget.value.replace(" ", "");
    if (event.keyCode == 190)
      if ((event.currentTarget.value.match(/\./g) || []).length > 1)
        event.currentTarget.value = event.currentTarget.value
          .toString()
          .substr(0, event.currentTarget.value.toString().length - 1);
    tempValue = event.currentTarget.value + inputChar;
    if (event.currentTarget.id == "curamountsitea") {
      //scenario 1
      this.spendCapCalculate("amtsitea", parseFloat(tempValue), "keypress");
    } else if (event.currentTarget.id == "houramtsitea") {
      this.spendCapCalculate("hrsitea", parseFloat(tempValue), "keypress");
    } else if (event.currentTarget.id == "curamountsiteb") {
      this.spendCapCalculate("amtsiteb", parseFloat(tempValue), "keypress");
    } else if (event.currentTarget.id == "houramtsiteb") {
      this.spendCapCalculate("hrsiteb", parseFloat(tempValue), "keypress");
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

  validateEmail(event: any) {
    var str = event.target.value;
    if (str !== "") {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(str)) alert("Please enter a valid email address");
    }
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
  }

  setDynamicObj() {
    this.setDataModel();
    this.dataService.setOption('macaddress1', this.macaddress1);
    this.dataService.setOption('macaddress2', this.macaddress2);
    this.dataService.setOption('initialRange', this.initialRange);
    this.dataService.setOption('changeFlexValue', this.changeFlexValue);
    this.dataService.setOption('siteaFlexTotal', this.siteaFlexTotal);
    this.dataService.setOption('sitebFlexTotal', this.sitebFlexTotal);
    this.dataService.setOption('flexUp', this.flexUp);
    this.dataService.setOption('flexupUtilisation', this.flexupUtilisation);
    this.dataService.setOption('flexDown', this.flexDown);
    this.dataService.setOption('flexupUtilisationDown', this.flexupUtilisationDown);
    this.dataService.setOption('timeBox', this.timeBox);
    this.dataService.setOption('weekFlexDays', this.weekFlexDays);
    this.dataService.setOption('spendCapAmountsitea', this.spendCapAmountsitea);
    this.dataService.setOption('spendCapAmountsiteb', this.spendCapAmountsiteb);
    this.dataService.setOption('spendCapTotal', this.spendCapTotal);
    this.dataService.setOption('stime', this.stime);
    this.dataService.setOption('etime', this.etime);
  }

  setDataModel() {
    this.data.dynamic_bw = parseInt(this.changeFlexValue);
    this.data.increased_utilisation_mode = this.flexUp;
    this.data.decreased_utilisation_mode = this.flexDown;
    this.data.utilisation_increase_threshold_pc = this.flexupUtilisation;
    this.data.utilisation_decrease_threshold_pc = this.flexupUtilisationDown;
    this.data.increased_utilisation_monitor_time_period = this.flexupUtilisationMinutes;
    this.data.decreased_utilisation_monitor_time_period = this.flexupUtilisationMinutesDown;
    this.data.dynamic_max_cost_address = this.spendCapAmountsitea;
    this.data.dynamic_max_cost_from = this.spendCapAmountsiteb;
    this.data.dynamic_max_hours_address = this.spendCapHoursitea;
    this.data.dynamic_max_hours_from = this.spendCapHoursiteb;
    this.data.dynamic_notified_cost = this.usageAmount;
    this.data.dynamic_notified_hours = this.usageHour;
    this.data.spendcap = this.spendCap;
    this.data.dynamic_days = this.weekFlexDays;
    this.data.timebox = this.timeBox;
  }
}
