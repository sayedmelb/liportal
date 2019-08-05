import { Component } from '@angular/core';
import { InputControlWidget } from '../control-widget';
import { SetTabProvider } from '../../providers/set-tab/set-tab';

@Component({
  selector: 'submenu-widget',
  templateUrl: 'submenu-widget.html'
})
export class SubmenuWidget extends InputControlWidget {
  public display: boolean = false;
  public secondMenu: string;
  
  constructor(private tab: SetTabProvider) {
    super();
    this.tab.activeSecondMenu.subscribe(menu => {
      this.secondMenu = menu;
    });
  }

  setClass(sub: string) {
    if (sub == 'triangle')
      return {
        'segment-triangle-margin': true
      }
    if (sub == 'nav1' || sub == 'nav2')
      return {
        'segment-no-border': true
      }
  }

  setDisplayStatus(sub: string) {
    if (sub == 'home') {
      this.display = true;
      return true;
    }
    else {
      this.display = false;
      return false;
    }
  }

  selectMenu(formProperty, menu) {
    this.tab.setSecondMenu(formProperty.getProperty(menu).schema.title);
  }
}
