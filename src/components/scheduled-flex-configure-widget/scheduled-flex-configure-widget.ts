import { Component, SimpleChanges } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { mobiscroll, MbscCalendarOptions } from '@mobiscroll/angular';
import { ShowHideChild } from '../../providers/show-hide-child/show-hide-child';
import { Service } from '../../interfaces/service';
import { InputControlWidget } from '../control-widget';
import { ModalController, ModalOptions } from 'ionic-angular';
import { MessageWidget } from "../../components/message-widget/message-widget";
import moment from 'moment';

import {
  DynamicService
} from '../../providers/dynamic-service/dynamic-service';
import * as _ from 'lodash';
import { NGXLogger } from 'ngx-logger';
import { checkAndUpdateTextDynamic } from '@angular/core/src/view/text';

const MESH_KEYWORD = "Mesh";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";


mobiscroll.settings = {
  theme: 'ios'
};

@Component({
  selector: 'scheduled-flex-configure-widget',
  templateUrl: 'scheduled-flex-configure-widget.html'
})

export class ScheduledFlexConfigureWidget extends InputControlWidget {

  public disabled: boolean = false;
  public is_valid: boolean = false;
  slidershow: boolean = false;
  contactshow: boolean = false;
  isDynamic: boolean = false;
  isPermanent: boolean = false;
  isOpen: boolean = true;
  public dateSettings: MbscCalendarOptions = {
    touchUi: false,
    controls: ['calendar', 'time'],
    min: new Date()
  };
  public data: Service;
  networkType: string = '';
  tempdata: any;
  isLoading: boolean = true;
  bwchangeData: number = 0;
  isLoadingProgress: boolean = false;
  notavailable: boolean = false;
  calendarstatus: boolean = true;
  eventCheckMessage: string = "";
  eventCheckStatus: number = 0; // 0 = ok, 1 = validation failure, 2 event class issue
  //changeType: { change: 'schedule'};
  //utilization: string = "400"

  constructor(public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public sibling: ShowHideChild,
    public permdataService: DynamicService,
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


    if (this.tempdata.hasOwnProperty("datasource") == true) {
      this.schema.datasource = this.tempdata.datasource;
      this.isLoading = false;

      if (this.schema.datasource[0].selectedProduct.properties.topology == MESH_KEYWORD) {
        this.networkType = "Mesh";
      } else {
        this.networkType = "P2P";
      }

      // this.checkNTU(this.schema.datasource[0].selectedProduct);





    }
    else {
      setInterval(() => {
        if (this.isLoading) {
          if (this.schema.datasource && this.schema.datasource[0]) {
            this.logger.debug("Loading properites of model SB configure page", this.schema.datasource);
            //console.log("SB CONFIGURE FRNT-END DATASOURCE",this.schema.datasource);

            if (this.schema.datasource[0].isActive && this.schema.datasource[0].isActive === "true") {
              let tempdata: any = this.permdataService.getOption();
              if (tempdata.hasOwnProperty("ScheduleBWIsSubmitted") == false)
                this.permdataService.setOption('ScheduleBWIsSubmitted', true);
              let parent = this.schema.getParent();

              this.sibling.updateSibling(parent.fieldsets[0].fields[2]);
            }

            if (!this.schema.datasource[0].flextype) {
              this.schema.datasource[0].flextype = "schedule"
            }

            if (this.schema.onStatusCheck) this.schema.onStatusCheck((result) => {
              console.log("fd:test status");
              console.log("fd:result", result);
              let state = true;

              _.forEach(result.model.orders, order => {
                if (order.subtype.toUpperCase() === 'PERMANENT' && order.status.toUpperCase() === 'IN-PROGRESS') {
                  this.isPermanent = true;
                  state = false;
                  return false;
                } else if (order.subtype.toUpperCase() === 'DYNAMIC') {
                  this.isDynamic = true;
                  state = false;
                  return false;
                }

              });

              if (this.isPermanent) {

                let tempdata: any = this.permdataService.getOption();
                if (tempdata.hasOwnProperty("scheduleIsPermanent") == false)
                  this.permdataService.setOption('scheduleIsPermanent', true);

                this.presentModal();
              }

              if (this.isDynamic) {

                let tempdata: any = this.permdataService.getOption();
                if (tempdata.hasOwnProperty("scheduleIsDynamic") == false)
                  this.permdataService.setOption('scheduleIsDynamic', true);

                this.presentModal();
              }

            });




            let selectedProduct = this.schema.datasource[0].selectedProduct;
            let newModel = [];
            _.forEach(this.schema.datasource[0].model, model => {
              if (!model.utilizedByOtherServices) {
                model.utilizedByOtherServices = 800;
                // this.utilization = model.utilizedByOtherServices;

              }
              if (!model.utilizedByOtherServicesLabel) {
                model.utilizedByOtherServicesLabel = 800;
                // this.utilization = model.utilizedByOtherServices;

              }
              if (!model.portAvailableBW) {
                model.portAvailableBW = 200;
                //portAvailableBW  
              }
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
            this.logger.debug("SCModel after merging ->", this.schema.datasource[0].model)
            this.isLoading = false;


            if (this.schema.datasource[0].selectedProduct.properties.topology == MESH_KEYWORD) {
              this.networkType = "Mesh";
            } else {
              this.networkType = "P2P";
            }
            //this.checkNTU(this.schema.datasource[0].selectedProduct);


          }
        }
      }, 1);

    }
  }

  myModalOptions: ModalOptions = {
    enableBackdropDismiss: false,
    showBackdrop: true,
    cssClass: 'message-widget'
  };

  ngOnInit() {
    super.ngOnInit();

    //console.log("SCHEDULE CONFIGURE SCHEMA", this.schema);
    // let _th = this;
    // if (this.schema.getParent().getValue("configure")) {
    //   this.data = this.schema.getParent().getValue("configure");
    //   this.is_valid = true;
    // }
    // else if (this.schema.onLoad) this.schema.onLoad(() => {
    //   _th.data = _th.schema.datasource[0];
    //   _th.data.scheduled_start_date = new Date();
    // });
  }

  CalendarOpenstatus(event) {
    console.log("eventcal", event);
    this.calendarstatus = !event.status;

  }


  slidertoggle(type: string) {

    // if(type=='slider')
    // this.addSliderLoadingClass();
    // if(type=='eventtimes')
    // this.removeSliderLoadingClass();

    if (this.isLoadingProgress == true)
      return;
    if (type == 'slider' && !this.slidershow) {
      this.addSliderLoadingClass();
      this.removeparentrowclass();
      if (this.checkForClashEvents())
        this.getAvailablePortCap();
      else {

        alert(this.eventCheckMessage);
      }




    } else if (type == 'eventtimes' && !this.slidershow) {
      this.removeSliderLoadingClass();
      this.removeparentrowclass();
      this.getAvailablePortCap();
    }


    else {

      this.slidershow = !this.slidershow;
    }
    // this.slidershow = !this.slidershow;

  }

  checkForClashEvents() {
    let dataSource = this.schema.datasource[0];
    console.log("scheduler data", this.schema.datasource[0]);

    //first check if end_time has been selected
    if (!dataSource.model[0].end_time) {
      this.eventCheckStatus = 2;
      this.eventCheckMessage = "Please select End Time and try again";
      return false;
    }

    //first get the scheduler from input model and align it to model to compare with currently planned event calendar block
    let inputEventModel: any = this.createInputEventModel();
    console.log("inputEventModel", inputEventModel);
    // if (inputEventModel.length = 0)// if there is no active events in input model
    // {
    //   return true;
    // }

    //first get the scheduler from planned event
    let plannedEventModel = this.createPlannedEventModel();
    console.log("plannedEventModel", plannedEventModel);

    //now check for clash events
    let tempModel = [];
    let isClash: boolean = false;
    _.forEach(plannedEventModel, planEvent => {


      let startOfPlanEvent = planEvent.start;

      _.forEach(inputEventModel, inputEvent => {

        if (planEvent.start.getTime() >= inputEvent.start.getTime() && planEvent.start.getTime() <= inputEvent.end.getTime()) {
          isClash = true;
          return;
        }

        if (planEvent.end.getTime() >= inputEvent.start.getTime() && planEvent.start.getTime() <= inputEvent.end.getTime()) {
          isClash = true;
          return;
        }


      });
      if (isClash)
        return;

    });




    if (isClash) {
      this.eventCheckMessage = "You have already a Scheduled flex event currently occurring or scheduled in future, please check the calendar and find another time available";
      return false;
    }

    return true; // no clash by default;

  }

  createInputEventModel() {
    let newModel = [];
    _.forEach(this.schema.datasource[0].events_calendar.products[0].scheduler, event => {
      let newObj = {};
      newObj['start'] = this.formatDate(event.properties.start_date, event.properties.start_time);
      newObj['end'] = this.formatDate(event.properties.end_date, event.properties.end_time);
      newModel.push(newObj);
    });
    console.log("inside CreateInputModel", newModel);

    return newModel;
  }


  createPlannedEventModel() {
    let newModel = [];
    let dataSource = this.schema.datasource[0];
    //case once
    if (dataSource.model[0].recurrence_type == "Once") {

      let currDate = moment(dataSource.model[0].single_date).startOf('day');
      let lastDate;

      if (dataSource.model[0].single_date1) {
        lastDate = moment(dataSource.model[0].single_date1).startOf('day');
      } else
        lastDate = moment(dataSource.model[0].single_date).startOf('day');

        let newObj = {};
        newObj['start'] = this.formatDate(currDate.format("YYYY-MM-DD"), dataSource.model[0].start_time);
        newObj['end'] = this.formatDate(lastDate.format("YYYY-MM-DD"), dataSource.model[0].end_time);
        newModel.push(newObj);
    }
    return newModel;
  }

  //version 0.1
  // createPlannedEventModel() {
  //   let newModel = [];
  //   let dataSource = this.schema.datasource[0];


  //   //case once
  //   if (dataSource.model[0].recurrence_type == "Once") {

  //     let currDate = moment(dataSource.model[0].single_date).startOf('day');
  //     currDate.subtract(1, 'days'); // to include start date;
  //     let runningDate = currDate;
  //     let lastDate;

  //     if (dataSource.model[0].single_date1) {
  //       lastDate = moment(dataSource.model[0].single_date1).startOf('day');
  //     } else
  //       lastDate = moment(dataSource.model[0].single_date).startOf('day');

  //     lastDate.add(1, 'days'); //to include end date
  //     while (currDate.add(1, 'days').diff(lastDate) < 0) {
  //       let newObj = {};
  //       console.log("runningdate", runningDate.format("YYYY-MM-DD"));
  //       newObj['start'] = this.formatDate(runningDate.format("YYYY-MM-DD"), dataSource.model[0].start_time);
  //       newObj['end'] = this.formatDate(runningDate.format("YYYY-MM-DD"), dataSource.model[0].end_time);
  //       newModel.push(newObj);

  //     }


  //   }

  //   return newModel;


  // }


  formatDate(input, start_time) {
    let datePart = input.match(/\d+/g),
      //year = datePart[0].substring(2), // get only two digits
      year = datePart[0].substring(0, 4),
      month = datePart[1], day = datePart[2];

    let timeary = _.words(start_time);
    let hh = timeary[0]
    let mm = timeary[1];
    let ampm = timeary[2];

    if (ampm == 'am') {
      if (hh == '12')
        hh = '00';

    } else {
      if (parseInt(hh) > 0 && parseInt(hh) < 12)
        hh = (parseInt(hh) + 12).toString();

    }

    return new Date(year, parseInt(month) - 1, day, parseInt(hh), parseInt(mm), 0)
  }


  addSliderLoadingClass() {
    setTimeout(function () {
      const clsLoading = document.getElementsByClassName(
        "loading-bar"
      ) as HTMLCollectionOf<HTMLElement>;
      clsLoading[0].classList.add("loading-hgt");
    }, 5);
  }

  removeSliderLoadingClass() {
    setTimeout(function () {
      const clsLoading1 = document.getElementsByClassName(
        "loading-bar"
      ) as HTMLCollectionOf<HTMLElement>;
      clsLoading1[0].classList.remove("loading-hgt");
    }, 5);
  }

  removeparentrowclass() {
    setTimeout(function () {
      const clsLoading2 = document.getElementsByClassName(
        "slider-row"
      ) as HTMLCollectionOf<HTMLElement>;
      clsLoading2[0].classList.remove("restrict-row-height");
    }, 5);
  }


  getAvailablePortCap() {
    let byPass: boolean = true;
    this.isLoadingProgress = true;

    //below is a bypass code to get PortCapaicty for demo
    if (byPass === true) {
      let result = 800.00;

      if (_.isNumber(result)) {
        //just to mock : 
        //result;
        let portCapNumber = 1000;
        let portCapAry = _.words(this.schema.datasource[0].model[0].portCapacity);
        //console.log("portCap", portCapAry[0]);
        portCapNumber = portCapNumber * parseInt(portCapAry[0]);

        //console.log("FD:SCHEDULE onCheckAvailablePortCapacity ", result);

        _.forEach(this.schema.datasource[0].model, model => {
          _.forIn(model, (value, key) => {
            if (key == 'utilizedByOtherServices') delete model[key];
            if (key == '_utilizedByOtherServices') delete model[key];
            if (key == 'utilizedByOtherServicesLabel') delete model[key];
            if (key == '_utilizedByOtherServicesLabel') delete model[key];
            if (key == 'portAvailableBW') delete model[key];
            if (key == '_portAvailableBW') delete model[key];
            if (key.startsWith("_")) delete model[key];
          });

        });

        let selectedProduct = this.schema.datasource[0].selectedProduct;
        let newModel = [];
        _.forEach(this.schema.datasource[0].model, model => {
          if (!model.utilizedByOtherServices) {
            model.utilizedByOtherServices = portCapNumber - result;
            // this.utilization = model.utilizedByOtherServices;

          }
          if (!model.utilizedByOtherServicesLabel) {
            model.utilizedByOtherServicesLabel = portCapNumber - result;
            // this.utilization = model.utilizedByOtherServices;

          }
          if (!model.portAvailableBW) {
            model.portAvailableBW = result;
            //portAvailableBW  
          }
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
        this.logger.debug("SCModel after merging and Port Cap update ->", this.schema.datasource[0].model)

        // if(this.datasource)


        this.isLoadingProgress = false;
        this.slidershow = !this.slidershow;
      }
      else if (result == 'Not Available') //if not a number 
      {
        this.isLoadingProgress = false;
        this.notavailable = true;


      }

    } else {

      var parent = this.schema.getParent();
      parent.setValue("configure", this.schema.datasource);
      if (this.schema.onCheckAvailablePortCapacity) this.schema.onCheckAvailablePortCapacity((result) => {
        //console.log("fd:test onCheckAvailablePortCapacity", result);
        if (_.isNumber(result)) {
          //just to mock : 
          //result;
          let portCapNumber = 1000;
          let portCapAry = _.words(this.schema.datasource[0].model[0].portCapacity);
          //console.log("portCap", portCapAry[0]);
          portCapNumber = portCapNumber * parseInt(portCapAry[0]);

          //console.log("FD:SCHEDULE onCheckAvailablePortCapacity ", result);

          _.forEach(this.schema.datasource[0].model, model => {
            _.forIn(model, (value, key) => {
              if (key == 'utilizedByOtherServices') delete model[key];
              if (key == '_utilizedByOtherServices') delete model[key];
              if (key == 'utilizedByOtherServicesLabel') delete model[key];
              if (key == '_utilizedByOtherServicesLabel') delete model[key];
              if (key == 'portAvailableBW') delete model[key];
              if (key == '_portAvailableBW') delete model[key];
              if (key.startsWith("_")) delete model[key];
            });

          });

          let selectedProduct = this.schema.datasource[0].selectedProduct;
          let newModel = [];
          _.forEach(this.schema.datasource[0].model, model => {
            if (!model.utilizedByOtherServices) {
              model.utilizedByOtherServices = portCapNumber - result;
              // this.utilization = model.utilizedByOtherServices;

            }
            if (!model.utilizedByOtherServicesLabel) {
              model.utilizedByOtherServicesLabel = portCapNumber - result;
              // this.utilization = model.utilizedByOtherServices;

            }
            if (!model.portAvailableBW) {
              model.portAvailableBW = result;
              //portAvailableBW  
            }
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
          this.logger.debug("SCModel after merging and Port Cap update ->", this.schema.datasource[0].model)

          // if(this.datasource)


          this.isLoadingProgress = false;
          this.slidershow = !this.slidershow;
        }
        else if (result == 'Not Available') //if not a number 
        {
          this.isLoadingProgress = false;
          this.notavailable = true;


        }





      });

    }

  }

  addContacttoggle() {
    this.contactshow = !this.contactshow;
  }

  presentModal() {
    let popover = this.modalCtrl
      .create(MessageWidget, {
        callback: (filter: any) => {
          this.logger.debug("Message widget");
        }
      }, this.myModalOptions);

    popover.onDidDismiss(data => {
      console.log("dataSB", data);
      if (data.option == 'cancel')
        this.closeModel();

    });

    popover.present({
      ev: event
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.model && this.schema.datasource && this.schema.datasource[0]) {
      this.isLoading = false;

    }


  }

  checkCalculationAndValidation(data) {
    if (data.scheduled_bw > data.contracted_bw && data.scheduled_bw <= data.flex_pack && data.scheduled_start_date !== "" && data.scheduled_end_date !== "" && data.scheduled_recurrence !== "" && data.scheduled_start_date < data.scheduled_end_date) {
      this.is_valid = true;
      this.disabled = false;
    } else if (data.scheduled_bw > data.flex_pack) {
      this.is_valid = false;
      this.disabled = true;
    } else if (data.scheduled_bw <= data.flex_pack) {
      this.is_valid = false;
      this.disabled = false;
    }
  }

  goToNext() {
    var parent = this.schema.getParent();
    this.sibling.updateSibling(parent.fieldsets[0].fields[1]);
    parent.setValue("configure", this.data);
  }

  closeModel() {
    this.viewCtrl.dismiss();
  }

  getSliderChange(event) {
    //console.log("frd:dyn:from slider", event.highValue);
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
    this.updateServiceModel();
    //this.getCostCalculation(this.bwchangeData);
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

  updateServiceModel() {
    this.permdataService.setOption('changeBW', this.bwchangeData);
  }




  tempSchemaForActionCheckbox: any = [{
    checkbox: {
      styles: "iris-blue-checkbox",
      type: "schedule"
    },
    label: {
      styles: "grey-label",
      text: "Current contracted speed"
    }
  },
  {
    checkbox: {
      styles: "cyan-checkbox",
      type: "schedule"
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


}
