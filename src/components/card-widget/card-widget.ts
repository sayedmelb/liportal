import { Component } from '@angular/core';
import { InputControlWidget } from '../control-widget';

@Component({
  selector: 'card-widget',
  templateUrl: 'card-widget.html'
})
export class CardWidget extends InputControlWidget {

  constructor() {
    super();
  }

  openForm() {
    if(this.schema.onClick) this.schema.onClick();
  }

}
