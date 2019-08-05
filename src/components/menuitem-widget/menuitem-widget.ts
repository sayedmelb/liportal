import { Component } from '@angular/core';
import { InputControlWidget } from '../control-widget';
import { SetTabProvider } from '../../providers/set-tab/set-tab';

@Component({
  selector: 'menuitem-widget',
  templateUrl: 'menuitem-widget.html'
})
export class MenuitemWidget  extends InputControlWidget{
  public color:string = 'red';
  public mouseOvered: boolean = false;
  public activeTab: String;
  public activeSecondMenu: String;

  constructor(public tab: SetTabProvider) {
    super();
    this.tab.activeTab.subscribe(tab => this.activeTab = tab);
    this.tab.activeSecondMenu.subscribe(menu => this.activeSecondMenu = menu);
  }
  
  onClick(control) {
    // window.open(this.schema.linkurl, '_self');
    //commented by syed 11 may 2019
   // if (this.schema.onClick) this.schema.onClick();
  }
}
