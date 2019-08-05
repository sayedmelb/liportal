import { Injectable } from "@angular/core";
import { DefaultWidgetRegistry } from "angular2-schema-form";
import { StringWidgetComponent } from "../../components/string-widget/string-widget";
import { ObjectWidget } from "../../components/object-widget/object-widget";
import { TabWidget } from "../../components/tab-widget/tab-widget";
import { MapWidget } from "../../components/map-widget/map-widget";
import { TopmenuWidget } from "../../components/topmenu-widget/topmenu-widget";
import { SubmenuWidget } from "../../components/submenu-widget/submenu-widget";
import { MenuitemWidget } from "../../components/menuitem-widget/menuitem-widget";
import { BlankWidget } from "../../components/blank-widget/blank-widget";
import { ScheduledFlexWidget } from "../../components/scheduled-flex-widget/scheduled-flex-widget";
import { ScheduledFlexConfigureWidget } from "../../components/scheduled-flex-configure-widget/scheduled-flex-configure-widget";
import { DynamicWidget } from "../../components/dynamic-flex/dynamic-flex";
import { ScheduledFlexReviewWidget } from "../../components/scheduled-flex-review-widget/scheduled-flex-review-widget";
import { ScheduledFlexConfirmWidget } from "../../components/scheduled-flex-confirm-widget/scheduled-flex-confirm-widget";
import { ReportWidget } from "../../components/report-widget/report-widget";
import { DynamicFlexConfigureComponent } from "../../components/dynamic-flex-configure/dynamic-flex-configure";
import { ContainerWidget } from "../../components/container-widget/container-widget";
import { CardWidget } from "../../components/card-widget/card-widget";
import { DynamicFlexReviewComponent } from "../../components/dynamic-flex-review/dynamic-flex-review";
import { DynamicFlexConfirmComponent } from "../../components/dynamic-flex-confirm/dynamic-flex-confirm";
import { TableWidget } from "../../components/table-widget/table-widget";
import { DocumentWidget } from "../../components/document-widget/document-widget";
import { SectionWidget } from "../../components/section-widget/section-widget";
import { PermanentWidget} from "../../components/permanent-widget/permanent-widget";
import { ConfigureWidget } from "../../components/configure-widget/configure-widget";
import { ReviewWidget } from "../../components/review-widget/review-widget";
import { ConfirmWidget } from "../../components/confirm-widget/confirm-widget";
import { ServiceDetail } from "../../components/service-detail/service-detail";
import {RequestWidgetComponent} from "../../components/request-widget/request-widget";
import {ActivityLogComponent} from "../../components/activity-log/activity-log";
import { ServiceDetailsCardsComponent } from "../../components/service-details-cards/service-details-cards";
import { OndemandFlex } from "../../components/ondemand-flex/ondemand-flex";
import { OndemandFlexConfigure } from "../../components/ondemand-flex-configure/ondemand-flex-configure";
import { OndemandFlexReview } from "../../components/ondemand-flex-review/ondemand-flex-review";
import { OndemandFlexConfirm } from "../../components/ondemand-flex-confirm/ondemand-flex-confirm";
import { OndemandContainer } from "../../components/ondemand-container/ondemand-container";
import { OndemandConfigure } from "../../components/ondemand-configure/ondemand-configure";
import { TableauPoc } from "../../components/tableau-poc/tableau-poc";
import { OndemandReview } from "../../components/ondemand-review/ondemand-review";
import { OndemandConfirm } from "../../components/ondemand-confirm/ondemand-confirm";






@Injectable()
export class WidgetsProvider extends DefaultWidgetRegistry{
	constructor() {
		super();
		this.register("string",  StringWidgetComponent);
		this.register("object",  ObjectWidget);
		this.register("tab",  TabWidget);
		this.register("map", MapWidget);
		this.register("menu", TopmenuWidget);
		this.register("submenu", SubmenuWidget);
		this.register("menuitem", MenuitemWidget);
		this.register("blank", BlankWidget);
		this.register("schedule", ScheduledFlexWidget);
		this.register("sliding-content", ScheduledFlexConfigureWidget);
		this.register("sliding-review", ScheduledFlexReviewWidget);
		this.register("sliding-confirm", ScheduledFlexConfirmWidget);
		this.register("dynamic", DynamicWidget);
    	this.register("ondemand", OndemandFlex);
		this.register("sliding-content-dynamic", DynamicFlexConfigureComponent); 
		this.register("sliding-content-ondemand", OndemandFlexConfigure);
		this.register("sliding-review-dynamic", DynamicFlexReviewComponent);
		this.register("sliding-review-ondemand",OndemandFlexReview);
		this.register("sliding-confirm-dynamic", DynamicFlexConfirmComponent);
		this.register("sliding-confirm-ondemand", OndemandFlexConfirm);
		this.register("ondemand-container", OndemandContainer);
		this.register("ondemand-configure", OndemandConfigure);
		this.register("ondemand-review", OndemandReview);
		this.register("report", ReportWidget);
		this.register("container", ContainerWidget);
		this.register("card", CardWidget);
		this.register("table", TableWidget);
		this.register("document", DocumentWidget);
		this.register("section", SectionWidget);
		this.register("permanent", PermanentWidget);
		this.register("configure-general", ConfigureWidget);
		this.register("review-general", ReviewWidget);
		this.register("confirm-general",ConfirmWidget);
		this.register("service-detail",ServiceDetail);
		this.register("request-widget",RequestWidgetComponent);
		this.register("activity-log",ActivityLogComponent);
		this.register("tableau-poc",TableauPoc);
		this.register("ondemand-confirm",OndemandConfirm);
		
		
		
		// this.register("sd-cards", ServiceDetailsCardsComponent);

	}
}
