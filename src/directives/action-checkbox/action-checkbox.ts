import {
  Component,
  Input
} from "@angular/core";
import { PopoverController } from "ionic-angular";
import { ModalController, ModalOptions } from 'ionic-angular';
import { OtherServicesWidget } from "../../components/other-services-widget/other-services-widget";
import { NGXLogger } from "ngx-logger";

@Component({
  selector: "action-checkbox",
  templateUrl: "action-checkbox.html"
})

export class ActionCheckbox { 
  @Input("schema") schema: any;
  @Input("radiotype") radiotype: any;
  @Input("label") Label: any;
  @Input("data") data: any;
  //@Input("changeType") changeType: any;
  
  selected: any = {};

  //ctor
  constructor(public popoverCtrl: PopoverController, public modalCtrl: ModalController, private logger: NGXLogger) {

  } 
  ngOnInit() {
    //console.log("changeType", this.schema);
  }
  myModalOptions: ModalOptions = {
    enableBackdropDismiss: true,
    showBackdrop: true,
    cssClass : 'other-services-widget'
  };
  presentModal() {
    this.modalCtrl
          .create(OtherServicesWidget, {
            callback: (filter: any) => {
              this.logger.debug("Here");
            }
          }, this.myModalOptions)
          .present({
            ev: event
          });
  }

}
