import {
    Component,
    Input
  } from "@angular/core";
  import * as _ from 'lodash';
import { NGXLogger } from "ngx-logger";
import { DynamicService } from "../../providers/dynamic-service/dynamic-service";
const MESH_KEYWORD = "Mesh";

  @Component({ 
    selector: "flex-schedule-review",
    templateUrl: "flex-schedule-review.html"
  }) 
  
  export class FlexScheduleReview {
    @Input("schema") schema: any;
    @Input("model") data: any;
    @Input("network") network: any;
    networkType: string= '';
    public dataDynamic;
    
    constructor(private logger: NGXLogger, public permdataService: DynamicService) {
      this.dataDynamic = permdataService.getOption();
    }
    ngOnInit() {
         this.logger.debug("schedule sum schema", this.schema); 
         console.log("schedule review", this.data);
         if (this.schema.datasource[0].selectedProduct.properties.topology == MESH_KEYWORD) {
          this.networkType = "Mesh";
        } else {
          this.networkType ="P2P";
        }
        // this.logger.debug("speed sum mod", this.data);

    }
    getDaysList(){
      let daylist: string ='';
      let count: number =0;

      if(this.schema.datasource[0].model){
        let step: number = 3;
        if(this.schema.datasource[0].model[0].recurrence_type=='Monthly')
        step = 8;
        if(!this.schema.datasource[0].model[0].recurrence)
        return '';
        
        _.forEach(this.schema.datasource[0].model[0].recurrence.values, p => {
          if (p.checked == true)
          {
            count++;
            if(count==step)
            {
              daylist = daylist + p.day + ',<br> ';
              count=0; //reset count to zero
            }
            else
            daylist = daylist + p.day + ', ';
          }
          
  
        });

        return daylist;
      } else {
        return '';
      }

     
      //let arylist = this.schema.datasource[0].model[0].recurrence.values

    }

    checkAddressState() {
      let tempdata = this.permdataService.getOption();
      let addressobj = this.dataDynamic.addressObj;
      let state = false;
      _.forEach(addressobj, comp => {
  
        if (comp.component.name == 'speed') {
          if (comp.component.state == true) {
            state = true;
  
          }
        }
      });
      return state;
    }

    getFlexMax(type: string, state: string){
        if(type=='A')
        {
          if(state =='f')
         return this.capacity(this.schema.datasource[0].model[0].flex_capacity, this.schema.datasource[0].model[0].contractedBw);
          if(state=='i')
          return this.capacity(this.schema.datasource[0].selectedProduct.properties.flex_pack, this.schema.datasource[0].selectedProduct.properties.service.properties.bandwidth); 
          
        }
      
        if(type=='B')
        {
          if(state =='f')
         return this.capacity(this.schema.datasource[0].model[1].flex_capacity, this.schema.datasource[0].model[1].contractedBw);
          if(state=='i')
          return this.capacity(this.schema.datasource[0].otherEnds[0].properties.flex_pack, this.schema.datasource[0].otherEnds[0].properties.service.properties.bandwidth); 
          
        }
      
      }


      capacity(value: string, bw: string): string {
        let bwArray = _.words(bw);
        let flexArray = _.words(value);

        let result = '';

        let bwNum = 0;
        let FlexNum =0;


          bwNum = _.toNumber(bwArray[0]);
        
          FlexNum = _.toNumber(flexArray[0]);
        result = bwNum * FlexNum + ' Mbps';
        return result;

    }

  }
  