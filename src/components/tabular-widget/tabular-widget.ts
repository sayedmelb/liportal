import { Component, Input, OnInit, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { InputControlWidget } from '../control-widget';
import { thresholdFreedmanDiaconis } from 'd3';
import { Searchbar } from 'ionic-angular';

/**
 * Generated class for the TabularWidgetComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tabular-widget',
  templateUrl: 'tabular-widget.html'
})
export class TabularWidgetComponent implements OnInit {

  @Input() data: TableDisplay;
  @Output() onColumnClick: EventEmitter<any> = new EventEmitter();

  styles: any = {};

  my_messages = {
    'totalMessage': ''
  };

  rows: any[];
  temp: any[];
  columns: TableColumn[];

  private showIndex: number = -1;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  onActivate(event) {
    if(event.type == 'click') {
      //console.log(event.row);
      this.onColumnClick.emit(event.row);
    }
  }

  setStyle(rowIndex) {
    this.styles["display"] = rowIndex == this.showIndex ? 'none' : 'block';

    return this.styles;
  }

  onSelect({ selected }) {    
  }  

  ngOnInit() {
    this.data.table = this;
    this.columns = this.data.columns;
    this.rows = this.data.rows;
    this.temp = this.data.rows;
  }
  
  refresh() {
    this.columns = this.data.columns;
    this.rows = this.data.rows;
    this.temp = this.data.rows;

    this.table.offset = 0;
  }
  
  noop() {}

  getRowClass = (row) => {
    if (row["selectedRow"] != null) {
      return {
        'highlighted-row': true
      };      
    }
 }

}

export enum ColumnTemplateType {
  ExpandedText
}

export class TableDisplay {
  columns: TableColumn[];
  rows: any[];
  tempRows: any[];

  table: TabularWidgetComponent;
}

export class TableColumn {
  title: string;
  prop: string;
  headerClass: string;
  cellClass: string;
  headerTemplate: TemplateRef<any>;
  template: TemplateRef<any>;
  columnTemplateType: ColumnTemplateType;

  constructor(title: string, prop: string, 
                headerClass: string, 
                cellClass: string, 
                template: TemplateRef<any> = null, 
                columnTemplateType: ColumnTemplateType = null, 
                headerTemplate: TemplateRef<any> = null) {
    this.title = title;
    this.prop = prop;
    this.headerClass = headerClass;
    this.cellClass = cellClass;
    this.template = template;
    this.headerTemplate = template;
    this.columnTemplateType = columnTemplateType;
  }
}

export class TableRow {
  rowNum: number;
}


