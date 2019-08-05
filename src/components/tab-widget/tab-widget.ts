import { Component, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { InputControlWidget } from '../control-widget';
import { SetTabProvider } from '../../providers/set-tab/set-tab';
import { TabService } from '../../providers/tab-service/tab-service';
import { NGXLogger } from 'ngx-logger';

@Component({
	selector: 'tab-widget',
	templateUrl: 'tab-widget.html'
})
export class TabWidget extends InputControlWidget {
	private propertiesBehaviour: any = {};
	//@Output() showServiceList = new EventEmitter();
	showlist: boolean = true;
	tabdata: any;
	serviceid: string = '';


	subSelected: string = 'pop';
	headerTitle: string = "Optus Liquid Infrastructure"

	@ViewChild('tabContent') tabContent: any;

	ngOnInit() {
		super.ngOnInit();
		//this.showServiceList.emit(this.showlist);
		this.subSelected = this.formProperty.schema.tabs[0].id;
		this.formProperty.schema.fieldsets.forEach((fieldset) => {
			fieldset.fields.forEach((propertyId) => {
				this.propertiesBehaviour[propertyId] = this.formProperty.schema.getBehaviour(propertyId);
			})
		})
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.tabContent.instance.refresh();
	}

	constructor(private tab: SetTabProvider, public tabservice: TabService, private logger: NGXLogger) {
		super();
		this.tabdata = this.tabservice.getOption();
	}

	updateHeader(tab) {
		this.tab.setActiveTab(tab.title);
		this.headerTitle = tab.heading; 
	}

	selectSub(cat, cont) {
		// this.logger.debug("cat", cat);
		// this.logger.debug("cont", cont);
		this.tabservice.setOption("showServiceList", true);

		this.subSelected = cat;
		cont.instance.navigate(cat, true);
	}


	showTabList() {
		if (this.tabdata.hasOwnProperty("showServiceList")) {
			if (this.tabdata.showServiceList == false) {
				this.serviceid = this.tabdata.serviceID;
				return false;
			}
			else {
				return true;
			}

		} else
			return true;

	}

	showServiceList() {
		if (this.headerTitle == "Services") {
			this.tabservice.setOption("showServiceList", true);

		}
	}



	content = '<a href="http://google.com">Link text <span>Nested text</span></a>'

	 settings: any = {
		layout: 1,
		paging: true,
		threshold: 15,
		onAnimationEnd: (event, inst) => {
			if (event.destinationX != event.originX) {
				this.parent.getRoot().scrollToTop();
				let tab = this.formProperty.schema.tabs[Math.abs(-(event.destinationX / inst.contWidth)).toFixed()];
				if (tab) {
					this.subSelected = tab.id;
				}
			}
		}
	}
	doSomething(e) {
		let target = e.target;

		while (target !== e.currentTarget) {
			if (target.tagName == 'A') return;
			target = target.parentNode;
		}

		alert('do something')
	}

	preventScroll(e) {
		let target = e.target;
		
		while (target !== e.currentTarget) {
			if (target.tagName == 'BUTTON' || target.tagName == 'IMG' || target.tagName == 'ION-ICON') {
				return;
			}
			//  else if( this.tabdata.hasOwnProperty("infowindowState")) {
			// 	if(this.tabdata.infowindowState ==true)
			// 	return;

			// }
			target = target.parentNode;
		}

		e.stopPropagation();

	 }

}