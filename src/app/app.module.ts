import { MbscModule } from '@mobiscroll/angular';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgCircleProgressModule } from 'ng-circle-progress';

// Native
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';
import { NguiMapModule } from '@ngui/map';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng5SliderModule } from 'ng5-slider';
import { D3Service } from 'd3-ng2-service';

// App specific
import { TemplatePage } from '../pages/template/template';
import { RootPage } from './root.page';

// Providers
import { PartyProvider } from '../providers/party/party';
import { ExternalProvider } from '../providers/external/external';
import { LongAlerts } from '../providers/external/external';
import { SetTabProvider } from '../providers/set-tab/set-tab';

// Schema Form modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchemaFormModule, WidgetRegistry } from "angular2-schema-form";
import { WidgetsProvider } from '../providers/widgets/widgets';

// Directives
import { Sidebar } from "../directives/sidebar/sidebar";
import { NetworkDiagram } from "../directives/network-diagram/network-diagram";
import { RadioList } from "../directives/radio-list/radio-list";
import { TwoButtonCombo } from "../directives/two-button-combo/two-button-combo";
import { ToggleCombo } from "../directives/toggle-combo/toggle-combo";
import { Slider } from "../directives/slider/slider";
import { SliderSchedule} from "../directives/slider-schedule/slider-schedule";
import { ButtonList } from "../directives/button-list/button-list";
import { NavigationButtonList } from "../directives/navigation-button-list/navigation-button-list";
import { ActionCheckbox } from "../directives/action-checkbox/action-checkbox";
import { ReviewChange } from "../directives/review-change/review-change";
import { ReadOnlyLabel } from "../directives/readonly-label/readonly-label";
import { TermsAndConditions } from "../directives/terms-and-conditions/terms-and-conditions";
import { InfoIcon } from "../directives/info-icon/info-icon";
import { CostSummary } from "../directives/cost-summary/cost-summary";
import { CostSummarySchedule } from "../directives/cost-summary-schedule/cost-summary-schedule";
import { SpeedSummary } from "../directives/speed-summary/speed-summary";
import { FlexScheduleReview } from '../directives/flex-schedule-review/flex-schedule-review';
import { SpeedSummarySchedule } from '../directives/speed-summary-schedule/speed-summary-schedule';
import { ReviewPortCapacity } from "../directives/review-port-capacity/review-port-capacity";
import { ReviewFlexCapacity } from "../directives/review-flex-capacity/review-flex-capacity";
import { ReviewVlan } from "../directives/review-vlan/review-vlan";
import { AddContact } from "../directives/add-contact/add-contact";
import { ReviewProactiveMonitoring } from "../directives/review-proactive-monitoring/review-proactive-monitoring";
import { ToggleMono } from "../directives/toggle-mono/toggle-mono";
import { ReviewQos } from "../directives/review-qos/review-qos";
import { TimeSetterDual } from "../directives/time-setter-dual/time-setter-dual";
import { DateSetterDual } from "../directives/date-setter-dual/date-setter-dual";
import { DateSetterMono } from "../directives/date-setter-mono/date-setter-mono";
import { CheckboxSetter } from "../directives/checkbox-setter/checkbox-setter";


// Pipes
import { DynamicPipe } from '../pipes/DynamicPipe';
import { StatusPipe } from '../pipes/StatusPipe';

// Component Specific
import { PopoverWidget } from '../components/popover-widget/popover-widget';
import { GraphWidget } from '../components/graph-widget/graph-widget'
import { StringWidgetComponent } from '../components/string-widget/string-widget';
import { ObjectWidget } from '../components/object-widget/object-widget';
import { TabWidget } from '../components/tab-widget/tab-widget';
import { MapWidget } from '../components/map-widget/map-widget';
import { TopmenuWidget } from '../components/topmenu-widget/topmenu-widget';
import { SubmenuWidget } from '../components/submenu-widget/submenu-widget';
import { MenuitemWidget } from '../components/menuitem-widget/menuitem-widget';
import { BlankWidget } from '../components/blank-widget/blank-widget';
import { ScheduledFlexConfigureWidget } from '../components/scheduled-flex-configure-widget/scheduled-flex-configure-widget';
import { ScheduledFlexReviewWidget } from '../components/scheduled-flex-review-widget/scheduled-flex-review-widget';
import { ScheduledFlexConfirmWidget } from '../components/scheduled-flex-confirm-widget/scheduled-flex-confirm-widget';
import { ScheduledFlexWidget } from '../components/scheduled-flex-widget/scheduled-flex-widget';
import { Controls } from '../components/control-widget/control-widget';
import { DynamicWidget } from '../components/dynamic-flex/dynamic-flex';
import { OndemandFlex } from "../components/ondemand-flex/ondemand-flex";
import { OndemandContainer } from "../components/ondemand-container/ondemand-container";
import { OndemandConfigure } from "../components/ondemand-configure/ondemand-configure";
import { DynamicFlexConfigureComponent } from '../components/dynamic-flex-configure/dynamic-flex-configure';
import { OndemandFlexConfigure } from "../components/ondemand-flex-configure/ondemand-flex-configure";
import { DynamicFlexReviewComponent } from '../components/dynamic-flex-review/dynamic-flex-review';
import { OndemandFlexReview } from "../components/ondemand-flex-review/ondemand-flex-review";
import { OndemandReview } from '../components/ondemand-review/ondemand-review';
import { DynamicFlexConfirmComponent } from '../components/dynamic-flex-confirm/dynamic-flex-confirm';
import { OndemandFlexConfirm } from "../components/ondemand-flex-confirm/ondemand-flex-confirm";
import { PermanentWidget } from "../components/permanent-widget/permanent-widget";
import { ConfigureWidget } from "../components/configure-widget/configure-widget";
import { ReviewWidget } from "../components/review-widget/review-widget";
import { ConfirmWidget } from "../components/confirm-widget/confirm-widget";
import { ServiceLevel } from "../components/service-level/service-level";
import { ServiceDetail } from "../components/service-detail/service-detail";
import { PortDetailsWidget } from "../components/port-details-widget/port-details-widget";
import { FlexScheduling } from "../components/flex-scheduling/flex-scheduling";
import { CalendarWidgetComponent } from "../components/calendar-widget/calendar-widget";
import { EventsCalendar } from "../components/events-calendar/events-calendar";
import { ScheduleOpener } from '../components/schedule-opener/schedule-opener';
import { FlexSpeedOpener } from '../components/flex-speed-opener/flex-speed-opener';
import { FlexRules } from '../components/flex-rules/flex-rules';
import { FlexRulesDown } from '../components/flex-rules-down/flex-rules-down';
import { TimeBox } from "../components/time-box/time-box";
import { SpendCap } from "../components/spend-cap/spend-cap";

import { ServiceDetailsCardComponent } from "../directives/service-details-card/service-details-card";
import { ServiceDetailsCardsComponent } from "../components/service-details-cards/service-details-cards";
import { FlexLayoutModule } from '@angular/flex-layout';

import { ShowHideChild } from '../providers/show-hide-child/show-hide-child';
import { DynamicService} from '../providers/dynamic-service/dynamic-service';
//import { ServiceRefresh} from "../providers/service-refresh/service-refresh";
import { AttributesService } from '../providers/utils/attributes-service';
import { ReportWidget } from '../components/report-widget/report-widget';
import { ContainerWidget } from '../components/container-widget/container-widget';
import { CardWidget } from '../components/card-widget/card-widget';
import { Filters } from '../components/filter-widget/filter-widget';
import { TableWidget } from '../components/table-widget/table-widget';
import { DocumentWidget } from '../components/document-widget/document-widget';
import { SectionWidget } from '../components/section-widget/section-widget';
import { OtherServicesWidget } from '../components/other-services-widget/other-services-widget';
import { DscpWidget } from '../components/dscp-widget/dscp-widget';
import { MessageWidget} from '../components/message-widget/message-widget';
import { Button } from '@mobiscroll/angular/src/js/classes/button';
import { UpperCasePipe } from '@angular/common';
import { TabService } from '../providers/tab-service/tab-service';
import { RefreshService } from "../providers/refresh-service/refresh-service"
import { NGXLogger } from 'ngx-logger';
import { TabularWidgetComponent } from '../components/tabular-widget/tabular-widget';
import { OtherDetailsWidgetComponent } from '../components/other-details-widget/other-details-widget';

import { PdfService } from '../providers/pdf-service/pdf-service';
import { RequestWidgetComponent } from '../components/request-widget/request-widget';
import { ActivityLogComponent } from '../components/activity-log/activity-log';
import { TableauPoc } from '../components/tableau-poc/tableau-poc';

import { CsvService } from '../providers/csv-service/csv-service';
import { directive } from '@angular/core/src/render3/instructions';
import { TooltipDirective } from '../directives/tooltip/tooltip.directive';
import { ServiceLevelWidget } from '../components/service-level-widget/service-level-widget';
import { OndemandConfirm } from '../components/ondemand-confirm/ondemand-confirm';

const routes: Routes = [
  {path:"", component: MyApp}
]
@NgModule({
  declarations: [
    MyApp,
    RootPage,
		TemplatePage,
    PopoverWidget,
    GraphWidget,
    StringWidgetComponent,
    ObjectWidget,
    TabWidget,
    MapWidget,
    TopmenuWidget,
    SubmenuWidget,
    MenuitemWidget,
    LongAlerts,
    BlankWidget,
    ScheduledFlexConfigureWidget,
    ScheduledFlexReviewWidget,
    ScheduledFlexConfirmWidget,
    ScheduledFlexWidget,
    DynamicWidget,
    OndemandFlex,
    OndemandContainer,
    OndemandConfigure,
    DynamicFlexConfigureComponent,
    OndemandFlexConfigure,
    DynamicFlexReviewComponent,
    OndemandFlexReview,
    OndemandReview,
    DynamicFlexConfirmComponent,
    OndemandFlexConfirm,
    PermanentWidget,
    ConfigureWidget,
    ReviewWidget,
    ConfirmWidget,
    PortDetailsWidget,
    ServiceLevel,
    Controls,
    ReportWidget,
    ContainerWidget,
    CardWidget,
    Sidebar,
    Slider,
    SliderSchedule,
    Filters,
    TableWidget,
    DocumentWidget,
    SectionWidget,
    OtherServicesWidget,
    DscpWidget,
    MessageWidget,
    NetworkDiagram,
    RadioList,
    TwoButtonCombo,
    ToggleCombo,
    ToggleMono,
    ButtonList,
    NavigationButtonList,
    ActionCheckbox,
    ReviewChange,
    ReadOnlyLabel,
    TermsAndConditions,
    InfoIcon,
    CostSummary,
    CostSummarySchedule,
    SpeedSummary,
    FlexScheduleReview,
    SpeedSummarySchedule,
    ReviewPortCapacity,
    ReviewFlexCapacity,
    ReviewVlan,
    AddContact,
    ReviewProactiveMonitoring,
    DynamicPipe,
    ServiceDetail,
    ServiceDetailsCardComponent,
    ServiceDetailsCardsComponent,
    StatusPipe,
    ServiceDetail,
    ReviewQos,
    TabularWidgetComponent,
    OtherDetailsWidgetComponent,
    RequestWidgetComponent,
    ActivityLogComponent,
    TableauPoc,
    CalendarWidgetComponent,
    FlexScheduling,
    TimeSetterDual,
    DateSetterDual,
    EventsCalendar,
    DateSetterMono,
    CheckboxSetter,
    ScheduleOpener,
    FlexSpeedOpener,
    FlexRules,
    FlexRulesDown,
    TimeBox,
    SpendCap,
    TooltipDirective,
    ServiceLevelWidget,
    OndemandConfirm
  ],
  imports: [ 
    MbscModule,
    HttpClientModule,
    NgxDatatableModule, 
    FormsModule, 
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    SchemaFormModule.forRoot(),
    ReactiveFormsModule,
    Ng2DeviceDetectorModule.forRoot(),
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBZ2YOJ8KI5qZERdDJVumciKredgdKRU5Q&components=country:AU&libraries=places'}),
    BrowserAnimationsModule,
    NgCircleProgressModule.forRoot(),
    Ng5SliderModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.OFF})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RootPage,
		TemplatePage,
    PopoverWidget,
    GraphWidget,
    StringWidgetComponent,
    ObjectWidget,
    TabWidget,
    MapWidget,
    TopmenuWidget,
    SubmenuWidget,
    MenuitemWidget,
    BlankWidget,
    ScheduledFlexConfigureWidget,
    ScheduledFlexReviewWidget,
    ScheduledFlexConfirmWidget,
    ScheduledFlexWidget,
    DynamicWidget,
    OndemandFlex,
    OndemandContainer,
    OndemandConfigure,
    DynamicFlexConfigureComponent,
    OndemandFlexConfigure,
    DynamicFlexReviewComponent,
    OndemandFlexReview,
    OndemandReview,
    DynamicFlexConfirmComponent,
    OndemandFlexConfirm,
    PermanentWidget,
    ConfigureWidget,
    ReviewWidget,
    ConfirmWidget,
    PortDetailsWidget,
    ServiceLevel,
    Controls,
    ReportWidget,
    LongAlerts,
    ContainerWidget,
    CardWidget,
    Sidebar,
    Slider,
    SliderSchedule,
    Filters,
    TableWidget,
    DocumentWidget,
    SectionWidget,
    OtherServicesWidget,
    DscpWidget,
    MessageWidget,
    NetworkDiagram,
    RadioList,
    TwoButtonCombo,
    ToggleCombo,
    ToggleMono,
    ButtonList,
    NavigationButtonList,
    ActionCheckbox,
    ReviewChange,
    ReadOnlyLabel,
    TermsAndConditions,
    InfoIcon,
    CostSummary,
    CostSummarySchedule,
    SpeedSummary,
    FlexScheduleReview,
    SpeedSummarySchedule,
    ReviewPortCapacity,
    ReviewFlexCapacity,
    ReviewVlan,
    AddContact,
    ReviewProactiveMonitoring,
    ServiceDetail,
    ServiceDetailsCardComponent,
    ServiceDetailsCardsComponent,
    ReviewQos,
    TabularWidgetComponent,
    OtherDetailsWidgetComponent,
    RequestWidgetComponent,
    ActivityLogComponent,
    TableauPoc,
    CalendarWidgetComponent,
    FlexScheduling,
    TimeSetterDual,
    DateSetterDual,
    EventsCalendar,
    DateSetterMono,
    CheckboxSetter,
    ScheduleOpener,
    FlexSpeedOpener,
    FlexRules,
    FlexRulesDown,
    TimeBox,
    SpendCap,
    ServiceLevelWidget,
    OndemandConfirm
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Device,
    Network,
    PartyProvider,
    ExternalProvider,
    {provide: WidgetRegistry, useClass: WidgetsProvider},
    SetTabProvider,
    ShowHideChild,
    DynamicService,
    //ServiceRefresh,
    AttributesService,
    D3Service,
    UpperCasePipe,
    TabService,
    RefreshService,
    DynamicPipe,
    StatusPipe,
    NGXLogger,
    PdfService,
    CsvService
  ]
})
export class AppModule {}
