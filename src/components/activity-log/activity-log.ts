import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { TableDisplay, TableColumn, ColumnTemplateType } from '../tabular-widget/tabular-widget';

import { mobiscroll, MbscCalendarOptions } from '@mobiscroll/angular';
import { Stringifiable } from 'd3';
import { CsvService } from '../../providers/csv-service/csv-service';

/**
 * Generated class for the ActivityLogComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'activity-log',
  templateUrl: 'activity-log.html'
})
export class ActivityLogComponent implements OnInit {

  searchTerm: string;
  startDate: Date;
  endDate: Date;

  private isLoading: boolean = true;
  display: TableDisplay;
  @ViewChild('templateId') templateId: TemplateRef<any>;
  
  

  max: Array<Date>;

  constructor(private csvService: CsvService) {
    //console.log('Hello ActivityLogComponent Component');
  }

  maxSettings: MbscCalendarOptions = {
    display: 'bubble',
    select: 2,
    headerText: 'Pick start and end dates',
    theme: 'material-indigo',
    onShow: (event, inst) => {      
      inst.markup.childNodes[0].style.height="100%";      
    }
  };

  ngOnInit() {    
    this.bindTable();

    this.isLoading = false;
  }

  trapReturn(event) {
    if (event.key === "Enter") {
      this.searchFor();
    }
  }
  
  downloadFile() {
    let exported = new Array<ActivityLogExport>();

    this.display.rows.forEach(data => {
      var item = new ActivityLogExport();

      item["\"ID\""] = data.id;
      item.User = data.user;
      item.Type = data.type;
      item.Date = data.date;
      item.Description = data.description;
      
      exported.push(item);
    });

    this.csvService.downloadFile(exported, "ActivityLogs");
  }  

  searchFor() {
    if (this.max) {
      this.search(this.searchTerm, new Date(this.max[0]), new Date(this.max[1]));
    }    
    else {
      this.search(this.searchTerm);
    }
  }

  search(term: string = null, startDate: Date = null, endDate: Date = null) {
    const val = this.searchTerm;

    if ((!startDate || !endDate) && (val == null || val == '')) {
      this.display.rows = this.display.tempRows;
      this.display.table.refresh();      
      return;
    }

    // filter our data
    const temp = this.display.tempRows.filter(function(d) {
      return  !val ? 
              (
                startDate != null && endDate != null ?  new Date(d.date) >= startDate && new Date(d.date) <= endDate : true
              )
              :
              (
              (d.id.toLowerCase().indexOf(val) !== -1 
              || d.user.toLowerCase().indexOf(val) !== -1
              || d.type.toLowerCase().indexOf(val) !== -1
              || d.date.toLowerCase().indexOf(val) !== -1
              || d.description.toLowerCase().indexOf(val) !== -1
              )
              && ((!startDate && !endDate) ? 
              true :
              (
                startDate != null && endDate != null ?  new Date(d.date) >= startDate && new Date(d.date) <= endDate : true
              ))
              )
    });

    // update the rows
    this.display.rows = temp;

    this.display.table.refresh();
  } 

  bindTable() {
    let display: TableDisplay = new TableDisplay();

    let idColumn: TableColumn = new TableColumn("ID", "id", "xl-cell-header", "xl-cell-row", this["templateId"]);
    let userColumn: TableColumn = new TableColumn("User", "user", "xl-cell-header", "xl-cell-row");
    let typeColumn: TableColumn = new TableColumn("Type", "type", "xl-cell-header", "xl-cell-row");      
    let dateColumn: TableColumn = new TableColumn("Date", "date", "xl-cell-header", "xl-cell-row");
    let descriptionColumn: TableColumn = new TableColumn("Description", "description", "xl-cell-header", "xl-cell-row", null, ColumnTemplateType.ExpandedText);      

    let data: any[] = new Array<any>();

    let i:number = 0;

    data.push(
      { 
        id: "1", 
        user: "Optus Demo User",
        type: "Dynamic Flex",
        description: "Turn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic Flex",
        date: "1/1/2019"
      });

      data.push(
        { 
          id: "2", 
          user: "Optus Demo User",
          type: "Schedule Flex",
          description: "Turn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic FlexTurn on Dynamic Flex",
          date: "2/2/2019"
        });
        
      data.push(
        { 
          id: "3", 
          user: "Optus User",
          type: "Permanent Change",
          description: "Change contracted speed",
          date: "2/2/2019"
        });        
    
    display.columns = new Array<TableColumn>();
    display.columns.push(idColumn);
    display.columns.push(userColumn);
    display.columns.push(typeColumn);      
    display.columns.push(dateColumn);
    display.columns.push(descriptionColumn);

    display.rows = data;
    display.tempRows = data;

    this.display = display;
  }  
}

export class ActivityLogExport {
  "\"ID\"": string;
  User: string;
  Type: string;
  Date: string;
  Description: string;
}
