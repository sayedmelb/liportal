import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { InputControlWidget } from '../control-widget';
import { ShowHideChild } from '../../providers/show-hide-child/show-hide-child';
import { DynamicService } from '../../providers/dynamic-service/dynamic-service';
import * as _ from 'lodash';
import { ParseTreeResult } from '@angular/compiler';
import { NGXLogger } from "ngx-logger";

const MESH_KEYWORD = "Mesh";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";


@Component({
  selector: 'review-widget',
  templateUrl: 'review-widget.html'
})

export class ReviewWidget extends InputControlWidget {

  @Input() getFlexStatus: string;
  @Output() getFlexStatusChange = new EventEmitter<string>();
  @Output() getFlexStatusChange2 = new EventEmitter<string>();
  public data;
  public dataDynamic;
  tnc: boolean = false;
  isValid: boolean = true;
  isSaveLatter: boolean = false;
  model: any;
  grade: any = { service: 'gradeOfService' };
  sla: any = { service: 'serviceLevel' }
  networkType: string = '';

  addressAend: string = "";
  addressBend: string = "";

  addressObj: any = [{
    component: {
      name: "speed",
      rank: 1,
      state: true
    }
  },
  {
    component: {
      name: "portCapacity",
      rank: 2,
      state: false
    }
  },
  {
    component: {
      name: "flex-capacity",
      rank: 3,
      state: false
    }
  },
  {
    component: {
      name: "gradeOfService",
      rank: 4,
      state: false
    }
  },
  {
    component: {
      name: "serviceLevel",
      rank: 5,
      state: false
    }
  },
  {
    component: {
      name: "vlan",
      rank: 6,
      state: false
    }
  },
  {
    component: {
      name: "proactiveMonitoring",
      rank: 7,
      state: false
    }
  },
  {
    component: {
      name: "qos",
      rank: 8,
      state: false
    }
  }
  ]
  showAddressTable: any = [];
  public dataService: DynamicService;

  constructor(public _dataService: DynamicService, public viewCtrl: ViewController, public sibling: ShowHideChild, private logger: NGXLogger) {
    super();
    this.dataService = _dataService;
    this.data = _dataService.getOption();
    // this.generateShowAddressTable();
  }

  ngOnInit() {
    super.ngOnInit();
    this.parent = this.schema.getParent();
    //this.dataDynamic = this.parent.getValue("configure");
    this.schema.datasource = this.data.datasource; //this.schema.getParent().datasource; 
    this.schema.data = this.data;

    this.setNetworkType();
    console.log("review NW", this.networkType);
    console.log("REVIEW -datasource", this.schema.datasource);
    console.log("REVIEW data", this.data);
  //  this._dataService.setOption('addressObj', this.addressObj);

  }

  // generateShowAddressTable() {
  //   let tempObj = this.addressObj;
  //   tempObj.componentName="speed";
  //   tempObj.state= true; 
  //   this.showAddressTable.push();
  //   let xt = this.showAddressTable;
  // }

  setNetworkType() {

    if (this.schema.datasource[0].selectedProduct.properties.topology == MESH_KEYWORD) {
      this.networkType = "Mesh";
    } else {
      this.networkType = "P2P";
    }

  }

  hasChanged(schema, id) {
    let model = this.dataService.getOption()[id];
    let hasChanged = false;
    schema.columns.forEach(col => {
      if (model[col.id] != model['_' + col.id]) {
        hasChanged = true;

      }
    });
    return hasChanged;
  }

  updateAddressTable(comName: string, rank: number, setVal: boolean) {

    let tempObj = this.addressObj;
    let i: number;
    let tempState = false;
    if(setVal) {
      for (i = 0; i < rank - 1; i++) {
        if (tempObj[i].component.state == true) {
          tempState = true;
          break;
        } 
  
      }
      if (tempState == false) {
        this,this.addressObj[rank-1].component.state=true;
      }
  
    } else {
      _.forEach(this.addressObj, comp => {
       
        if(comp.component.name==comName)
           comp.component.state=false;
      });
    }

    
    let xt = this.addressObj;
    this._dataService.setOption('addressObj', this.addressObj);


  }
  checkNoChange(elem: any) {
    if (elem === 'speed-summary') {

      if (this.schema.datasource[0].model[0].contractedBw === null || (this.schema.datasource[0].model[0].contractedBw === this.schema.datasource[0].model[0]._contractedBw)) {
        this.updateAddressTable("speed", 1, false);
        return false;
      } else {
        this.updateAddressTable("speed", 1, true);
        return true;
      }

    }

    if(this.networkType==="Mesh") {


      if (elem === 'review-port-capacity') {
      
     
      
        if (this.schema.datasource[0].model[0].portCapacity === this.schema.datasource[0].model[0]._portCapacity ) {
          this.updateAddressTable("portCapacity",2, false);
          return false; // no change
        } else {
          this.updateAddressTable("portCapacity",2, true);
  
          return true;
        }
  
      }
  
  
      if (elem === 'review-flex-capacity') {
        if (this.schema.datasource[0].model[0].flex_capacity === this.schema.datasource[0].selectedProduct.properties.flex_pack ) {
          this.updateAddressTable("flex-capacity", 3, false);
          return false;
        }
        else {
          this.updateAddressTable("flex-capacity", 3, true);
  
          return true;
        }
      }
  
      // if (elem === 'grade-of-service') {
      //   if (this.schema.datasource[0].model[0].gradeOfService === this.schema.datasource[0].model[0]._gradeOfService) {
      //     this.updateAddressTable("gradeOfService", 4, false);
      //     return false;
      //   }
      //   else {
      //     this.updateAddressTable("gradeOfService", 4, true);
  
      //     return true;
      //   }
      // }
  
      if (elem === 'service-level') {
        // if (this.schema.datasource[0].model[0].serviceLevel === this.schema.datasource[0].model[0]._serviceLevel && this.schema.datasource[0].model[0].serviceLevel === null && this.schema.datasource[0].model[0]._serviceLevel === null) 
        if (this.schema.datasource[0].model[0].serviceLevel === this.schema.datasource[0].model[0]._serviceLevel) 
        {
          this.updateAddressTable("serviceLevel", 5, false);
          return false;
        }
        else {
          this.updateAddressTable("serviceLevel", 5, true);
          return true;
        }
      }
  
      if (elem === 'review-vlan') {
        if (this.schema.datasource[0].model[0].vlan === this.schema.datasource[0].model[0]._vlan) {
          this.updateAddressTable("vlan", 6, false);
          return false;
        }
        else {
          this.updateAddressTable("vlan", 6, true);
          return true;
        }
      }
      if (elem === 'review-proactive-monitoring') {
        if (this.schema.datasource[0].model[0].proactiveMonitoring === this.schema.datasource[0].model[0]._proactiveMonitoring ) {
          this.updateAddressTable("proactiveMonitoring", 7, false);
          return false;
        }
        else {
          this.updateAddressTable("proactiveMonitoring", 7, true);
          return true;
        }
      }
  
      if (elem === 'review-qos') {
        if (this.schema.datasource[0].model[0].qos.status === this.schema.datasource[0].model[0]._qos.status) {
          this.updateAddressTable("qos", 8, false);
          return false;
        }
        else {
          this.updateAddressTable("qos", 8, true);
          return true;
        }
      }


    } else {

      if (elem === 'review-port-capacity') {
      
     
      
        if (this.schema.datasource[0].model[0].portCapacity === this.schema.datasource[0].model[0]._portCapacity && this.schema.datasource[0].model[1].portCapacity == this.schema.datasource[0].model[1]._portCapacity) {
          this.updateAddressTable("portCapacity",2, false);
          return false; // no change
        } else {
          this.updateAddressTable("portCapacity",2, true);
  
          return true;
        }
  
      }
  
  
      if (elem === 'review-flex-capacity') {
        if (this.schema.datasource[0].model[0].flex_capacity === this.schema.datasource[0].selectedProduct.properties.flex_pack && this.schema.datasource[0].model[1].flex_capacity === this.schema.datasource[0].otherEnds[0].properties.flex_pack) {
          this.updateAddressTable("flex-capacity", 3, false);
          return false;
        }
        else {
          this.updateAddressTable("flex-capacity", 3, true);
  
          return true;
        }
      }
  
      if (elem === 'grade-of-service') {
        if (this.schema.datasource[0].model[0].gradeOfService === this.schema.datasource[0].model[0]._gradeOfService && this.schema.datasource[0].model[1].gradeOfService === this.schema.datasource[0].model[1]._gradeOfService) {
          this.updateAddressTable("gradeOfService", 4, false);
          return false;
        }
        else {
          this.updateAddressTable("gradeOfService", 4, true);
  
          return true;
        }
      }
  
      if (elem === 'service-level') {
        // if (this.schema.datasource[0].model[0].serviceLevel === this.schema.datasource[0].model[0]._serviceLevel && this.schema.datasource[0].model[1].serviceLevel === this.schema.datasource[0].model[1]._serviceLevel && this.schema.datasource[0].model[0].serviceLevel === null && this.schema.datasource[0].model[0]._serviceLevel === null) 
        if (this.schema.datasource[0].model[0].serviceLevel === this.schema.datasource[0].model[0]._serviceLevel && this.schema.datasource[0].model[1].serviceLevel === this.schema.datasource[0].model[1]._serviceLevel) 
        {
          this.updateAddressTable("serviceLevel", 5, false);
          return false;
        }
        else {
          this.updateAddressTable("serviceLevel", 5, true);
          return true;
        }
      }
  
      if (elem === 'review-vlan') {
        if (this.schema.datasource[0].model[0].vlan === this.schema.datasource[0].model[0]._vlan && this.schema.datasource[0].model[1].vlan === this.schema.datasource[0].model[1]._vlan) {
          this.updateAddressTable("vlan", 6, false);
          return false;
        }
        else {
          this.updateAddressTable("vlan", 6, true);
          return true;
        }
      }
      if (elem === 'review-proactive-monitoring') {
        if (this.schema.datasource[0].model[0].proactiveMonitoring === this.schema.datasource[0].model[0]._proactiveMonitoring && this.schema.datasource[0].model[1].proactiveMonitoring === this.schema.datasource[0].model[1]._proactiveMonitoring) {
          this.updateAddressTable("proactiveMonitoring", 7, false);
          return false;
        }
        else {
          this.updateAddressTable("proactiveMonitoring", 7, true);
          return true;
        }
      }
  
      

    }

    




  }



  getTotalInstalledCharges() {
    var total: number = 0;
    if (this.data.installChargeAend)
      total = total + this.data.installChargeAend + this.data.complexChargeAend
    if (this.data.installChargeBend)
      total = total + this.data.installChargeBend + this.data.complexChargeBend

    return total;
  }

  getTemplate() {
    let template;
    if (this.schema.getTemplateforSummaryReview)
      this.schema.getTemplateforSummaryReview(data => {
        template = data;
      });
    return template || "";
    // return "Hello Fromm Get Template"
  }

  goToPrevious() {
    let data = { data: 'review' }
    if (this.isValid) {

      var parent = this.schema.getParent();
      //this.formProperty.setValue(data, false);
      parent.setValue("configure", data);
      this.sibling.updateSibling(parent.fieldsets[0].fields[0]);
    }

  }

  goToNext() {
    if (this.isValid) {
      //if (this.schema.onSubmit) this.schema.onSubmit();
    // if (this.schema.onConfirmSubmit) this.schema.onConfirmSubmit();
      var parent = this.schema.getParent();
      this.sibling.updateSibling(parent.fieldsets[0].fields[2]);
    }
  }

  openTnC() {
    if (this.tnc) {
      this.tnc = false;
    } else {
      this.tnc = true;
    }
  }



  closeModel() {
    this.setdefault();
    this.viewCtrl.dismiss();
  }

  setdefault() {

    if (this.data.hasOwnProperty("changeBW")) {
      this.data.changeBW = null;
      delete this.data['changeBW'];
    }

    if (this.data.hasOwnProperty("totalAend")) {
      // this.dynamicdata.totalAend = 750;  
      delete this.data['totalAend'];
    }

    if (this.data.hasOwnProperty("portCapacityAend")) {
      this.data.portCapacityAend = null;
      delete this.data['portCapacityAend'];
    }

    if (this.data.hasOwnProperty("portCapacityBend"))
      delete this.data['portCapacityBend'];
    // this.dynamicdata.portCapacityBend = null;
    if (this.data.hasOwnProperty("flexCapacityAend"))
      delete this.data['flexCapacityAend'];
    //this.dynamicdata.flexCapacityAend = null;
    if (this.data.hasOwnProperty("flexCapacityBend"))
      delete this.data['flexCapacityBend'];
    // this.dynamicdata.flexCapacityBend = null;
    if (this.data.hasOwnProperty("vlanA"))
      delete this.data['vlanA'];
    if (this.data.hasOwnProperty("vlanB"))
      delete this.data['vlanB'];
    if (this.data.hasOwnProperty("datasource")) {
      //        this.dynamicdata.datasource = null;  
      delete this.data['datasource'];
    }
    if (this.data.hasOwnProperty("addressON")) {
      this.data.addressON = null;
      delete this.data['addressON'];
    }

    // if (this.data.hasOwnProperty("portCapacityAend"))
    //   this.data.portCapacityAend = null;
    // if (this.data.hasOwnProperty("portCapacityBend"))
    //   this.data.portCapacityBend = null;
    // if (this.data.hasOwnProperty("flexCapacityAend"))
    //   this.data.flexCapacityAend = null;
    // if (this.data.hasOwnProperty("flexCapacityBend"))
    //   this.data.flexCapacityBend = null;
    // if (this.data.hasOwnProperty("vlanA"))
    //   this.data.vlanA = null;
    // if (this.data.hasOwnProperty("vlanB"))
    //   this.data.vlanB = null;

  }
  
  termsAndConditions = [
    {
      id: "tnc1",
      label: {
        text: "These changes will apply until the end of the Committed Term for the affected Individual Service"
      },
      options: {
        "style.checkbox.class": "default"
      },
      isChecked: false,
      required: true
    },
    {
      id: "tnc2",
      label: {
        text: "You confirm the changes & accept the charges above"
      },
      options: {
        "style.checkbox.class": "default"
      },
      isChecked: false,
      required: true
    },
    {
      id: "tnc3",
      label: {
        text: "I understand that if submitting the above speed changes that all Dynamic and Scheduled Flex Speed settings will be disabled and deleted for these services. You can reconfigure the Dynamic and Scheduled Flex Speed once the Permanent speed changes have occurred."
      },
      options: {
        "style.checkbox.class": "default"
      },
      isChecked: false,
      required: true
    }
  ];
  getSchemaForTnC() {
    return this.termsAndConditions;
  }

  isSubmitDisabled() {
    let disabled = false;
    _.forEach(this.termsAndConditions, (tnc) => {
      if (!tnc.isChecked) {
        disabled = true;
        return 0;
      }
    })
    return disabled;
  }
}