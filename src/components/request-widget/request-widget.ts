import { Component, ViewChild, TemplateRef, OnInit,HostListener } from '@angular/core';

import { TableDisplay, TableColumn, ColumnTemplateType } from '../tabular-widget/tabular-widget'
import { ExportToExcelBase, CsvService } from '../../providers/csv-service/csv-service';

/**
 * Generated class for the RequestWidgetComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'request-widget',
  templateUrl: 'request-widget.html'
})
export class RequestWidgetComponent implements OnInit {

  private isLoading: boolean = true;
  display: TableDisplay;
  @ViewChild('templateRequestId') templateRequestId: TemplateRef<any>;
  @ViewChild('templateStatus') templateStatus: TemplateRef<any>;

  private showIndex: number = -1;  

  constructor(private csvService: CsvService) {
    console.log('Hello RequestWidgetComponent Component');
  }  

  ngOnInit() {    
    this.bindTable();

    this.isLoading = false;
  }

  downloadFile() {
    let exported = new Array<RequestExport>();

    this.display.rows.forEach(data => {
      var item = new RequestExport();

      item["Request ID"] = data.requestId;
      item["Opened by"] = data.openedBy;
      item["Request Type"] = data.requestType;
      item.Description = data.description;
      item.Opended = data.opened;
      item.Status = data.status;

      exported.push(item);
    });

    this.csvService.downloadFile(exported, "Requests");
  }

  setClass(status: string) {    

    switch(Status[status])
    {
      case Status["Pending Approval"]:
        return { 'purple': true };
      case Status["Saved"]:
        return { 'blue': true };
      case Status["Approved"]:
        return { 'green': true };
    }
  }   

  bindTable() {
    let display: TableDisplay = new TableDisplay();

    let requestIdColumn: TableColumn = new TableColumn("Request ID", "requestId", "xl-cell-header", "xl-cell-row", this["templateRequestId"]);
    let openedByColumn: TableColumn = new TableColumn("Opened by", "openedBy", "xl-cell-header", "xl-cell-row");
    let requestTypeColumn: TableColumn = new TableColumn("Request Type", "requestType", "xl-cell-header", "xl-cell-row");      
    let descriptionColumn: TableColumn = new TableColumn("Description", "description", "xl-cell-header", "xl-cell-row", null, ColumnTemplateType.ExpandedText);
    let openedColumn: TableColumn = new TableColumn("Opened", "opened", "xl-cell-header", "xl-cell-row");      
    let statusColumn: TableColumn = new TableColumn("Status", "status", "xl-cell-header", "xl-cell-row", this["templateStatus"]);      

    let data: any[] = new Array<any>();

    let i:number = 0;

    data.push(
      { 
        requestId: "MAN2445454", 
        openedBy: "Optus Demo User",
        requestType: "Dynamic Flex",
        description: "Turn on Dynamic Flex,Turn on Dynamic Flex,Turn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic Flex",
        opened: "1/1/2019",
        status: "Pending Approval"
      });

      data.push(
        { 
          requestId: "MAN2445455", 
          openedBy: "Optus Demo User",
          requestType: "Schedule Flex",
          description: "Turn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic Flex",
          opened: "2/2/2019",
          status: "Saved"
        });
        
      data.push(
        { 
          requestId: "MAN2445456", 
          openedBy: "Optus User",
          requestType: "Permanent Change",
          description: "Change contracted speed",
          opened: "2/2/2019",
          status: "Approved"
        });        
    
    display.columns = new Array<TableColumn>();
    display.columns.push(requestIdColumn);
    display.columns.push(openedByColumn);
    display.columns.push(requestTypeColumn);      
    display.columns.push(descriptionColumn);
    display.columns.push(openedColumn);
    display.columns.push(statusColumn);

    display.rows = data;
    display.tempRows = data;

    this.display = display;
  }

  search(event) {
    const val = event.target.value.toLowerCase();

    if (val == null || val == '') {
      this.display.rows = this.display.tempRows;
      this.display.table.refresh();      
      return;
    }

    // filter our data
    const temp = this.display.tempRows.filter(function(d) {
      return d.requestId.toLowerCase().indexOf(val) !== -1 
              || d.openedBy.toLowerCase().indexOf(val) !== -1
              || d.requestType.toLowerCase().indexOf(val) !== -1
              || d.description.toLowerCase().indexOf(val) !== -1
              || d.opened.toLowerCase().indexOf(val) !== -1
              || d.status.toLowerCase().indexOf(val) !== -1
              || !val;
    });

    // update the rows
    this.display.rows = temp;

    this.display.table.refresh();
  }  
  
}

export enum Status {
  "Pending Approval",
  "Saved",
  "Approved"
}

export class RequestExport extends ExportToExcelBase {
  "Request ID": string;
  "Opened by": string;
  "Request Type": string;
  "Description": string;
  "Opended": string;
  "Status": string;
}
