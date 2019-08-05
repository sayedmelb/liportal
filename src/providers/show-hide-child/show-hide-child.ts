import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ShowHideChild {

  private sibling = new BehaviorSubject('configure');
  public getSibling = this.sibling.asObservable();

  constructor(public http: HttpClient) {
  }

  updateSibling(value: string) {
    this.sibling.next(value);
  }

}
