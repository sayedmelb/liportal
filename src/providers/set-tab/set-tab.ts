import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SetTabProvider {

  private tab = new BehaviorSubject('Dasboard');
  activeTab = this.tab.asObservable();
  // private secondMenu = new BehaviorSubject('SDx');
  private secondMenu = new BehaviorSubject('Liquid Infrastructure');
  activeSecondMenu = this.secondMenu.asObservable();

  constructor(public http: HttpClient) {
  }

  setActiveTab(tab: string) {
    this.tab.next(tab);
  }

  setSecondMenu(menu: string) {
    this.secondMenu.next(menu);
  }

}
