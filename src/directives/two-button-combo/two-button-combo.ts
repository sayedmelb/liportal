import { Component, Input, SimpleChanges } from "@angular/core";
import { DynamicService } from '../../providers/dynamic-service/dynamic-service';
import { ExternalProvider } from "../../providers/external/external";
import { AppConstants } from '../../providers/avp.enum';
//import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { HttpClient } from "@angular/common/http";
import { NGXLogger } from "ngx-logger";

const MESH_KEYWORD = "Mesh";
const TOPOLOGY_PATH = "selectedProduct.properties.topology";

@Component({
  selector: "two-button-combo",
  templateUrl: "two-button-combo.html"
})

export class TwoButtonCombo {
  @Input("schema") schema: any;
  @Input("model") model: any;
  twobuttonlabelLeft: string = "A-End";
  twobuttonlabelRight: string = "B-End";
  inputLeft: number = 0;
  inputRight: number = 0;
  _inputLeft: number = 0;
  _inputRight: number = 0;
  messageState: string = 'preload';
  res: any;
  isvlanValidAend: boolean = false;
  isvlanValidBend: boolean = false;

  messageStateFrom: string = 'preload';
  public dynamicdata: any;
  networkType: string = "P2P";

  public payloadAend = {
    "payload": {
      "serviceId": "sd",
      "vlanId": "1232"

    }
  }

  public payloadBend = {
    "payload": {
      "serviceId": "sd",
      "vlanId": "1232"

    }
  }



  constructor(public permdataService: DynamicService, private externalProvider: ExternalProvider, private http: HttpClient, private logger: NGXLogger) {

    this.dynamicdata = permdataService.getOption();
  }

  ngOnInit() {
    this.logger.debug("SCHEMA vlan", this.schema);
     this.logger.debug("VLAN MODEL", this.model);


    this.checkdefaultvalues();
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }


  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.schema.datasource && this.schema.datasource[0].selectedProduct &&  this.schema.datasource[0].selectedProduct.properties.service.properties) {
      
      //below line updated based on selectedproduct as aend
      //this.payloadAend.payload.serviceId = this.schema.datasource[0].otherEnds[0].properties.service.properties.serviceId;
      this.payloadAend.payload.serviceId = this.schema.datasource[0].selectedProduct.properties.service.properties.serviceId;
    }

    //this.logger.debug("this.PAYLOAD",this.payloadAend);
    // this.logger.debug(this.schema, changes);

    //below line needs to be updated for P2P

    // if (this.schema.datasource && this.schema.datasource[0].otherEnds[1] && this.schema.datasource[0].otherEnds[1].properties.service.properties) {
    //   this.payloadBend.payload.serviceId = this.schema.datasource[0].otherEnds[1].properties.service.properties.serviceId;
    // }
    //OTHER END 0 is either bend or mesh other end
    if (this.schema.datasource && this.schema.datasource[0].otherEnds[0] && this.schema.datasource[0].otherEnds[0].properties.service.properties) {
      this.payloadBend.payload.serviceId = this.schema.datasource[0].otherEnds[0].properties.service.properties.serviceId;
    }


    if (this.schema.datasource && _.has(this.schema.datasource[0], TOPOLOGY_PATH)) {
      if (this.schema.datasource[0].selectedProduct.properties.topology == MESH_KEYWORD) {
        this.networkType = "Mesh";
      } else {
        this.networkType = "P2P";
      }

    }

  }

  checkdefaultvalues() {

    if (this.model[0].vlan) {
      this.inputLeft = this.model[0].vlan;
      this._inputLeft = this.inputLeft;
      this.payloadAend.payload.vlanId = this.model[0].vlan;
    }


  
    if(this.networkType!=="Mesh"){ 
      if (this.model[1].vlan) {
        this.inputRight = this.model[1].vlan;
        this._inputRight = this.inputRight
        this.payloadAend.payload.vlanId = this.model[1].vlan;
  
      }

    }
    

   

  }

  setInputData(type) {
     if(type=='Aend') {
      this.permdataService.setOption('vlanA', this.inputLeft);
      this.model[0].vlan = this.inputLeft;
      if (this.inputLeft.toString().trim() !== this._inputLeft.toString().trim()) {
        this.messageState = "load";
      } else {
        this.messageState = "preload";
      }

     } else {

      this.permdataService.setOption('vlanB', this.inputRight);
      this.model[1].vlan = this.inputRight;
      this.logger.debug("vlan MODEL", this.model);
      if (this.inputRight.toString().trim() !== this._inputRight.toString().trim()) {
        this.messageStateFrom = "load";
      } else {
        this.messageStateFrom = "preload";
      }

     }
   
    // else
  

    //this.permdataService.setOption("vlanA") = this.inputLeft;


  }

  //stub functionality till NSO data is retrieved
  CheckAvailability(num: number, type: string) {
    //first enable the spinner
    

    let payload: any;
    if (type == 'left') {
      payload = this.payloadAend;
      this.messageState="in-progress";
    } else {
      payload = this.payloadBend;
      this.messageStateFrom="in-progress";
    }

    //below URL will change based on SIT
    let apiRoot: string = AppConstants.API_ENDPOINT; //.API_ENDPOINT_VLAN;
    //let apiRoot: string = "http://10.124.110.23:9401/api/portal/data/vlanAvailability";

    let apiURL = `${apiRoot}?serviceId=${payload.payload.serviceId}&vlanId=${payload.payload.vlanId}`;



    this.http.get(apiURL)
      .map(response => response)
      .subscribe(result => {
        this.res = result;

        //hardcoding true here for now
        this.res = true;



        if (type == 'left') {
          this.isvlanValidAend = this.res;
          if (this.isvlanValidAend) {
            this.messageState = "validated";
            this.setaddresson();
          } else {
            this.messageState = "error";
          }
        } else {
          this.isvlanValidBend = this.res;
          if (this.isvlanValidAend) {
            this.messageStateFrom = "validated";
          } else {
            this.messageStateFrom = "error";
          }

        }


      },
        error => {
          console.log("this.error", error);
          if (error.statusText == "Unknown Error") {
            this.res = true;

            if (type == 'left') {
              this.isvlanValidAend = this.res;
              if (this.isvlanValidAend) {
                this.messageState = "validated";
                this.setaddresson();
              } else {
                this.messageState = "error";
              }
            } else {
              this.isvlanValidBend = this.res;
              if (this.isvlanValidBend) {
                this.messageStateFrom = "validated";
                this.setaddresson();
              } else {
                this.messageStateFrom = "error";
              }

            }


          }
        }

      );



    // this.externalProvider.post("data/0",payload,null).subscribe( data=> {
    //   this.logger.debug("response for VLAN Aend === ", data);

    // if(type=='left'){
    //   this.isvlanValidAend = data;
    //    if(this.isvlanValidAend){
    //     this.messageState="validated";
    //    } else {
    //     this.messageState="error";
    //    }
    // } else  {
    //   this.isvlanValidBend = data;
    //   if(this.isvlanValidAend){
    //     this.messageStateFrom="validated";
    //    } else 
    //    {
    //     this.messageStateFrom="error";
    //    }

    // }

    // })



  }

  setaddresson() {
    let tempdata: any = this.permdataService.getOption();
      if (tempdata.addressON === "none" && tempdata.addressON !=="portCapacity" && tempdata.addressON !=="speed" && tempdata.addressON !=="flexCapacity" ) {
        this.permdataService.setOption('addressON', "vlan");
      }



   
  }




}
