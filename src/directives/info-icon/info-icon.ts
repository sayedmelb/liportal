import {
  Component,
  Input
} from "@angular/core";

@Component({
  selector: "info-icon",
  templateUrl: "info-icon.html"
})

export class InfoIcon {
  @Input() iconSource: string;
  @Input() iconStyle: string;
  @Input() infoText: string;
  @Input() textPlacement: string;

  //showInfoBox: boolean = true;
  
  constructor() {
    this.iconSource = "../../assets/imgs/question-mark.png";
    this.iconStyle = "icon-sm";
  }

  /* toggle() {
    this.showInfoBox = !this.showInfoBox;
  } */
}
