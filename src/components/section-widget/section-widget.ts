import { Component, Output, EventEmitter } from '@angular/core';
import { InputControlWidget } from "../control-widget";

@Component({
  selector: 'section-widget',
  templateUrl: 'section-widget.html'
})
export class SectionWidget  extends InputControlWidget {
  //@Output radiotype: any
 // @Output() radiotype = new EventEmitter<any>();

  constructor() {
    super();
   // this.radiotype.emit({type: 'portcapacity'});
  }

  getTemplate() {
    let template;
    if (this.schema.getTemplateforSummary)
      this.schema.getTemplateforSummary(data => {
        template = data;
      });
    return template || "";
    // return "Hello Fromm Get Template"
  }


}
