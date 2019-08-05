import { Component, Input, SimpleChanges } from "@angular/core";
import { DynamicService } from '../../providers/dynamic-service/dynamic-service';
import { ExternalProvider } from "../../providers/external/external";
import { PopoverController } from "ionic-angular";
import { ModalController, ModalOptions } from 'ionic-angular';
import * as _ from 'lodash';
import { HttpClient } from "@angular/common/http";
import { NGXLogger } from "ngx-logger";
import { MessageWidget } from "../../components/message-widget/message-widget";
import { IfObservable } from "rxjs/observable/IfObservable";
import { OtherServicesWidget } from "../../components/other-services-widget/other-services-widget";
import { DscpWidget } from "../../components/dscp-widget/dscp-widget";

const MESH_KEYWORD = "Mesh";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";

@Component({
  selector: "toggle-mono",
  templateUrl: "toggle-mono.html"
})

export class ToggleMono {
  @Input("schema") schema: any;
  @Input("model") model: any;
  checkAllModels: boolean = false;



  toggle01: boolean = false;
  initialtogglestatus: boolean = false;


  public dynamicdata: any;
  serviceCount: number = 1;
  networkType: string = "P2P";
  message: string = "Note that if no specific QoS class speed percentages are added to each of the services listed below, default QoS settings will apply";



  constructor(public permdataService: DynamicService, public modalCtrl: ModalController, private externalProvider: ExternalProvider, private http: HttpClient, private logger: NGXLogger) {

    this.dynamicdata = permdataService.getOption();


  }

  myModalOptions: ModalOptions = {
    enableBackdropDismiss: false,
    showBackdrop: true,
    cssClass: 'message-widget'
  };

  myModalOptionsDSCP: ModalOptions = {
    enableBackdropDismiss: false,
    showBackdrop: true,
    cssClass: 'dscp-widget'
  };
  presentModalDSCP() {
    this.modalCtrl
      .create(DscpWidget, {
        callback: (filter: any) => {
          this.logger.debug("Here");
        }
      }, this.myModalOptionsDSCP)
      .present({
        ev: event
      });
  }

  ngOnInit() {
    this.logger.debug("SCHEMA qos", this.schema);

    this.checkdefaultvalues();
    this.asignDefaultQosValues();
    this.mapSchemaLabels();


  }

  asignDefaultQosValues() {

  }


  mapSchemaLabels() {
    var qoslabels = this.schema.datasource[0].schema.qos;
    console.log("qosLabels", qoslabels);

  }

  toggleOne(type) {
    //if(type=='e')
    // alert(type);
    this.presentModal();

    if (this.initialtogglestatus === true) {
      this.toggle01 = true;

    } else {
      this.toggle01 = !this.toggle01;

    }




    // this.toggle01=!this.toggle01;



    // else

    if (this.initialtogglestatus === false) {

      if (this.toggle01 === true) {
        this.model[0].qos.status = 'ON';
        this.permdataService.setOption('QoSMessage', 'on');
  
      }
      else {
        this.model[0].qos.status = 'OFF';
        this.permdataService.setOption('QoSMessage', 'off');
  
      }

    } else {

      if (this.toggle01 === false) {
        this.model[0].qos.status = 'ON';
        this.permdataService.setOption('QoSMessage', 'on');
  
      }
      else {
        this.model[0].qos.status = 'OFF';
        this.permdataService.setOption('QoSMessage', 'off');
  
      }


    }
   


    // if(this.toggle01 === false)
    // this.toggle01=!this.toggle01;
    // else
    // this.toggle01=this.toggle01;

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
    if (this.model[0].qos) {
      if (this.model[0].qos.status.toUpperCase() == 'ON') {
        this.toggle01 = true;
        this.initialtogglestatus = true;

        //this.setDefaultInitialValue(0);

      }
      else {
        this.initialtogglestatus = false;
        this.toggle01 = false;
      }
    }

  }


  // setDefaultInitialValue(index: number) {
  //   if (this.model[index].qos.status.toUpperCase() == 'ON') {


  //     _.forEach(this.inputModelStubQos.list, model => {

  //       let tempLabel = model.SubLabel;
  //       var propModel = this.model[index].qos.properties;


  //       Object.keys(propModel)
  //         .forEach(function eachKey(key) {

  //           if (key == tempLabel)
  //             model.Speedpc = propModel[key];
  //         });

  //     });

  //     console.log("model default inputModelStubQos: ", this.inputModelStubQos);


  //     setTimeout(function () {
  //       let btnFlex = document.getElementsByClassName(
  //         "btnSelectedProduct"
  //       ) as HTMLCollectionOf<HTMLElement>;

  //       btnFlex[0].classList.add("btnSelected");


  //     }, 100);





  //   } else {

  //   }

  // }


  // setDefaultValuesfromModel(index: number) {
  //   if (this.model[index].qos.status.toUpperCase() == 'ON') {


  //     _.forEach(this.inputModelStubQos.list, model => {

  //       let tempLabel = model.SubLabel;
  //       var propModel = this.model[index].qos.properties;


  //       Object.keys(propModel)
  //         .forEach(function eachKey(key) {

  //           if (key == tempLabel)
  //             model.Speedpc = propModel[key];
  //         });

  //     });

  //     console.log("model default inputModelStubQos: ", this.inputModelStubQos);





  //   } else {

  //   }

  // }


  presentModal() {
    this.modalCtrl
      .create(MessageWidget, {
        callback: (filter: any) => {
          this.logger.debug("Message widget");
        }
      }, this.myModalOptions)
      .present({
        ev: event
      });
  }

  updateQos(type: any, qoslabel: string, speed: number) {
    if (type == '-')
      speed--;
    else
      speed++;

    _.forEach(this.inputModelStubQos.list, model => {
      if (model.Label == qoslabel) {
        if (speed < 0)

          if (speed >= model._Speedpc) {

          }


        let maxPercent = 0;
        let throtleval: number = 95;

        switch (model.SubLabel) {
          case "gold_rt":
            maxPercent = 50;
            break;
          case "gold_nrt":
          case "silver_3":
          case "silver_2":
          case "silver_1":
            maxPercent = 95;
            break;
          case "network":
            maxPercent = 5;
            break;
          default:
            console.log("no change");

        }

        if (speed >= 0 && speed <= maxPercent) {

          model.Speedpc = speed;

          let tempValueBronze = throtleval - this.inputModelStubQos.list[0].Speedpc - this.inputModelStubQos.list[1].Speedpc - this.inputModelStubQos.list[2].Speedpc - this.inputModelStubQos.list[3].Speedpc - this.inputModelStubQos.list[4].Speedpc;

          if (tempValueBronze < 0) {
            if (type == '-')
              model.Speedpc = speed + 1;
            else
              model.Speedpc = speed - 1;

          } else {
            this.inputModelStubQos.list[5].Speedpc = tempValueBronze;

            this.inputModelStubQos.list[5].Speedpc = throtleval - this.inputModelStubQos.list[0].Speedpc - this.inputModelStubQos.list[1].Speedpc - this.inputModelStubQos.list[2].Speedpc - this.inputModelStubQos.list[3].Speedpc - this.inputModelStubQos.list[4].Speedpc;// - (this.inputModelStubQos.list[0].Speedpc + this.inputModelStubQos.list[1].Speedpc);// + this.inputModelStubQos.list[2].Speedpc + this.inputModelStubQos.list[3].Speedpc + this.inputModelStubQos.list[4].Speedpc);
            this.inputModelStubQos.list[7].Speedpc = _.toNumber(this.inputModelStubQos.list[0].Speedpc) + _.toNumber(this.inputModelStubQos.list[1].Speedpc) + _.toNumber(this.inputModelStubQos.list[2].Speedpc) + _.toNumber(this.inputModelStubQos.list[3].Speedpc) + _.toNumber(this.inputModelStubQos.list[4].Speedpc) + _.toNumber(this.inputModelStubQos.list[5].Speedpc) + _.toNumber(this.inputModelStubQos.list[6].Speedpc);


          }


        }


      }
      console.log("model inputModelStubQos: ", model);
    });


  }

  // editQos(counter: number, event: any) {
  //   this.serviceCount = counter;

  //   var evn = event;
  //   if (evn.target.innerHTML !== "SELECTED") {

  //     evn.target.innerHTML = "SELECTED";


  //     let btnFlex = document.getElementsByClassName(
  //       "btnSelected"
  //     ) as HTMLCollectionOf<HTMLElement>;

  //     btnFlex[0].innerHTML = "EDIT";
  //     btnFlex[0].classList.add("btnEdit");
  //     btnFlex[0].classList.remove("btnSelected");



  //     evn.currentTarget.classList.add("btnSelected");
  //     evn.currentTarget.classList.remove("btnEdit");


  //     this.setDefaultValuesfromModel(counter);


  //   }





  // }

  // checkAll() {

  //   if (this.checkAllModels) {
  //     let i = 0;
  //     for (i = 0; i < this.model.length - 1; i++) {


  //       let btnFlex = document.getElementsByClassName(
  //         "btnEdit"
  //       ) as HTMLCollectionOf<HTMLElement>;

  //       btnFlex[0].innerHTML = "SELECTED";
  //       btnFlex[0].classList.add("btnSelected");
  //       btnFlex[0].classList.remove("btnEdit");

  //     }




  //   } else {

  //     let i = 0;
  //     for (i = 0; i < this.model.length; i++) {


  //       let btnFlex = document.getElementsByClassName(
  //         "btnSelected"
  //       ) as HTMLCollectionOf<HTMLElement>;

  //       btnFlex[0].innerHTML = "EDIT";
  //       btnFlex[0].classList.add("btnEdit");
  //       btnFlex[0].classList.remove("btnSelected");
  //     }

  //     let btnFlex1 = document.getElementsByClassName(
  //       "btnSelectedProduct"
  //     ) as HTMLCollectionOf<HTMLElement>;

  //     btnFlex1[0].innerHTML = "SELECTED";
  //     btnFlex1[0].classList.add("btnSelected");
  //     btnFlex1[0].classList.remove("btnEdit");
  //     this.serviceCount=0;
  //     this.setDefaultValuesfromModel(0);
  //   }





  // }



  // saveSettings(servicecounter: number) {

  //   //first check if all models need to be saved
  //   if (this.checkAllModels) {

  //   } else {
  //     this.setEditedValuesToModel(this.serviceCount);
  //   }

  // }


  // setEditedValuesToModel(index: number) {
  //   if (this.model[index].qos.status.toUpperCase() == 'ON') {


  //     _.forEach(this.inputModelStubQos.list, model => {

  //       let tempLabel = model.SubLabel;
  //       var propModel = this.model[index].qos.properties;

  //       Object.keys(propModel)
  //         .forEach(function eachKey(key) {
  //           if (key == tempLabel)
  //             propModel[key] = model.Speedpc
  //         });

  //     });

  //     console.log("saved Model: ", this.model);



  //   } else {
  //   }

  // }


  public inputModelStubQos = {
    list: [{
      Label: "Gold RT %",
      SubLabel: "gold_rt",
      Speedpc: 50,
      _Speedpc: 50,
      SpeedMbps: 50
    },
    {
      Label: "Gold NRT %",
      SubLabel: "gold_nrt",
      Speedpc: 3,
      _Speedpc: 3,
      SpeedMbps: 3
    },
    {
      Label: "Silver 3 %",
      SubLabel: "silver_3",
      Speedpc: 7,
      _Speedpc: 7,
      SpeedMbps: 7
    },
    {
      Label: "Silver 2 %",
      SubLabel: "silver_2",
      Speedpc: 5,
      _Speedpc: 5,
      SpeedMbps: 5
    },
    {
      Label: "Silver 1 %",
      SubLabel: "silver_1",
      Speedpc: 9,
      _Speedpc: 9,
      SpeedMbps: 9
    },
    {
      Label: "Bronze %",
      SubLabel: "bronze",
      Speedpc: 21,
      _Speedpc: 21,
      SpeedMbps: 21
    },
    {
      Label: "Network %",
      SubLabel: "network",
      Speedpc: 5,
      _Speedpc: 5,
      SpeedMbps: 5
    },
    {
      Label: "Total %",
      SubLabel: "total",
      Speedpc: 100,
      _Speedpc: 100,
      SpeedMbps: 100
    }


    ]
  };










}
