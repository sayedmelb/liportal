import { Component, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";
import {
  DynamicService
} from '../../providers/dynamic-service/dynamic-service';
import { NGXLogger } from "ngx-logger";

@Component({
  selector: "cost-summary-schedule",
  templateUrl: "cost-summary-schedule.html"
})

export class CostSummarySchedule {
  @Input("schema") schema: any;
  @Input("model") model: any;
  @Input("networkType") networkType: any;
  @Input("data") data: any;

  public dynamicdata: any;
  totalAend: number = 750;
  installChargeAend: number = 0;
  installChargeBend: number = 0;
  costChange: boolean = false;
  hasmodel: boolean = false;


  constructor(
    public permdataService: DynamicService,
    private logger: NGXLogger
  ) {


    this.dynamicdata = permdataService.getOption();
  }

  ngOnInit() {
    this.logger.debug("costsummary model", this.model);


  }

  ngOnChanges(changes: SimpleChanges) {

    this.logger.debug("data costsummary ngOnChanges ->", this.schema, this.model);
    if (this.model)
      this.hasmodel = true;

  }

  ngDoCheck() {
    if (this.dynamicdata.hasOwnProperty("totalAend")) {
      this.totalAend = this.dynamicdata.totalAend;
    } else
      this.totalAend = 750;
    if (this.dynamicdata.hasOwnProperty("installChargeAend")) {
      this.installChargeAend = this.dynamicdata.installChargeAend;
    }
    if (this.dynamicdata.hasOwnProperty("installChargeBend")) {
      this.installChargeBend = this.dynamicdata.installChargeBend;
    }

    if (this.dynamicdata.hasOwnProperty("costChange")) {
      if (this.dynamicdata.costChange == true)
        this.costChange = true;
      else
        this.costChange = false;
    }

    if(this.model && this.model[0].totalHoursOccurance) {
      this.logger.debug("totalHoursOccurance",this.model[0].totalHoursOccurance);
    }

  }


}
