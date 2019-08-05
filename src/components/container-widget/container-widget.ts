import { Component } from '@angular/core';
import { InputControlWidget } from '../control-widget';

@Component({
  selector: 'container-widget',
  templateUrl: 'container-widget.html'
})
export class ContainerWidget extends InputControlWidget{

  constructor() {
    super();
  }

}