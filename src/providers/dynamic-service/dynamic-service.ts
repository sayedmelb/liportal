import { Injectable, OnDestroy } from '@angular/core';  
import { NGXLogger } from 'ngx-logger';
  
@Injectable()  
export class DynamicService  {  
  constructor(private logger: NGXLogger){}
  private data = {};  
  
 setOption(option, value) {      
    this.data[option] = value;  
  }  
  
  getOption() {  
    return this.data;  
  }  
  ngOnDestroy(){
    this.logger.debug('service destroyed');
  }

  
}  