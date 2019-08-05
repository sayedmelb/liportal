import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { InputControlWidget } from '../control-widget';
import { ShowHideChild } from '../../providers/show-hide-child/show-hide-child';
import { DynamicService } from '../../providers/dynamic-service/dynamic-service';

@Component({
  selector: 'dynamic-flex-review',
  templateUrl: 'dynamic-flex-review.html'
})

export class DynamicFlexReviewComponent extends InputControlWidget {
  
  @Input() getFlexStatus: string;
  @Output() getFlexStatusChange = new EventEmitter<string>();
  @Output() getFlexStatusChange2 = new EventEmitter<string>();
  public data;
  public dataDynamic;
  tnc:boolean = false;
  isValid: boolean = true;
  isSaveLatter: boolean = false;

  constructor(_dataService: DynamicService, public viewCtrl: ViewController, public sibling: ShowHideChild) {
    super();
    this.data = _dataService.getOption();
  }

  ngOnInit() {
    super.ngOnInit();
    this.parent = this.schema.getParent();
    this.dataDynamic = this.parent.getValue("configure");
  }

  closeModel() {
    this.viewCtrl.dismiss();
  }

  goToNext() {
    if (this.isValid) {
      var parent = this.schema.getParent();
      this.sibling.updateSibling(parent.fieldsets[0].fields[2]);
    }
  }

  saveforLatter(e) {
    this.isSaveLatter = true;
  }

  goToPrevious() {
    if (this.isValid) {
      var parent = this.schema.getParent();
      this.sibling.updateSibling(parent.fieldsets[0].fields[0]);
    }
  }

  totalCost() {
    return parseFloat(this.data.siteaFlexTotal) + parseFloat(this.data.sitebFlexTotal);
  }

  getFlexDown() {
    if (this.data.flexDown == 'balanceddown')
      return 'Balanced';
    if (this.data.flexDown == 'relaxeddown')
      return 'Relaxed';
    if (this.data.flexDown == 'aggresivedown')
      return 'Aggresive';
    if (this.data.flexDown == 'customdown')
      return 'Custom';
  }

  getWeekDaysList() {
    let weeklist = "";
    let flag = false;
    if (this.data.weekFlexDays.mon == true) {
      weeklist = weeklist + 'Monday';
      flag = true;
    }
    if (this.data.weekFlexDays.tue == true) {
      if (flag == true)
        weeklist = weeklist + ', Tuesday';
      else
        weeklist = weeklist + 'Tuesday';
      flag == true;
    }
    if (this.data.weekFlexDays.wed == true) {
      if (flag == true)
        weeklist = weeklist + ', Wednesday';
      else
        weeklist = weeklist + 'Wednesday';
      flag == true;
    }
    if (this.data.weekFlexDays.thu == true) {
      if (flag == true)
        weeklist = weeklist + ', Thursday';
      else
        weeklist = weeklist + 'Thursday';
      flag == true;
    }
    if (this.data.weekFlexDays.fri == true) {
      if (flag == true)
        weeklist = weeklist + ', Friday';
      else
        weeklist = weeklist + 'Friday';
      flag == true;
    }
    if (this.data.weekFlexDays.sat == true) {
      if (flag == true)
        weeklist = weeklist + ', Saturday';
      else
        weeklist = weeklist + 'Saturday';
      flag == true;
    }
     if (this.data.weekFlexDays.sun == true) {
      if (flag == true)
        weeklist = weeklist + ' and Sunday';
      else
        weeklist = weeklist + 'Sunday';
      flag == true;
    }
    return weeklist;
  }

  openTnC() {
    if (this.tnc) {
      this.tnc = false;
    } else {
      this.tnc = true;
    }  
  }

}
