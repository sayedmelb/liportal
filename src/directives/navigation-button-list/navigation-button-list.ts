import { Component, Input } from "@angular/core";
import { ShowHideChild } from '../../providers/show-hide-child/show-hide-child';
import { ViewController } from "ionic-angular";
import {
  DynamicService
} from '../../providers/dynamic-service/dynamic-service';
import * as _ from 'lodash';


@Component({
  selector: "navigation-button-list",
  templateUrl: "navigation-button-list.html"
})

export class NavigationButtonList {
  @Input("schema") schema: any;
  isValid: boolean = false;
  public data: any;
  public dynamicdata: any;


  constructor(public sibling: ShowHideChild, public viewCtrl: ViewController, public permdataService: DynamicService) {

    this.dynamicdata = permdataService.getOption();
  }

  ngOnInit() {
    this.isValid = true;




  }


  setnextLevel(e) {

    var parent = this.schema.getParent();
    parent.properties.configure.behaviour.show = false;
    parent.properties.review.behaviour.show = true;


    //this.updateRecurrencetoLowercase();
    //this.prexfixTimewithLeadingZero();
    this.permdataService.setOption('datasource', this.schema.datasource);
    if (this.schema.datasource && this.schema.datasource[0].flextype == 'schedule') {
      let rec = this.schema.datasource[0].model[0].recurrence_type;
      if (rec == 'Once' && this.schema.datasource[0].model[0].contractedBw == this.schema.datasource[0].model[0]._contractedBw) {
        alert("no change in configuration, change bandwidth in slider");
      } else if (rec !== 'Once' && !this.schema.datasource[0].model[0].end_date) {
        alert("no change in configuration, Update End date");
      } else if (this.schema.datasource[0].model[0].contractedBw == this.schema.datasource[0].model[0]._contractedBw) {
        alert("no change in configuration, change bandwidth in slider");

      } else if (!this.schema.datasource[0].model[0].end_time) {
        alert("Please specify end time");

      }

      else {
        //first make recurrance_lower
        //this.updateRecurrencetoLowercase();
        //then assign update before submit
        this.permdataService.setOption('datasource', this.schema.datasource);
        this.sibling.updateSibling(parent.fieldsets[0].fields[1]);
      }

      // if (!this.schema.datasource[0].model[0].end_date)
      //   alert("no change in configuration, select time and change slider");
      // else

    } else //perm
    {
      if (this.dynamicdata.addressON === "none") {
        alert("no change in configuration");// we have to use a model dialog here
      } else
        this.sibling.updateSibling(parent.fieldsets[0].fields[1]);

    }

    // parent.setValue("configure", this.data);

    // let data = { data: 'configure' }
    // parent.setValue("configure", data);




  }

  // updateRecurrencetoLowercase() {

  //   _.forEach(this.schema.datasource[0].model, model => {
  //     _.forIn(model, (value, key) => {

  //       if (key == 'recurrence_type')
  //         model.recurrence_type = model.recurrence_type.toLocaleLowerCase();
  //     });
  //   });
  // }

  // prexfixTimewithLeadingZero() {
  //   _.forEach(this.schema.datasource[0].model, model => {
  //     _.forIn(model, (value, key) => {

  //       if (key == 'start_time') {
  //         let arystart_time = _.words(model.start_time);
  //         console.log("arystart_time", arystart_time);
  //         if (arystart_time[0].length < 2) {
  //           arystart_time[0] = "0" + arystart_time[0];


  //         }
  //         if (arystart_time[1].length < 2) {
  //           arystart_time[1] = "0" + arystart_time[1];
  //         }
  //         model.start_time = arystart_time[0] + ":" + arystart_time[1] + " " + arystart_time[2];


  //       }
  //       if (key == 'end_time') {
  //         let aryend_time = _.words(model.end_time);
  //         console.log("aryend_time", aryend_time);
  //         if (aryend_time[0].length < 2) {
  //           aryend_time[0] = "0" + aryend_time[0];

  //         }
  //         if (aryend_time[1].length < 2) {
  //           aryend_time[1] = "0" + aryend_time[1];
  //         }
  //         model.end_time = aryend_time[0] + ":" + aryend_time[1] + " " + aryend_time[2];

  //       }

  //     });
  //   });
  // }


  goToPrevious() {
    if (this.isValid) {
      var parent = this.schema.getParent();
      this.sibling.updateSibling(parent.fieldsets[0].fields[0]);
    }

  }

  goToNext() {
    if (this.isValid) {
      var parent = this.schema.getParent();
      this.sibling.updateSibling(parent.fieldsets[0].fields[2]);

    }
  }



  closeModel() {
    this.setdefault();
    var parent = this.schema.getParent();

    let data = { data: 'configure' }
    parent.setValue("configure", data);

    this.viewCtrl.dismiss();
  }

  setdefault() {
    if (this.dynamicdata.hasOwnProperty("changeBW")) {
      this.dynamicdata.changeBW = null;
      delete this.dynamicdata['changeBW'];
    }

    if (this.dynamicdata.hasOwnProperty("totalAend")) {
      // this.dynamicdata.totalAend = 750;  
      delete this.dynamicdata['totalAend'];
    }

    if (this.dynamicdata.hasOwnProperty("portCapacityAend")) {
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
    if (this.dynamicdata.hasOwnProperty("datasource")) {
      //        this.dynamicdata.datasource = null;  
      delete this.dynamicdata['datasource'];
    }
    if (this.dynamicdata.hasOwnProperty("addressON")) {
      this.dynamicdata.addressON = null;
      delete this.dynamicdata['addressON'];
    }



  }


}
