import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";
import {
  Options,
  LabelType,
  ChangeContext
} from 'ng5-slider';
import * as _ from 'lodash';
import {
  DynamicPipe
} from "../../pipes/DynamicPipe";
import { NGXLogger } from "ngx-logger";
import {
  DynamicService
} from '../../providers/dynamic-service/dynamic-service';

const FLEX_MAX_RESTRICTION = "Your flex max is being limited due to Bandwidth being utilized by other services on the port.";
const FLEX_MAX_RESTRICTION_10G = "Your flex max is being limited because you have already reached maximum available Bandwidth on the port.";
const PORT_UPGRADE = "You can upgrade your port capacity to obtain full flex capacity.";
const ERROR_MESSAGE = "Please select a bandwidth within the port's available bandwidth.";
@Component({
  selector: "slider-schedule",
  templateUrl: "slider-schedule.html",
})
export class SliderSchedule {
  @Input("schema") schema: any;
  @Input("model") model: any;
  @Output() bwChange = new EventEmitter();
  manualRefresh: EventEmitter < void > = new EventEmitter < void > ();

  _bWidth: number; //initial Contracted BW
  _scbWidth: number;
  _contracted_bw: number; //populate from schema?
  _initial_contracted_bw: number;
  _flexPack: number; // populate from schema
  _initialFlexPack: number; // populate from schema
  _utilizedByOtherServices: number;
  _portAvailableBW: number;
  _portCapacity: number;

  tempdata: any;

  private bandwidthProfiles: Array < any > = [
    {
      value: 0,
      legend: '0',
      label: ''
    },
    {
      value: 2,
      // legend: '2'
      label: '2 Mbps'
    },
    {
      value: 4,
      // legend: '4'
      label: '4 Mbps'
    },
    {
      value: 6,
      // legend: '6'
      label: '6 Mbps'
    },
    {
      value: 8,
      // legend: '8'
      label: '8 Mbps'
    },
    {
      value: 10,
      legend: '10',
      label: '10 Mbps'
    },
    {
      value: 15,
      // legend: '15'
      label: '15 Mbps'
    },
    {
      value: 20,
      // legend: '20'
      label: '20 Mbps'
    },
    {
      value: 25,
      // legend: '25'
      label: '25 Mbps'
    },
    {
      value: 30,
      // legend: '30'
      label: '30 Mbps'
    },
    {
      value: 40,
      // legend: '40'
      label: '40 Mbps'
    },
    {
      value: 50,
      legend: '50',
      label: '50 Mbps'
    },
    {
      value: 60,
      // legend: '60'
      label: '60 Mbps'
    },
    {
      value: 70,
      // legend: '70'
      label: '70 Mbps'
    },
    {
      value: 80,
      // legend: '80'
      label: '80 Mbps'
    },
    {
      value: 90,
      // legend: '90'
      label: '90 Mbps'
    },
    {
      value: 100,
      legend: '100',
      label: "100 Mbps"
    },
    {
      value: 120,
      // legend: '120'
      label: '120 Mbps'
    },
    {
      value: 140,
      // legend: '140'
      label: '140 Mbps'
    },
    {
      value: 160,
      // legend: '160'
      label: '160 Mbps'
    },
    {
      value: 180,
      // legend: '180'
      label: '180 Mbps'
    },
    {
      value: 200,
      legend: '200',
      label: '200 Mbps'
    },
    {
      value: 250,
      // legend: '250'
      label: '250 Mbps'
    },
    {
      value: 300,
      // legend: '300'
      label: '300 Mbps'
    },
    {
      value: 350,
      // legend: '350'
      label: '350 Mbps'
    },
    {
      value: 400,
      // legend: '400'
      label: '400 Mbps'
    },
    {
      value: 450,
      // legend: '450'
      label: '450 Mbps'
    },
    {
      value: 500,
      legend: '500',
      label: '500 Mbps'
    },
    {
      value: 600,
      // legend: '600'
      label: '600 Mbps'
    },
    {
      value: 700,
      // legend: '700'
      label: '700 Mbps'
    },
    {
      value: 800,
      // legend: '800'
      label: '800 Mbps'
    },
    {
      value: 900,
      // legend: '900'
      label: '900 Mbps'
    },
    {
      value: 1000,
      legend: '1 Gbps',
      label: '1 Gbps'
    },
    {
      value: 2000,
      // legend: '2'
      label: '2 Gbps'
    },
    {
      value: 3000,
      // legend: '3'
      label: '3 Gbps'
    },
    {
      value: 4000,
      // legend: '4'
      label: '4 Gbps'
    },
    {
      value: 5000,
      legend: '5 Gbps',
      label: '5 Gbps'
    },
    {
      value: 6000,
      // legend: '6'
      label: '6 Gbps'
    },
    {
      value: 7000,
      // legend: '7'
      label: '7 Gbps'
    },
    {
      value: 8000,
      // legend: '8'
      label: '8 Gbps'
    },
    {
      value: 9000,
      // legend: '9'
      label: '9 Gbps'
    },
    {
      value: 10000,
      legend: '10 Gbps',
      label: '10 Gbps'
    }

  ];

  constructor(private dynamicPipe: DynamicPipe, private logger: NGXLogger,  public permdataService: DynamicService) {
    this.tempdata = this.permdataService.getOption();
    this.assignDefault();
  }
  showMaxCapPorts: boolean = true;
  errorType: string;
  infoMessages = [];
  ngAfterViewInit() {
    if (this.tempdata.hasOwnProperty("datasource") == true ) { // if coming from review page for permanent BW or schedule or dynamic
     this.assignFromModel();
    } else {
      if(this.schema.datasource)
      this.assignFromSchema();
      else
      this.assignDefault();
    }
  }
  private assignFromSchema() {
    
    try {
      if(this.schema.datasource){

        let serviceProps = this.schema.datasource[0].selectedProduct.properties.service.properties;
        this._bWidth = _.toNumber(_.words(serviceProps.bandwidth)[0]);
        this._scbWidth = _.toNumber(_.words(serviceProps.bandwidth)[0]);
        
        // this.logger.debug("schema assigning bw", serviceProps, serviceProps.bandwidth, _.words(serviceProps.bandwidth));
        
        this._contracted_bw = this._bWidth;
        this._initial_contracted_bw= this._bWidth;
        this._flexPack = _.toNumber(_.words(this.schema.datasource[0].selectedProduct.properties.flex_pack)[0]);
        if (serviceProps.port) this._portCapacity = _.toNumber(_.words(serviceProps.port)[0]);
       // if (serviceProps.utilization.bw) this._utilizedByOtherServices = _.toNumber(_.words(serviceProps.utilization.bw)[0]);
       if(this.model) {
         this._utilizedByOtherServices = this.model[0].utilizedByOtherServices;
       }
       if (_.has(this.model[0], '_portAvailableBW') && this.model[0].portAvailableBW) {
      
        if(this.getMaxFlexInitial()<this.model[0].portAvailableBW)
        {
          
          this._utilizedByOtherServices = this.getPortCap() - this.getMaxFlexInitial();// this is set to get on slide color
          this._portAvailableBW = this.getMaxFlexInitial();
        }
        
        else {
          //this._utilizedByOtherServices
          this._portAvailableBW = _.toNumber(_.words(this.model[0].portAvailableBW)[0]);

        }
        
      }

      }
     
    } catch (e) {}
  }
  // ngDoCheck() {
  // //  if (this.schema.datasource) 
  // }
  private assignDefault() {
    this._bWidth = 0;
    this._scbWidth =0;
    this._contracted_bw = 0;
    this._initial_contracted_bw=0;
    this._flexPack = 1;
    this._portCapacity = 1;
    this._portAvailableBW =500;
    this._utilizedByOtherServices = 500;
  }

  private assignFromModel() {
    if (_.has(this.model[0], 'contractedBw') && this.model[0].contractedBw) {
      this._contracted_bw = this.dynamicPipe.bwToNumber(this.model[0].contractedBw);
      this._scbWidth = this.dynamicPipe.bwToNumber(this.model[0].contractedBw);
    }
    if (_.has(this.model[0], 'flex_capacity') && this.model[0].flex_capacity) {
      this._flexPack = _.toNumber(_.words(this.model[0].flex_capacity)[0]);
    }
    if (_.has(this.model[0], '_flex_capacity') && this.model[0]._flex_capacity) {
      this._initialFlexPack = _.toNumber(_.words(this.model[0]._flex_capacity)[0]);
    }
    if (_.has(this.model[0], 'portCapacity') && this.model[0].portCapacity) {
      this._portCapacity = _.toNumber(_.words(this.model[0].portCapacity)[0]);
    }
    if (_.has(this.model[0], 'utilizedByOtherServices') && this.model[0].utilizedByOtherServices) {
      this._utilizedByOtherServices = _.toNumber(_.words(this.model[0].utilizedByOtherServices)[0]);
    }
    // if (_.has(this.model[0], '_portAvailableBW') && this.model[0].portAvailableBW) {
    //   // if(this.getMaxFlex()>this.model[0].portAvailableBW)
    //   // this._portAvailableBW = this.getMaxFlex();
    //   // else
    //   this._portAvailableBW = _.toNumber(_.words(this.model[0].portAvailableBW)[0]);
    // }
    if (_.has(this.model[0], '_portAvailableBW') && this.model[0].portAvailableBW) {
      
      if(_.multiply(this._initial_contracted_bw, this._flexPack)<this.model[0].portAvailableBW)
      {
        let cap =  _.multiply(_.toNumber(_.words(this.model[0].portCapacity)[0]), 1000);
        let flexmax = this.getMaxFlex(); 

       // console.log("cap", cap, flexmax);

        
        this._utilizedByOtherServices = _.multiply(_.toNumber(_.words(this.model[0].portCapacity)[0]), 1000) - this.getMaxFlexInitial();// this is set to get on slide color
        this._portAvailableBW = this.getMaxFlexInitial();
      }
      
      else {
        //this._utilizedByOtherServices
        this._portAvailableBW = _.toNumber(_.words(this.model[0].portAvailableBW)[0]);

      }
      
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.logger.debug("changes in slider -> ", changes);
    //(typeof this.model !== 'undefined') ||
    if ( this.model == null ) {
      //dont do anything
      this.assignFromSchema();
     // console.log("CONTRACTED 1",this._contracted_bw );
      //this.updateMesasges(this._contracted_bw);
      // this.logger.debug("Refreshing slider now->", this._bWidth, this._contracted_bw, this._flexPack, this._portCapacity);
      this.manualRefresh.emit();

     }
    else {
      if (this.model[0] && this.model[0].contractedBw && changes.model && !changes.model.firstChange) 
      {
        //console.log("CONTRACTED 2.1",this._contracted_bw );
        this.assignFromModel();
      }
      
      else{
        this.assignFromSchema();
        //console.log("CONTRACTED 2.2",this._contracted_bw );
      } 
     
      //this.updateMesasges(this._contracted_bw);
      // this.logger.debug("Refreshing slider now->", this._bWidth, this._contracted_bw, this._flexPack, this._portCapacity);
      this.manualRefresh.emit();

    }
   
  }

  options: Options = {
    // stepsArray: this.getApplicableBandwidths(),
    stepsArray: this.bandwidthProfiles,
    showTicks: true,
    noSwitching: true,
    minLimit: this.getProfileIndex(this._bWidth), 
    // floor: this._contracted_bw,
    // showTicksValues: true,
    showSelectionBar: true,
    // showOuterSelectionBars: true,
    getSelectionBarColor: (value: number, highValue: number): string => {
      // if (highValue > this.getAvailableBw() && this.getPortCap()==10000) {
        if (highValue > this._portAvailableBW) {
        return "#c90b00"; //Red
      } else
      return "#00BEC9";
      //else

      // else if (highValue > this.getAvailableBw()) {
      //   return "#006280"; //Other services
      // }
      //return '#00BEC9'; // normal color
    },
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "";
        case LabelType.High:
          if (value == this._contracted_bw) {
            //return "<div class='info-box-grey'><span class='selected-bandwidth'>" + this.bandwidthProfiles[this.getProfileIndex(value)].label + "</span><br/><span class='flex-max'>Flex Max: " + this.getMaxInitialFlex() + "</span> </div>";
            return "<div class='info-box-grey'><span class='selected-bandwidth'>" + this.bandwidthProfiles[this.getProfileIndex(value)].label + "</span> </div>";
          }
        default:
          return '';
      }
    },
    getPointerColor: (value: number): string => {
      if (value > this._portAvailableBW) {
        return "#c90b00"; //Red
      } else
      return "#00BEC9";
      // if (value > this.getAvailableBw() && this.getPortCap()==10000) {
      //   return "#c90b00"; //Red
      // } else if (value > this.getAvailableBw()) {
      //   return "#006280"; //Other services
      // }
      // return '#00BEC9'; // normal color

    },
    ticksTooltip: (value: number): string => {
      return this.bandwidthProfiles[value].legendValue;
    }
  };

  // Events 
  onUserChange(changeContext: ChangeContext): void {
    // this.logger.debug("on user change ->", changeContext);
  }
  onUserChangeEnd(changeContext: ChangeContext): void {
     this.logger.debug("on user change end ->", changeContext);
     //console.log("changeContext", changeContext.highValue);
    let emitEvent = _.assign({}, changeContext);
    this.updateMesasges(changeContext.highValue);
    if (changeContext.highValue > this.getAvailableBw() && this.getPortCap() < 10000) {
     // emitEvent['upgradePort'] = "10G";
      emitEvent['upgradePort'] = "1G";
    }
    emitEvent.value = this.bandwidthProfiles[this.getProfileIndex(changeContext.highValue)].label;
    emitEvent['flexMax'] = this.bandwidthProfiles[this.getIndexForMaxBwidth()].label; //this.getMaxInitialFlex(); 
    this.bwChange.emit(emitEvent);
    this.changeOptions();
  }
  
  private updateMesasges(value) {
    //if(this._portAvailableBW)
    // if (_.multiply(this._flexPack, value) > this._portAvailableBW) {
      if (value > this._portAvailableBW) {
      this.infoMessages = [];
      this.infoMessages.push(FLEX_MAX_RESTRICTION);
      this.errorType = "warning";
    }
    // if (_.multiply(this._flexPack, value) > this.getAvailableBw()) {
    //   this.infoMessages = [];
    //   if (value > this.getAvailableBw()) {
    //     this.infoMessages.push(ERROR_MESSAGE);
    //     this.errorType = "close";
    //   } else if (this._portCapacity === 1) {
    //     this.infoMessages.push(FLEX_MAX_RESTRICTION);
    //     this.infoMessages.push(PORT_UPGRADE);
    //     this.errorType = "warning";
    //   } else {
    //     this.infoMessages.push(FLEX_MAX_RESTRICTION_10G);
    //     this.errorType = "warning";
    //   }
      
    // } 
    
    else {
      this.errorType = undefined;
      this.infoMessages = [];
    }
  }
  
  private changeOptions(): void {
    let newOptions = _.assign({}, this.options);
    newOptions.minLimit = this.getProfileIndex(this._bWidth); //this.getProfileIndex(this._bWidth);
    this.options = newOptions;
  }

  // Util Methods
  //Calculate port capacity
  private getPortCap(): number {
    return this._portCapacity * 1000;
  }
  //Calculate max bw available on port.
  private getAvailableBw(): number {
    return this.getPortCap() - this._utilizedByOtherServices;
  }
  //Calculate Flex Max without considering available bw or port capacity.
  private getMaxFlex(): number {
    return _.multiply(this._contracted_bw, this._flexPack);
  }

  private getMaxFlexInitial(): number {
    return _.multiply(this._initial_contracted_bw, this._flexPack);
  }

  private getMaxInitialFlex(): number {
    return _.multiply(this._scbWidth, this._flexPack);
  }
  
  // Calculate Flex Max conisdering Available BW
  getMaxAvailableFlex(): number {
    let maxFlex = this.getMaxFlex();
    let availableFlex;
    if (maxFlex > this.getAvailableBw()) {
      availableFlex = this.getAvailableBw();
    } else {
      availableFlex = maxFlex;
    }
    return availableFlex;
  }

  //Populate applicable bw in Steps Array for slider
  getApplicableBandwidths() {
    let applicableBW = [];
    _.forEach(this.bandwidthProfiles, (profile) => {
      if (profile.value >= this._bWidth && profile.value <= this.getIndexForNextAvailBWSlot(this.getMaxAvailableFlex())) {
        applicableBW.push(profile);
      }
    })
    return applicableBW;
  }

  getIndexForNextAvailBWSlot(value: number) {
    let maxBw = value;
    let maxBWInMap;
    _.forEach(this.bandwidthProfiles, (profile) => {
      if (profile.value >= maxBw) {
        maxBWInMap = profile.value;
        return false;
      }
    });
    let index = this.getProfileIndex(maxBWInMap);
    return index ? index : 0;
  }

  getIndexForPrevAvailBWSlot(value: number) {
    let index = this.getIndexForNextAvailBWSlot(value);
    return index>0 ? index - 1 : 0;
  }

  // Get profile index for bandwidth for Ceil of Slider
  getIndexForMaxBwidth(): number {
    let maxBw = this.getMaxAvailableFlex();
    let index = this.getProfileIndex(maxBw);
    if(index && index > 0) {
      return this.getIndexForNextAvailBWSlot(maxBw);
    } else {
      if(maxBw >= this.getAvailableBw()) {
        return this.getIndexForPrevAvailBWSlot(maxBw);
      } else {
        return this.getIndexForNextAvailBWSlot(maxBw);
      }
    }
  }

  getProfileIndex(value: number): number {
    let profileIndex;
    profileIndex = _.findIndex(this.bandwidthProfiles, (profile) => {
      return profile.value == value;
    });
    // if (!profileIndex) profileIndex = this.bandwidthProfiles.length - 1;
    return profileIndex;
  }
}
