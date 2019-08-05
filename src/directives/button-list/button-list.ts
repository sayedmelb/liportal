import {
  Component,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
// import * as _ from 'lodash';
import {
  DynamicService
} from '../../providers/dynamic-service/dynamic-service';
import { NGXLogger } from "ngx-logger";

@Component({
  selector: "button-list",
  templateUrl: "button-list.html"
})

export class ButtonList {
  @Input("column") column: any;
  @Input("dataSource") dataSource: any;
  @Input("model") model: any;
  @Input("index") index: any;
  @Input("addressEnd") addressEnd: any;
  @Input("networkType") networkType: any;
  
  bendVisible: boolean = false;
  
  data: any;

  @Output() valueChange = new EventEmitter();
  @Output() dataChange = new EventEmitter();

  ngOnInit() {
    
    //console.log("button lists , ngOnInit",  this.addressEnd, this.networkType);
    //this.valueChange.emit(this.model);

    this.setBendVisible();
    if(this.column==="serviceLevel")
    this.arrangeServiceLevel();
  }
  constructor(public dataService: DynamicService, private logger: NGXLogger) {

  }
  arrangeServiceLevel() {
   let tempsource;
    this.dataSource.sort((a,b) => 0 - (a > b ? -1 : 1)); 
   //this.dataSource.sort((a,b) => 0 - (a > b ? 1 : -1));// if descending required

   //below 6 lines is temporary fix to order as per requirement
   tempsource = this.dataSource[0];
   this.dataSource[0] = this.dataSource[1];
   this.dataSource[1] = tempsource;

   tempsource = this.dataSource[1];
   this.dataSource[1] = this.dataSource[2];
   this.dataSource[2] = tempsource;



  }

  setBendVisible() {
    if(this.networkType=="P2P") {
      this.bendVisible = true;
    } else if( this.networkType==="Mesh" && this.addressEnd ==="A-End:") {
      this.bendVisible = true;

    } else {
      this.bendVisible = false;
    }

  }

  onClickEvent($event, control, column) {
    this.model[this.column] = control;
    this.dataChange.emit({model: this.model, index: this.index, column: this.column});
  }//onclick




}