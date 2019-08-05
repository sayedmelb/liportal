import { Component, TemplateRef, ViewChild, OnInit, ElementRef } from '@angular/core';
import {DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'tableau-poc',
  templateUrl: 'tableau-poc.html'
})
export class TableauPoc  {

  public url: any;// = "https://obionetableau.optus.com.au/#/signin?redirect=%2Fsite%2FOBiOne%2Fviews%2FClientDeliveryPortal%2FClientDeliveryPortal%3F:iid%3D1&error=42&disableAutoSignin=true";
 public tableauHtml: any;
  private isLoading: boolean = true;
  trustedDashboardUrl: SafeResourceUrl;
  
  public urlstr1 = "http://localhost:8101/projectorders";
  public urlstr2 = "https://obionetableau.optus.com.au/#/site/OBiOne/views/SNOWHighPriorityIncidentDashboard/HighPriorityIncidentTracker?:iid=2&output=embed";
  public urlstr3 = "https://google.com/custom?q=test&btnG=Search"; //"google.com/search?igu=1";
  public urlstr4 = "http://umelad80.corp.uecomm.com.au/tableau/#/site/OBiOne/views/SNOWHighPriorityIncidentDashboard/HighPriorityIncidentTracker?:iid=2"
  public urlstr5 = "../../assets/tableau.html";
  constructor(private elRef:ElementRef, private sanitizer:DomSanitizer) {
    //console.log('Hello TableauPoc Component');
//    this.tableauHtml = this.getInnerHtmlVal();
    //private hostElement: ElementRef,
  }

  getInnerHtmlVal(){
    return this.sanitizer.bypassSecurityTrustHtml('https://obionetableau.optus.com.au/#/site/OBiOne/views/SNOWHighPriorityIncidentDashboard/HighPriorityIncidentTracker?:iid=2');
  }


  ngOnInit() {    
    // this.trustedDashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlstr2);
    // const iframe = this.elRef.nativeElement.querySelector('iframe');
    // iframe.src = this.trustedDashboardUrl ;
    // this.isLoading = false;
  }

  

 

 

 
}
