import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AttributeCard } from '../../models/service-details';
import { InputControlWidget } from '../control-widget';
import { NGXLogger } from 'ngx-logger';
import * as _ from 'lodash';
import { AttributesService } from '../../providers/utils/attributes-service';
import { DynamicPipe } from '../../pipes/DynamicPipe';

@Component({
  selector: 'service-details-cards',
  templateUrl: 'service-details-cards.html'
})
export class ServiceDetailsCardsComponent{

  @Input("schema") schema: any;
  @Input("model") model: any;
  @Input("parentschema") parentschema: any;
  @Input("pageName") pageName: string;
  @Output() networkUpdate = new EventEmitter();

  attributeCards: Array<AttributeCard> = new Array<AttributeCard>();
  showError: boolean = false;
  constructor(private logger: NGXLogger, private attributeService: AttributesService, private dynamicPipe: DynamicPipe) {    
    // super();
  }  

  ngOnInit() {
    this.logger.info("Schema for SD Detail Cards", this.schema, this.model, this.schema.default);
    this.networkUpdate.emit({linetype: this.schema.selectedProduct.properties.line}); 
    let topology = _.get(this.schema, "selectedProduct.properties.topology");
    let productType = _.get(this.schema, "selectedProduct.properties.line");
    try{
      this.attributeCards = this.attributeService.get(this.pageName, topology, productType, this.model[0], this.schema.selectedProduct);
      this.showError = false;
    } catch(e){
      this.showError = true;
    }
    this.logger.info("Attributes Card object ==== ", this.attributeCards);
    // let keys = Object.keys(this.schema.schema);

    // keys.forEach(key => {
    //   var m = this.model.find(x => x[key]);
    //   if(m) this.attributeCards.push(new AttributeCard(this.schema.schema[key], m[key]));
    // });    
  }

}
