import {
  Pipe,
  PipeTransform,
  Injectable,
} from '@angular/core'; 
import * as _ from 'lodash';
import {
  NGXLogger
} from 'ngx-logger';
@Injectable()
@Pipe({
  name: 'statusPipe'
})
export class StatusPipe implements PipeTransform {


  constructor(private logger: NGXLogger) {}

  transform(value: any, pipe ? : string): any {
    if (!pipe || pipe.length < 1) {
      return this.getStatus(value.status);
    }
    switch (pipe) {
      case 'status-with-icon':
        return this.getStatusTemplate(value.status);
      case 'flex':
        return this.getFlexTemplate(value);
      default:
        return this.getStatus(value.status);
    }
  }
  getFlexTemplate(value) {
      return "No events scheduled";
  }
  getStatus(status) {
  //  console.log("TABLE Status", status);
    let responseStatus = "Normal";
    let priorityArr = ["outage",  "warning", "flexing", "active", "in-progress"];
    if (status) {
      let priority;
      let found: boolean = false;
      let count =0;
      _.forEach(priorityArr, p => {
        priority = _.find(status, (status) => {
         // console.log("status lower", status.type.toLowerCase());
          if(status.type.toLowerCase() == p)
          {
            found = true;
            return true;
            
          }
         
        });
        if(found)
        return false;
      });
      if (priority) {
        switch (priority.type.toLowerCase()) {
          case "outage":
            responseStatus = "Outage";
            break;
          case "warning":
            responseStatus = "Warning";
            break;
          case "flexing":
            responseStatus = "Flexing";
            break;
          case "in-progress":
            responseStatus = "In Provisioning";
            break;
          default:
            responseStatus = "Normal";
            break;
        }
      }
    }
    //console.log("responseStatus", responseStatus);
    return responseStatus;
  };

  getStatusTemplate(status) {
    let template;
    template = "<img class='status-icon status-sidebar-icon' style='width:20px; height:20px;' src='" +this.getImage(status) + "' > ";
    template = template + "<span class='statuslabel' style='margin-top:4px; padding-left:4px'>" + this.getStatus(status) + "</span>";
    return template || "";
  }

  private getImage(statusArr) {
    let img = "../../assets/imgs/NormalSignIcon.png";
    let status = this.getStatus(statusArr);
    switch(status.toLowerCase()) {
        case "outage":
            img = "../../assets/imgs/outageSignIcon.png"; break;
        case "warning": 
            img = "../../assets/imgs/warningSignIcon.png"; break;
        case "flexing": 
            img = "../../assets/imgs/flexingSignIcon.png"; break;
        case "in provisioning": 
            img = "../../assets/imgs/provisioningSignIcon.png"; break;
        default:
            img = "../../assets/imgs/NormalSignIcon.png";
            break;
    }
    return img;
};

}
