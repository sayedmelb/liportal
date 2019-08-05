import {
  Component,
  Input
} from "@angular/core";
@Component({
  selector: "review-change",
  templateUrl: "review-change.html"
}) 

export class ReviewChange {
  @Input("schema") schema: any;
  //@Input("model") model: any;
  @Input("addressSource") addressSource: any;
  @Input("addresson") addresson: any;
  @Input("service") service: any;
  @Input("network") network: any;
  
  
  constructor() {}
  ngOnInit() {
   //console.log("service", this.service);
  
  }
}
