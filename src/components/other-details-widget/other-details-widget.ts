import { Component, Input, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { TableDisplay, TableColumn } from '../tabular-widget/tabular-widget';
import { NGXLogger } from 'ngx-logger';
import { DynamicPipe } from '../../pipes/DynamicPipe';
import { AttributeCard } from '../../models/service-details';

/**
 * Generated class for the OtherDetailsWidgetComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'other-details-widget',
  templateUrl: 'other-details-widget.html'
})
export class OtherDetailsWidgetComponent implements OnInit {

  @Input('schema') schema;
  @Input('model') model;
  @Output() onServiceClick: EventEmitter<any> = new EventEmitter();
  private isLoading: boolean;

  @ViewChild('templateServiceId') templateServiceId: TemplateRef<any>; 
  
  display: TableDisplay;

  attributeCards: Array<AttributeCard> = new Array<AttributeCard>();

  constructor(private logger: NGXLogger, private dynamicPipe: DynamicPipe) {
    //debugger;
    //console.log('Hello OtherDetailsWidgetComponent Component');
  }

  ngOnInit() {
    this.initialize();

    this.bindCards();

    this.bindTable();

    this.isLoading = false;
  }

  navigate(e) {
    debugger;
   // console.log('OtherDetailsWidgetComponent : ' + e);
    this.onServiceClick.emit(e);
  }

  bindCards() {
    let datasource: any = this.schema.datasource[0]; 
    let location = _.get(datasource, "selectedProduct.properties.location.title");
    let productName = this.dynamicPipe.networkName(_.get(datasource, "selectedProduct.properties.line").toString().replace(' ', ''));
    let networkName = _.get(datasource, "selectedProduct.properties.resource.properties.vpnName");
    let vpnMembership = _.get(datasource, "selectedProduct.properties.resource.properties.vpnInstanceId");
    let accessType = _.get(datasource, "selectedProduct.properties.service.title");
    let networkTopology = _.get(datasource, "selectedProduct.properties.topology");
   
    this.attributeCards.push(this.getAttributeCard("Service Address", location));
    //this.attributeCards.push(this.getAttributeCard("Locale", "N/A"));
    this.attributeCards.push(this.getAttributeCard("Product Name", productName));
    this.attributeCards.push(this.getAttributeCard("Network Topology", networkTopology));
    this.attributeCards.push(this.getAttributeCard("NTU", ""));
    this.attributeCards.push(this.getAttributeCard("Network Name", networkName));
    this.attributeCards.push(this.getAttributeCard("VPN Instance Id", vpnMembership));
    this.attributeCards.push(this.getAttributeCard("Access Type", accessType));
    this.attributeCards.push(this.getAttributeCard("Handoff Type", ""));
  }

  getAttributeCard(label: string, val:string) : AttributeCard {
    let schemaProdName: any = {
      label: label,
      action_type: 0
    };

    return new AttributeCard(schemaProdName, val);
  }

  bindTable() {
    let display: TableDisplay = new TableDisplay();

    let serviceIdColumn: TableColumn = new TableColumn("Service ID", "serviceId", "xl-cell-header", "xl-cell-row ", this.templateServiceId);
    let serviceAddressColumn: TableColumn = new TableColumn("Service Address", "serviceAddress", "xl-cell-header", "xl-cell-row");
    let productNameColumn: TableColumn = new TableColumn("Product Name", "productName", "xl-cell-header", "xl-cell-row");

    let data: any[] = new Array<any>();

    this.schema.datasource[0].otherEnds.forEach(element => {
      data.push(
        { 
          serviceId: element.properties.service.properties.serviceId, 
          serviceAddress: element.properties.location.title,
          productName: this.dynamicPipe.networkName(element.properties.line)
        })
    });
    
    display.columns = new Array<TableColumn>();
    display.columns.push(serviceIdColumn);
    display.columns.push(serviceAddressColumn);
    display.columns.push(productNameColumn);

    display.rows = data;

    this.display = display;
  }  

  initialize() {
    this.isLoading = true;    
  }

  ngOnDestroy() {
      delete this.isLoading;
  }  

}
