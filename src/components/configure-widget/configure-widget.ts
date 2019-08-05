import {
  Component,
  Output,
  EventEmitter,
  Input,
  SimpleChanges
} from '@angular/core';
import {
  InputControlWidget
} from "../control-widget";
import {
  ShowHideChild
} from "../../providers/show-hide-child/show-hide-child";
import {
  DynamicService
} from '../../providers/dynamic-service/dynamic-service';
import * as _ from 'lodash';
import { NGXLogger } from 'ngx-logger';
import { checkAndUpdateTextDynamic } from '@angular/core/src/view/text';

const MESH_KEYWORD = "Mesh";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";

@Component({
  selector: 'configure-widget',
  templateUrl: 'configure-widget.html'
})
export class ConfigureWidget extends InputControlWidget {
  data: any;
  @Input() getFlexStatus: string;
  @Output() getFlexStatusChange = new EventEmitter<string>();
  @Output() getDynamicdata = new EventEmitter();
  bwchangeData: number = 0;
  contractedBW: number = 100;
  totalAend: number = 750;
  installChargeAend: number = 0;
  installChargeBend: number = 0;
  complexChargeAend: number = 0;
  complexChargeBend: number = 0;
  costChange: boolean = false;
  modelcontractedBW: number = 0;
  isLoading: boolean = true;
  //changeType: { change: 'permanent'}

  addressEnds: any = [];
  networkType: string = '';
  tempdata: any;

  isProactiveMonitoring: boolean = false;
  constructor(
    public permdataService: DynamicService,
    public sibling: ShowHideChild,
    private logger: NGXLogger
  ) {
    super();
    this.tempdata = this.permdataService.getOption();
   
    //  let dat: any;
    //  if (this.schema.getParent().getValue("configure")) {
    //   dat = this.schema.getParent().getValue("configure");
    //   //this.is_valid = true;
    // }
    // var parent = this.schema.getParent();
    // dat = this.parent.getValue("configure");


    if (this.tempdata.hasOwnProperty("datasource") == true ) {
      this.schema.datasource = this.tempdata.datasource;
      this.isLoading = false;
  
      if (this.schema.datasource[0].selectedProduct.properties.topology == MESH_KEYWORD) {
        this.networkType = "Mesh";
      } else {
        this.networkType = "P2P";
      }

      this.checkNTU(this.schema.datasource[0].selectedProduct);

  
  
  
  
    }
    else {
     // this.sibling.updateSibling(parent.fieldsets[0].fields[2]);

      setInterval(() => {
        if (this.isLoading) {
          if (this.schema.datasource && this.schema.datasource[0]) {
            this.logger.debug("Loading properites of model", this.schema.datasource);
            console.log("PERM SCHEMA",this.schema);
          
            //Below code block will be used once real data flows happen
            if(this.schema.datasource[0].isActive=== "true") {
              let tempdata: any = this.permdataService.getOption();
              if (tempdata.hasOwnProperty("PermBWIsSubmitted") == false)
              this.permdataService.setOption('PermBWIsSubmitted', true);
              let parent = this.schema.getParent();
             
              this.sibling.updateSibling(parent.fieldsets[0].fields[2]);
             }
            

            let selectedProduct = this.schema.datasource[0].selectedProduct;
            let newModel = [];
            _.forEach(this.schema.datasource[0].model, model => {
              if (!model.portCapacity) {
                if (selectedProduct.properties.service.properties.port)
                  model.portCapacity = selectedProduct.properties.service.properties.port;
                else model.portCapacity = "1 Gbps";
                if (!model.contractedBw) {
                  if (selectedProduct.properties.service.properties.bandwidth)
                    model.contractedBw = selectedProduct.properties.service.properties.bandwidth;
                }
              }
              let newObj = {};
              _.forIn(model, (value, key) => {
  
                newObj['_' + key] = value;
              });
              newModel.push(newObj);
            });
            this.schema.datasource[0].model = _.merge(newModel, this.schema.datasource[0].model);
            this.logger.debug("PermModel after merging ->", this.schema.datasource[0].model)
            this.isLoading = false;
  
  
            if (this.schema.datasource[0].selectedProduct.properties.topology == MESH_KEYWORD) {
              this.networkType = "Mesh";
            } else {
              this.networkType = "P2P";
            }
            this.checkNTU(this.schema.datasource[0].selectedProduct);
  
  
          }
        }
      }, 1);
  
    }
   


  }

// this.parent = this.schema.getParent();
ngOnInit() {
  super.ngOnInit();
  this.parent = this.schema.getParent();
  //this.sibling.updateSibling(parent.fieldsets[0].fields[2]);

  this.setDefaultModel();
//   setInterval(() => {


//  let data = { data: 'configure' }
//   this.parent.setValue("configure", data);

//  }, 5000);





  //if(this.isLoading == false) {
    
  //}

}


  ngAfterViewInit() {
    //this.setDefaultModel();
    this.logger.debug("PB Schema Configure widget ->", this.schema);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.model && this.schema.datasource && this.schema.datasource[0]) {
      this.isLoading = false;

    }


  }


  checkNTU(product) {
    let count =0;
    _.forEach(product.properties.service.reference, ref => {
      if(ref.type==='resource' && ref.subtype==='ce') {
        count = count + 1;
      }
    });

    if(count>0)
    this.isProactiveMonitoring = true;
  }

  getSliderChange(event) {
    this.bwchangeData = event.highValue;
    if (_.has(this.schema, 'datasource') && _.has(this.schema.datasource[0], 'model')) {
      let newModel = [];
      let ds = {};
      let newObject = {
        'contractedBw': event.value,
        'flexMax': event.flexMax
      };
      if (event.upgradePort) newObject['portCapacity'] = event.upgradePort;

      _.assign(ds, this.schema.datasource[0].model[0], newObject);
      newModel.push(ds);
      // this.schema.datasource[0].model[0] = ds;

      if (this.networkType == "P2P") {
        let ds2 = {}; _.assign(ds2, this.schema.datasource[0].model[1], newObject);
        // this.schema.datasource[0].model[1] = ds2;
        newModel.push(ds2);
      }
      this.schema.datasource[0].model = newModel;
    }
    this.getCostCalculation(this.bwchangeData);
  }
  getPortChange(event) {
    this.logger.debug("model object updated", event);
    if(event.column==="flex_capacity" && this.addressEnds.networkType ==="P2P") // to add condition that flex pack should be same for both in Mesh
    {
      this.assignSameFlexPack(event);
    }
   
   

    this.updateModel(event.model);
    this.setAddressPoint(event.column);
  }
  assignSameFlexPack(event: any){

  }

  updateModel(model) {
    let ds = [];
    _.assign(ds, model);
    this.schema.datasource[0].model = ds;
  }

  setAddressPoint(column: any) {

    let tempdata: any = this.permdataService.getOption();
    if (typeof column !== 'undefined') {


      if (tempdata.addressON === "none") {
        if(this.hasChanged(column))
            this.permdataService.setOption('addressON', column);
      } else if ( tempdata.addressON !== "speed") {

        switch(column) {
          case "portCapacity":
            if(this.hasChanged(column))
            this.permdataService.setOption('addressON', column);
            break;
          case "flex_capacity":
            if(!this.hasChanged("portCapacity") && this.hasChanged(column))
            this.permdataService.setOption('addressON', column);
            break;
          case "gradeOfService":        
            if(tempdata.addressON !== "portCapacity" && tempdata.addressON !== "flex_capacity" && tempdata.addressON !== "vlan" && this.hasChanged(column) )
            this.permdataService.setOption('addressON', column);
            break;
          case "serviceLevel":
            if(tempdata.addressON !== "portCapacity" && tempdata.addressON !== "flex_capacity" && tempdata.addressON !== "vlan" && tempdata.addressON !== "gradeOfService" && this.hasChanged(column)  )
            this.permdataService.setOption('addressON', column);
            break;
          default:
            console.log("no change in components");   
            
        }

      }

      // if (tempdata.addressON === "none" && tempdata.addressON !== "speed") {

       

      
      // }





    }



  }

  hasChanged(column: any) {
    if(column=== "portCapacity") { 
      if( this.schema.datasource[0].model[0].portCapacity === this.schema.datasource[0].model[0]._portCapacity && this.schema.datasource[0].model[1].portCapacity === this.schema.datasource[0].model[1]._portCapacity )
         return false;
    }
    if(column==="flexCapacity") {
      if( this.schema.datasource[0].model[0].flex_capacity === this.schema.datasource[0].model[0]._flex_capacity && this.schema.datasource[0].model[1].flex_capacity === this.schema.datasource[0].model[1]._flex_capacity ) 
         return false;
    }
    if(column==="gradeOfService") {
      if( this.schema.datasource[0].model[0].gradeOfService === this.schema.datasource[0].model[0]._gradeOfService && this.schema.datasource[0].model[1].gradeOfService === this.schema.datasource[0].model[1]._gradeOfService ) 
      return false;
    }
    if(column==="serviceLevel") {
      if( this.schema.datasource[0].model[0].serviceLevel === this.schema.datasource[0].model[0]._serviceLevel && this.schema.datasource[0].model[1].serviceLevel === this.schema.datasource[0].model[1]._serviceLevel ) 
      return false;
    }



    return true;
  }



  getPortDetails(event) {
    if (event.port == 'A' && event.capacity == '10 Gbps') {
      this.installChargeAend = 3000;

      this.updateServiceModel();
      this.getTotalCost();

    } else if (event.port == 'A' && event.capacity == '1 Gbps') {
      this.installChargeAend = 0;
      this.complexChargeAend = 0;
      this.updateServiceModel();
      this.getTotalCost();
    }
    if (event.port == 'A') {
      let ds = {};
      _.assign(ds, this.schema.datasource[0].model[0], { 'portCapacity': event.capacity });
      this.schema.datasource[0].model[0] = ds;
    }
    if (event.port == 'B' && event.capacity == '10 Gbps') {
      this.installChargeBend = 3000;
      this.updateServiceModel();
      this.getTotalCost();
    } else if (event.port == 'B' && event.capacity == '1 Gbps') {
      this.installChargeBend = 0;
      this.complexChargeBend = 0;
      this.updateServiceModel();
      this.getTotalCost();
    }

  }

  updateServiceModel() {
    let tempdata: any = this.permdataService.getOption();
    this.permdataService.setOption('installChargeAend', this.installChargeAend);
    this.permdataService.setOption('installChargeBend', this.installChargeBend);
    this.permdataService.setOption('complexChargeAend', this.complexChargeAend);
    this.permdataService.setOption('complexChargeBend', this.complexChargeBend);
    this.permdataService.setOption('totalAend', this.totalAend);
    this.permdataService.setOption('changeBW', this.bwchangeData);
    this.modelcontractedBW = this.getContractedBWNumeric();
    if (this.bwchangeData == 0 || this.bwchangeData <= this.modelcontractedBW) {

      this.permdataService.setOption('addressON', "port");
    } else {
      this.permdataService.setOption('addressON', "speed");

    }



    // 6 jan 2019
    //hard coded data will be replaced by default model values below
    if (this.bwchangeData <= this.modelcontractedBW) {

      this.permdataService.setOption('costChange', false);

      if (typeof tempdata.portCapacityAend === 'undefined' && typeof tempdata.portCapacityBend === 'undefined') {
        this.permdataService.setOption('costChange', false);
      } else if (tempdata.portCapacityAend == "1 Gbps" && tempdata.portCapacityBend == "1 Gbps") {
        this.permdataService.setOption('costChange', false);

      } else if (tempdata.portCapacityAend == "1 Gbps" && tempdata.portCapacityBend !== "1 Gbps") {
        this.permdataService.setOption('costChange', true);

      } else if (tempdata.portCapacityAend !== "1 Gbps" && tempdata.portCapacityBend == "1 Gbps") {
        this.permdataService.setOption('costChange', true);

      } else {
        this.permdataService.setOption('costChange', true);
      }

    } else {
      this.permdataService.setOption('costChange', true);
    }

    this.getDynamicdata.emit(this.permdataService);
    // this.data = this.permdataService;

  }

  getServiceChange(event) {

  }


  getCostCalculation(changeBW: number) {
    if (changeBW < 100) {
      this.totalAend = 750;
    } else {
      this.totalAend = 750 + (changeBW - 100) * 1.6
    }

    this.updateServiceModel();
  }

  getTotalCost() {

  }

  setDefaultModel() {
    let tempdata: any = this.permdataService.getOption();
    if (tempdata.hasOwnProperty("addressON") == false)
      this.permdataService.setOption('addressON', "none");
      this.createAddressArray();


    this.permdataService.setOption('costChange', this.costChange);
    if (tempdata.hasOwnProperty("installChargeBend"))
      this.installChargeBend = tempdata.installChargeBend;
    if (tempdata.hasOwnProperty("installChargeAend"))
      this.installChargeAend = tempdata.installChargeAend;

    this.addressEnds.push(this.schema.settings.serviceLevel.columns[0].value);
    this.addressEnds.push(this.schema.settings.serviceLevel.columns[1].value);

  }

  createAddressArray(){

  }




  getContractedBWNumeric(): number {
    let contractedBW: number = 0;
    let tempChangeBW: string = "";
    let modelinitialChangeBW: string = "";

    let value =this.schema.datasource[0].selectedProduct.properties.service.properties.bandwidth;

    let bwArray = _.words(value);
    if (bwArray[1].toUpperCase().startsWith('M')){
      contractedBW = _.toNumber(bwArray[0]);
    } else {
      contractedBW = _.multiply(1000, _.toNumber(bwArray[0]));
    }


  //  modelinitialChangeBW = "8";
    // modelinitialChangeBW = this.schema.datasource[0].properties.bandwidth;
    //tempChangeBW = modelinitialChangeBW.replace("Mbps", "");
   // contractedBW = parseInt(tempChangeBW);
    return contractedBW;
  }


  getTemplate() {
    let template;
    if (this.schema.getTemplateforSummary)
      this.schema.getTemplateforSummary(data => {
        template = data;
      });
    return template || "";

  }
  getTemplateSpeedChange() {
    let template;
    if (this.schema.getTemplateforSpeedChange)
      this.schema.getTemplateforSpeedChange(data => {
        template = data;
      });
    return template || "";
  }

  tempContactSchema: any = [{

  },{
    
  }

  ];


  tempSchemaForActionCheckbox: any = [{
    checkbox: {
      styles: "iris-blue-checkbox",
      type: "permanent"
    },
    label: {
      styles: "grey-label",
      text: "Current contracted speed"
    }
  },
  {
    checkbox: {
      styles: "cyan-checkbox",
      type: "permanent"
    },
    label: {
      styles: "cyan-label underline",
      text: "Other services on this port."
    },
    actions: {
      click: "popupModal"
    }
  }
  ]

  inputModelStub = {
    gradeOfService: {
      aEnd: "basic",
      bEnd: "basic"
    },
    serviceLevel: {
      aEnd: "Standard",
      bEnd: "Standard"
    }
  }

  
}
