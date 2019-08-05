import { Component } from '@angular/core';
import { ShowHideChild } from '../../providers/show-hide-child/show-hide-child'
import { InputControlWidget } from '../control-widget';
import { ViewController } from "ionic-angular";
import {
  DynamicService
} from '../../providers/dynamic-service/dynamic-service';


@Component({
  selector: 'ondemand-container',
  templateUrl: 'ondemand-container.html'
})
export class OndemandContainer extends InputControlWidget {

  public flexState: string;
  public dynamicdata: any;
  private propertiesBehaviour:any={};

  constructor(public sibling: ShowHideChild, public permdataService: DynamicService,  public viewCtrl: ViewController) {
    super();
    this.dynamicdata = permdataService.getOption();
    this.sibling.getSibling.subscribe(sib => {
      this.flexState = sib;
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.sibling.updateSibling(this.schema.fieldsets[0].fields[0]);
    if (this.schema.onLoad) this.schema.onLoad();
		this.formProperty.schema.fieldsets.forEach ((fieldset) => {
			fieldset.fields.forEach ((propertyId) => {
				this.propertiesBehaviour[propertyId] = this.formProperty.schema.getBehaviour(propertyId);
			})
		})
  }

  closeModel() {
    this.setdefault();
    var parent = this.schema.getParent();

    let data = { data: 'configure' }
    parent.setValue("configure", data);
  
    this.viewCtrl.dismiss();
  }

  
  setdefault() {


    if (this.dynamicdata.hasOwnProperty("ScheduleBWIsSubmitted")) {
      this.dynamicdata.ScheduleBWIsSubmitted = null;
      delete this.dynamicdata['ScheduleBWIsSubmitted'];
    }
    if (this.dynamicdata.hasOwnProperty("BrowserNotClosedByUser")) {
      this.dynamicdata.BrowserNotClosedByUser = null;
      delete this.dynamicdata['BrowserNotClosedByUser'];
    }

    if (this.dynamicdata.hasOwnProperty("changeBW"))
    {
      this.dynamicdata.changeBW = null;  
    delete this.dynamicdata['changeBW'];
    }
     
    if (this.dynamicdata.hasOwnProperty("totalAend"))
    {
     // this.dynamicdata.totalAend = 750;  
    delete this.dynamicdata['totalAend'];
    }
     
    if (this.dynamicdata.hasOwnProperty("portCapacityAend"))
    {
      this.dynamicdata.portCapacityAend = null;
      delete this.dynamicdata['portCapacityAend'];
    }
      
    if (this.dynamicdata.hasOwnProperty("portCapacityBend"))
    delete this.dynamicdata['portCapacityBend'];
     // this.dynamicdata.portCapacityBend = null;
    if (this.dynamicdata.hasOwnProperty("flexCapacityAend"))
    delete this.dynamicdata['flexCapacityAend'];
      //this.dynamicdata.flexCapacityAend = null;
    if (this.dynamicdata.hasOwnProperty("flexCapacityBend"))
    delete this.dynamicdata['flexCapacityBend'];
     // this.dynamicdata.flexCapacityBend = null;
    if (this.dynamicdata.hasOwnProperty("vlanA"))
      delete this.dynamicdata['vlanA'];
    if (this.dynamicdata.hasOwnProperty("vlanB"))
      delete this.dynamicdata['vlanB'];
      if (this.dynamicdata.hasOwnProperty("datasource"))
      {
//        this.dynamicdata.datasource = null;  
      delete this.dynamicdata['datasource'];
      }
      if (this.dynamicdata.hasOwnProperty("addressON"))
      {
        this.dynamicdata.addressON = null;  
      delete this.dynamicdata['addressON'];
      }
      
      

  }

}