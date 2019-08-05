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
  selector: "add-contact",
  templateUrl: "add-contact.html"
})

export class AddContact {
  @Input("schema") schema: any;
  @Input("model") model: any;
  
  public dynamicdata: any;
  networkType: string = "P2P";

  show: boolean = false;

  



  constructor(public permdataService: DynamicService, private externalProvider: ExternalProvider, private http: HttpClient, private logger: NGXLogger) {

    this.dynamicdata = permdataService.getOption();
  }

  ngOnInit() {
    
  
  }
 

  toggle() {
    this.show = !this.show;
  }







}
