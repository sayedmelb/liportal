import { Component } from '@angular/core';
import { InputControlWidget } from '../control-widget';

@Component({
  selector: 'report-widget',
  templateUrl: 'report-widget.html'
})
export class ReportWidget extends InputControlWidget {

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.schema.onLoad) this.schema.onLoad();
  }

}
