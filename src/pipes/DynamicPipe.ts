import {
  Pipe,
  PipeTransform,
  Injectable,
} from '@angular/core'; 
import {
  UpperCasePipe
} from '@angular/common';
import * as _ from 'lodash';
import { NGXLogger } from 'ngx-logger';
@Injectable()
@Pipe({
  name: 'dynamicPipe'
})
export class DynamicPipe implements PipeTransform {


  constructor(private upperCasePipe: UpperCasePipe, private logger: NGXLogger) { }

  transform(value: string, row?: any): any {
    if (!row || !row.pipes) return value;
    switch (row.pipes.toLowerCase()) {
      case 'uppercase':
        return this.upperCasePipe.transform(value);
      case 'bandwidth':
        return this.bandwidth(value);
      case 'networkname':
        return this.networkName(value);
      case 'capitalize':
        return this.capitalize(value); 
      case 'accesstype':
      return this.accesstype(value);   
      case 'portcapacity':
        return this.portCapacity(value);
      case 'componentheader':
        return this.componentHeader(value);
      case 'qoslabel':
        return this.qosLabel(value);
      case 'onoff': 
        return this.onOrOff(value);
      case 'hoursminutes': 
        return this.hoursminutes(value); 
      case 'serviceaddress': 
        return this.serviceaddress(value); 
      case 'flex':
        return this.flex(value);   
      case 'servicelevel':
        return this.servicelevel(value);
      default:
        return value;
    }
  }

  servicelevel(value: string): string {
    if(value && value.trim().toLowerCase() === 'enhanced 4 (rapid)') {
      return 'Enhanced 4 (24x7)'
    } else {
      return value;
    }
  }

  flex(value: string): string{
    let flexMsg = '';
    if(value.length==0)
    flexMsg = "No events scheduled";
    else
    flexMsg = "Flexing to " + value;
    return flexMsg;

  }

  bwToNumber(value: string): number {
    let bwArray = _.words(value);
    if (bwArray[1].toUpperCase().startsWith('M')) {
      return _.toNumber(bwArray[0]);
    } else {
      return _.multiply(1000, _.toNumber(bwArray[0]));
    }
  }

  networkName(value: string): string {
    if (value.toUpperCase() == 'SDETHERNET') return "SD Ethernet";
    else return "Evolve EWAN";
  }
  capitalize(value: string): string {
    let bwArray = value.split('_');// _.words(value);
    
    let phrase = '';
    for(let i: number = 0;i<bwArray.length; i++){
      phrase = phrase + this.toFirstLetterCapital(bwArray[i])+ " ";
    }
     return phrase;
  }
  accesstype(value: string): string {
    let bwArray = value.split('_');
    let phrase = '';
    for(let i: number = 0;i<bwArray.length; i++){
      if(bwArray[i] =='sd')
      phrase = phrase + bwArray[i].toUpperCase() + " ";
      else
      phrase = phrase + this.toFirstLetterCapital(bwArray[i])+ " ";
    }
    return phrase;
  }

  toFirstLetterCapital(str: string){
    
    return str.charAt(0).toUpperCase() + str.slice(1);

  }

  bandwidth(value: string): string {
    let bwArray = _.words(value);
    if (bwArray[1].toUpperCase() == 'M') {
      return bwArray[0] + ' Mbps';
    } else if (bwArray[1].length > 1) {
      return value;
    } else {
      return bwArray[0] + ' Gbps';
    }
  }

  hoursminutes(value: string): string {
    let hrminArray = _.words(value);
    let preparedhrmin 
    if(hrminArray[1]=="00")
    preparedhrmin = hrminArray[0] + " hour(s)"
    else
    preparedhrmin = hrminArray[0] + " hour(s) " + hrminArray[1] + " min(s)" 
    return preparedhrmin;
  }

  serviceaddress(value: string): string {
    //let hrminArray = _.words(value);
    var addressarray = value.split(',');
    let newlineAddress = ""
    for(let i=0; i<addressarray.length; i++) {
      newlineAddress = newlineAddress + addressarray[i] + "<br>";
    }

    return newlineAddress;
  }

  portCapacity(value: string): string {
    if (value) {
      let portArr = _.words(value);
      return portArr[0] + " Gbps port";
    }
    return "";
  }

  componentHeader(value: string): string {
    console.log("comonentheader", value);
    if (value.toUpperCase() == 'SD_FIBRE SLA')
      //return "SLA";
      return "Service Level";
    else if (value.toUpperCase() == 'PORT SELECTIONS')
      return "Port Capacity";
    else if(value.toLocaleUpperCase() == 'FLEX PACK')
    return "Flex Capacity";
    else
      return value;


  }

  qosLabel(value: string): string {
    if (value.toUpperCase() == 'GOLD RT %')
      return "GoldRT";
    else if (value.toUpperCase() == 'GOLD NRT %')
      return "GoldNRT";
    else if (value.toUpperCase() == 'SILVER 3 %')
      return "Silver-NRT3";
    else if (value.toUpperCase() == 'SILVER 2 %')
      return "Silver-NRT2";
    else if (value.toUpperCase() == 'SILVER 1 %')
      return "Silver-NRT1";
    else if (value.toUpperCase() == 'BRONZE %')
      return "Bronze";
    else if (value.toUpperCase() == 'NETWORK %')
      return "Optus reserved";
    else if (value.toUpperCase() == 'TOTAL %')
      return "Total";
    else
      return value;


  }
  
  onOrOff(value: string): string {
    if(!value || value.toLowerCase()=='no'){
      return "OFF";
    } else {
      return "ON";
    }
  }
}
