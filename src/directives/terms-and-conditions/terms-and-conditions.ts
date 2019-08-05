import { Component, Input, Output, EventEmitter } from "@angular/core";
import {trigger, transition, style, animate, state} from '@angular/animations';

@Component({
  selector: "terms-and-conditions",
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: "terms-and-conditions.html"
})

export class TermsAndConditions {
  @Input("schema") schema: any; 

  @Output() valueChange = new EventEmitter();

  show: boolean = true;
  termsAndConditions: Array<any>;
  constructor() {}
  
  ngOnInit() {
    this.termsAndConditions = this.schema;
  }

  toggle() {
    this.show = !this.show;
  }
}
