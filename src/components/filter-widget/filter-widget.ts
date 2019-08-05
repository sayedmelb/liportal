import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'filter-widget',
  templateUrl: 'filter-widget.html'
})

export class Filters {
  private callback;
  private filters;
  private keys;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.callback = navParams.data.callback;
    this.filters = navParams.data.filters;
    this.keys = Object.keys(this.filters);
    this.checkAll();
  }

  private getKeys (values) {
    return Object.keys(values);
  }

  private checkAll () {
    this.keys.forEach(key => {
      let all = true;
      Object.keys(this.filters[key].values).forEach((keyvalue) => {
        if (!this.filters[key].values[keyvalue]) {
          all = false;
          return
        }
      });
      this.filters[key].all = all;
    });
    this.callback(this.filters);
  }

  private clickAll(key: string, all) {
    if (all) Object.keys(this.filters[key].values).forEach((keyvalue) => this.filters[key].values[keyvalue] = true);
    else Object.keys(this.filters[key].values).forEach((keyvalue) => this.filters[key].values[keyvalue] = false);
    this.callback(this.filters);
  }
}
