{
    "widget": "popover",
    "properties": {
        "content": {
            "properties": {
                "scheduleflex": {
                    "widget": "schedule",
                    "title": "OPTUS",
                    "fieldsets": [{
                        "fields": ["configure", "review", "confirm"]
                    }],
                    "rules": {
                        "getTemplateforSummary": [{
                            "trigger": "configure",
                            "script": "/*Script Name: [get template for schedule summary]*/ evaluate=function(){let a;a=\"<ion-row > <ion-col col-12> <span class='sub-heading'> Contracted Speed </span>&nbsp;<info-icon></info-icon></ion-col> <ion-col col-12> <p class='description-text'>Use the slider to set the service speed you require between A-End and B-End.<br><b>Note:</b> The slider below represents <b>A-end</b> which is currently utilised link</p> </ion-col> </ion-row>\",success(a)}"
                            
                        }],
                        "onInit": [{
                            "trigger": "configure",
                            "script": "/*Script Name: [On Init Load Service Flex Data]*/ evaluate=function(){if(console.log(\"model in schedule SB => \",model),!(model.content&&model.content.scheduleflex&&(console.log(\"model in load SB => \",model.content.scheduleflex.configure.data),\"review\"===model.content.scheduleflex.configure.data))){let a=model.serviceDetails.product;console.log(\"product selected =>\",a);let b=[a.id],c=getLodash();if(\"Mesh\"!=a.properties.topology&&a.properties.resource){let h=a.properties.resource.id,i=c.find(model.serviceDetails.LPDS[0].product,j=>{if(j.properties.resource&&j.id!=a.id)return j.properties.resource.id==h});i&&b.push(i.id)}let d=[],f=model.serviceDetails.LPDS,g=\"\";a.properties.resource&&(g=a.properties.resource.id,model.serviceDetails.LPDS[0].product.forEach(h=>{h.properties.resource&&g===h.properties.resource.id&&h.id!=a.id&&d.push(h)})),\"Mesh\"==a.properties.topology&&c.forEach(d,h=>{b.push(h.id)}),console.log(\"PROCDUCTS IDS\",b),getData(\"\",{pageName:\"scheduleBWPageData\",pagetype:\"model\",properties:{customerId:\"35914\",productId:b,productType:a.properties.category,filterParent:\"Access\",filterChild:\"sd_fibre\",version:\"v1.6\",progressObj:{resourceId:b,resourceType:\"product\",type:\"modify\",subtype:\"schedule\",status:\"In-progress\",substatus:\"\",where:\"\"},outObj:\"type=grade_of_service,type=flex_pack,type=qos,type=port_selections,type=sd_fibre_sla\"}},h=>{console.log(\"Result SBW =>\",h),h.selectedProduct=a,h.otherEnds=d,console.log(\"result\",h),resetDataSource(\"configure\"),updateDataSource(\"configure\",[h])},h=>{console.log(\"Failed to fetch S BW\",h)})}}"
                        }],
                         "onStatusCheck": [{
                            "trigger": "configure",
                            "script": "/*Script Name: [Check Perm Dynamic status]*/ evaluate=function(){if(console.log(\"model in schedule SB => \",model),!(model.content&&model.content.scheduleflex&&(console.log(\"model in load SB => \",model.content.scheduleflex.configure.data),\"review\"===model.content.scheduleflex.configure.data))){let a=model.serviceDetails.product;console.log(\"product selected =>\",a);let b=[a.id],c=getLodash();if(\"Mesh\"!=a.properties.topology&&a.properties.resource){let h=a.properties.resource.id,i=c.find(model.serviceDetails.LPDS[0].product,j=>{if(j.properties.resource&&j.id!=a.id)return j.properties.resource.id==h});i&&b.push(i.id)}let d=[],f=model.serviceDetails.LPDS,g=\"\";a.properties.resource&&(g=a.properties.resource.id,model.serviceDetails.LPDS[0].product.forEach(h=>{h.properties.resource&&g===h.properties.resource.id&&h.id!=a.id&&d.push(h)})),\"Mesh\"==a.properties.topology&&c.forEach(d,h=>{b.push(h.id)}),console.log(\"PROCDUCTS IDS STATUS\",b),getData(\"\",{pageName:\"scheduleBWPageData\",pagetype:\"model\",properties:{customerId:\"35914\",productId:b,productType:a.properties.category,filterParent:\"Access\",filterChild:\"sd_fibre\",version:\"v1.6\",progressObj:{resourceId:b,resourceType:\"product\",type:\"modify\",subtype:\"\",status:\"In-progress\",substatus:\"\",where:\"\"},outObj:\"type=grade_of_service,type=flex_pack,type=qos,type=port_selections,type=sd_fibre_sla\"}},h=>{console.log(\"Result SBW STATUS=>\",h),console.log(\"result\",h),success&&success(h)},h=>{console.log(\"Failed to fetch S BW\",h)})}}"
                        }],
                        "getTemplateforSummaryReview": [{
                            "trigger": "configure",
                            "script": "/*Script Name: [get template for schedule summary]*/ evaluate=function(){let a;a=\"<ion-row > <ion-col col-12> <span class='sub-heading'> Speed Change </span>&nbsp;<info-icon></info-icon></ion-col> <ion-col col-12> <p class='description-text'>Use the slider to set the service speed you require between A-End and B-End.<br><b>Note:</b> The slider below represents <b>A-end</b> which is currently utilised link</p> </ion-col> </ion-row>\",success(a)}"
                        }],
                         "onCheckAvailablePortCapacity": [{
                            "trigger": "configure",
                            "script": "/*Script Name: [On Check Available Port Capacity]*/ evaluate=function(){console.log('cdo:submit check available port capacity =>',model,getDataSource('configure'));let a=getLodash(),b=getDataSource('configure');if(console.log('cdo:datasource check available Progress',b),b&&b[0]&&b[0].model&&0<b[0].model.length){let c=b[0].model,d=model.serviceDetails.product.id,e=model.serviceDetails.product.properties.service.properties.serviceId;console.log('RESOURCE ID',d);let f,g,h,i,j;a.forEach(c,k=>{console.log('payload model',c,k),a.forIn(k,(l,m)=>{'single_date'==m?(!f&&(f=k.single_date),!g&&(g=k.single_date)):(!f&&(f=k.start_date),!g&&(g=k.end_date)),h||(h=k.start_time),i||(i=k.end_time),j||(j=k.recurrence_type),console.log('startDate',f)})}),getData('',{pageName:'portCapacityBW',pagetype:'model',properties:{customerId:'49091',serviceID:e,startDate:f,endDate:g,startTime:h,endTime:i,frequency:j,filterChild:'sd_fibre',filterParent:'Access',outObj:'type=grade_of_service,type=flex_pack,type=qos,type=port_selections,type=sd_fibre_sla',productId:['942229cd-699f-4e23-bfea-595b8a8a1500'],productType:'ewan',version:'v1.6',progressObj:{resourceId:d,resourceType:'product',type:'modify',subtype:'schedule',status:'In-progress',where:''}}},k=>{console.log('cdo result port=>',k),console.log('cdo result port capacity SBW',k),success&&success(k)},k=>{console.log('Failed to fetch P BW',k)})}}"
                        }],
                        "onSubmit": [{
                            "trigger": "review",
                            "script": "/*Script Name: [On confirm schedule BW submit]*/ evaluate=function(){console.log('submit PC Payload model first time =>',model,getDataSource('review'));let a=getLodash(),b=getDataSource('review');if(console.log('datasource submit first:',b),b&&b[0]&&b[0].model&&0<b[0].model.length){let c=b[0].model;a.forEach(c,e=>{a.forIn(e,(f,g)=>{g.startsWith('_')&&delete e[g],'flexMax'==g&&delete e[g],'flex_capacity'==g&&delete e[g],'portAvailableBW'==g&&delete e[g],'portCapacity'==g&&delete e[g],'proactiveMonitoring'==g&&delete e[g],'qos'==g&&delete e[g],'serviceLevel'==g&&delete e[g],'utilizedByOtherServices'==g&&delete e[g],'utilizedByOtherServicesLabel'==g&&delete e[g],'vlan'==g&&delete e[g]})});let d=[];a.forEach(c,e=>{let f={properties:e,productId:e.localId};delete f.properties.localId,d.push(f)}),console.log('orders_items',d),getData('',{pageName:'permBWPageDataSubmit',pagetype:'model',properties:{order_items:d,order_info:{requestedBy:'test',type:'modify'}}},e=>{console.log('Result PBW SUBMIT =>',e),console.log('result',e),resetDataSource('confirm'),updateDataSource('confirm',[e]),success&&success(e)},e=>{console.log('Failed to fetch P BW',e)})}}"
                        }],
                         "onConfirmSubmit": [{
                            "trigger": "confirm",
                            "script": "/*Script Name: [On confirm schedule BW submit]*/ evaluate=function(){console.log('submit PC Payload model first time =>',model,getDataSource('review'));let a=getLodash(),b=getDataSource('review');if(console.log('datasource submit first:',b),b&&b[0]&&b[0].model&&0<b[0].model.length){let c=b[0].model;a.forEach(c,e=>{a.forIn(e,(f,g)=>{g.startsWith('_')&&delete e[g],'flexMax'==g&&delete e[g],'flex_capacity'==g&&delete e[g],'portAvailableBW'==g&&delete e[g],'portCapacity'==g&&delete e[g],'proactiveMonitoring'==g&&delete e[g],'qos'==g&&delete e[g],'serviceLevel'==g&&delete e[g],'utilizedByOtherServices'==g&&delete e[g],'utilizedByOtherServicesLabel'==g&&delete e[g],'vlan'==g&&delete e[g],'gradeOfService'==g&&delete e[g],'contractedBw'==g&&(e.requestedBw=e.contractedBw,delete e[g]),'single_date'==g&&(e.start_date=e.single_date,e.end_date=e.single_date,delete e[g]),'single_date1'==g&&(e.end_date=e.single_date1,delete e[g])})});let d=[];a.forEach(c,e=>{let f={properties:e,productId:e.localId,orderType:'schedule'};delete f.properties.localId,d.push(f)}),console.log('orders_items',d),getData('',{pageName:'permBWPageDataSubmit',pagetype:'model',properties:{order_items:d,order_info:{requestedBy:'test',type:'modify'}}},e=>{console.log('Result PBW SUBMIT =>',e),console.log('result',e),resetDataSource('confirm'),updateDataSource('confirm',[e]),success&&success(e)},e=>{console.log('Failed to fetch S BW',e)})}}"
                        }],
                         "onIsSubmitProgress": [{
                            "trigger": "confirm",
                            "script": "/*Script Name: [On IsSubmit Progress]*/ evaluate=function(){console.log('submit PC confirm TRACK Progress =>',model,getDataSource('review'));let a=getLodash(),b=getDataSource('review');if(console.log('datasource TRACK Progress',b),b&&b[0]&&b[0].model&&0<b[0].model.length){let c=model.serviceDetails.product.id;console.log('RESOURCE ID',c),getData('',{pageName:'isSubmittedProgress',pagetype:'model',properties:{progressObj:{resourceId:c,resourceType:'product',type:'modify',subtype:'schedule',status:'In-progress',where:''}}},d=>{console.log('Result SBW TRACKSUBMIT =>',d),console.log('result track SBW',d),resetDataSource('confirm'),updateDataSource('confirm',[d]),success&&success(d)},d=>{console.log('Failed to fetch P BW',d)})}}"
                        }],
                         "onByPassProgress": [{
                            "trigger": "confirm",
                            "script": "/*Script Name: [on bypass progress submit sb]*/ evaluate=function(){console.log('cdo:submit PC confirm By Pass TRACK Progress =>',model,getDataSource('review'));let a=getLodash(),b=getDataSource('review');if(console.log('datasource By Pass TRACK Progress',b),model){let c=model.serviceDetails.product.id;console.log('RESOURCE bypass ID',c),getData('',{pageName:'isSubmittedProgress',pagetype:'model',properties:{progressObj:{resourceId:c,resourceType:'product',type:'modify',subtype:'schedule',status:'In-progress',where:''}}},d=>{console.log('Result SBW bypass TRACKSUBMIT =>',d),console.log('result track',d),resetDataSource('confirm'),updateDataSource('confirm',[d]),success&&success(d)},d=>{console.log('Failed to fetch P BW',d)})}}"
                        }]
                    },
                    "properties": {
                        "configure": {
                            "widget": "sliding-content",
                            "behaviour": {
                                "show": true
                            },
                            "settings": {
                                "title": "Scheduled Flex Speed",
                                "path": "/assets/imgs/",
                                "list": [{
                                    "label": "CONFIGURE",
                                    "image": "activebutton.png",
                                    "title": "Configure",
                                    "status": "active"
                                }, {
                                    "label": "REVIEW",
                                    "image": "inactivebutton.png",
                                    "title": "Review",
                                    "status": "inprogress"
                                }, {
                                    "label": "CONFIRM",
                                    "image": "inactivebutton.png",
                                    "title": "Confirm",
                                    "status": "inprogress"
                                }],
                                "images": {
                                    "network": "networkdiagram.PNG"
                                },
                                "showsummary": true,
                                "navigationbuttonlist" :[{
                                	"label": "SAVE FOR LATER",
                                    "type" : "save",
                                    "show" : true
                                },
                                {
                                	"label": "REVIEW CHANGE",
                                    "type" : "review",
                                    "show" : true
                                	
                                },
                                {
                                	"label": "CANCEL",
                                    "type" : "cancel",
                                    "show" : true
                                },
                                 {
                                	"label": "SUBMIT",
                                    "type" : "submit",
                                    "show" : false
                                },
                                {
                                	"label": "EDIT",
                                    "type" : "edit",
                                    "show" : false
                                },
                                 {
                                	"label": "CLOSE",
                                    "type" : "close",
                                    "show" : false
                                }
                                ],
                                "radiolist": [{
                                    "label": "Recurrence",
                                    "key": "recurrence",
                                    "type" : "recurrence",
                                    "radioid": 0,
                                    "columns": [
                                        {
                                            "id": "once",
                                            "value": "Once"
                                        }
                                    ],
                                    "dataSource": [{
                                        "id": "once",
                                        "value": "Once",
                                        "checked": true
                                    },  {
                                        "id": "daily",
                                        "value": "Daily",
                                        "checked": false,
                                        "weekdays": [
                                        { "day": "Monday", "checked": false },
                                        { "day": "Tuesday", "checked": false },
                                        { "day": "Wednesday", "checked": false },
                                        { "day": "Thursday", "checked": false },
                                        { "day": "Friday", "checked": false },
                                        { "day": "Saturday", "checked": false },
                                        { "day": "Sunday", "checked": false }
                                        ]
                                    },
                                     {
                                        "id": "weekly",
                                        "value": "Weekly",
                                        "checked": false
                                    }, {
                                        "id": "monthly",
                                        "value": "Monthly",
                                        "checked": false,
                                        "monthdays":  [
                                        { "day": "01", "checked": false },
                                        { "day": "02", "checked": false },{ "day": "03", "checked": false },{ "day": "04", "checked": false },{ "day": "05", "checked": false },
                                        { "day": "06", "checked": false },{ "day": "07", "checked": false },{ "day": "08", "checked": false },{ "day": "09", "checked": false },
                                        { "day": "10", "checked": false },{ "day": "11", "checked": false },{ "day": "12", "checked": false },{ "day": "13", "checked": false },
                                        { "day": "14", "checked": false },{ "day": "15", "checked": false },{ "day": "16", "checked": false },{ "day": "17", "checked": false },
                                        { "day": "18", "checked": false },{ "day": "19", "checked": false },{ "day": "20", "checked": false },{ "day": "21", "checked": false },
                                        { "day": "21", "checked": false },{ "day": "22", "checked": false },{ "day": "23", "checked": false },{ "day": "24", "checked": false },
                                        { "day": "25", "checked": false },{ "day": "26", "checked": false },{ "day": "27", "checked": false },{ "day": "28", "checked": false },
                                        { "day": "29", "checked": false },{ "day": "30", "checked": false },{ "day": "31", "checked": false }
                                        ]
                                    }
                                    ]
                                },{
                                    "label": "Flex Capacity",
                                    "key": "flexCapacity",
                                    "type" : "flex",
                                    "radioid": 1,
                                    "columns": [
                                        {
                                            "id": "aEnd",
                                            "value": "A-End:"
                                        },
                                        {
                                            "id": "bEnd",
                                            "value": "B-End:"
                                        }
                                    ],
                                    "dataSource": [{
                                        "id": "2x",
                                        "value": "2x"
                                    },  {
                                        "id": "5x",
                                        "value": "5x"
                                    }]
                                }],
                                "twobuttoncombo": [{
                                    "label": "VLAN ID",
                                    "type": "vlan",
                                    "warningmessage": "Validate. your VLAN id before proceeding",
                                    "warningmessageicon": "../../assets/icon/warningwhite.JPG",
                                    "validatedmessage": "Validated",
                                    "validatedmessageicon": "../../assets/imgs/NormalSignIcon.png",
                                    "errormessage": "Please try another number",
                                    "errormessageicon": "../../assets/imgs/outageSignIcon.png"
                                    }
                                    ],
                                 "togglecombo": [{
                                    "label": "Proactive Monitoring",
                                    "type": "proactivemonitoring",
                                    "columns": [
                                        {
                                            "id": "aEnd",
                                            "value": "A-End:"
                                        },
                                        {
                                            "id": "bEnd",
                                            "value": "B-End:"
                                        }
                                    ],
                                    "warningmessage": "Validate. your VLAN id before proceeding",
                                    "warningmessageicon": "../../assets/icon/warningwhite.JPG",
                                    "validatedmessage": "Validated",
                                    "validatedmessageicon": "../../assets/imgs/NormalSignIcon.png",
                                    "errormessage": "Please try another number",
                                    "errormessageicon": "../../assets/imgs/outageSignIcon.png"
                                    }
                                    ],     
                                "costsummary": [{
                                    "label": "Charge Summary",
                                    "type": "costsummary",
                                    "costheading": "TOTAL COST",
                                    "endtitle": "(A-end + B-end)",
                                    "subheadingleft": "Before",
                                    "subheadingright": "After",
                                    "aend": "A-End",
                                    "bend": "B-End",
                                    "monthlylabel": "Monthly Recurring:",
                                    "totalflexlabel": "Total Flex Time",
                                    "flexratelabel": "Flex Rate",
                                    "flexchargelabel": "Flex Charge",
                                    "totalflexchargelabel": "Total Flex Charge",
                                    "installcharge": "Install Charge:",
                                    "totallabel": "Total of All Products:"
                                    }
                                    ],    
                                "buttonlist": [{
                                    "label": "Grade of service",
                                    "type": "grade"
                                    }
                                    ],
                                    "gradeOfService": {
                                        "label": "Grade Of Service",
                                        "columns": [{
                                            "id": "aEnd",
                                            "value": "A-End:"
                                        }, {
                                            "id": "bEnd",
                                            "value": "B-End:"
                                        }],
                                        "id": "gradeOfServicePB",
                                        "widget": "serviceLevel",
                                        "dataSource": [
                                            {    "id": "basic",
                                            "value": "Basic"
                                          },
                                          {
                                            "id": "Best Effort",
                                            "value": "Best Effort"
                                          },
                                          {
                                            "id": "Premium",
                                            "value": "Premium"
                                          }
                                          ]
                                    },
                                    "serviceLevel": {
                                        "label": "Service Level",
                                        "widget": "serviceLevel",
                                        "id": "serviceLevelPB",
                                        "columns": [{
                                            "id": "aEnd",
                                            "value": "A-End:"
                                        }, {
                                            "id": "bEnd",
                                            "value": "B-End:"
                                        }],
                                        "dataSource": [{
                                            "id": "Standard",
                                            "value": "Standard"
                                          },
                                          {
                                            "id": "Enhanced12",
                                            "value": "Enhanced12"
                                          },
                                          {
                                            "id": "Enhanced8",
                                            "value": "Enhanced8"
                                          },
                                          {
                                            "id": "Enhanced4",
                                            "value": "Enhanced4"
                                          }
                                        ]
                                    }   
                                    
                            },
                            "events": [ "onInit", "getTemplateforSummary", "onCheckAvailablePortCapacity", "onStatusCheck" ],
                            "child": {
                                "widget": "sidebar",
                                "settings": {}
                            }
                        },
                        "review": {
                            "widget": "sliding-review",
                            "behaviour": {
                                "show": false
                            },
                            "settings": {
                                "title": "Scheduled Flex Speed",
                                "path": "/assets/imgs/",
                                "list": [{
                                    "label": "CONFIGURE",
                                    "image": "traversedbutton.png",
                                    "title": "Configure",
                                    "status": "complete"
                                }, {
                                    "label": "REVIEW",
                                    "image": "activebutton.png",
                                    "title": "Review",
                                    "status": "active"
                                }, {
                                    "label": "CONFIRM",
                                    "image": "inactivebutton.png",
                                    "title": "Confirm",
                                    "status": "inprogress"
                                }],
                                "images": {
                                    "network": "networkdiagram.PNG"
                                },
                                "showsummary": true,
                                "navigationbuttonlist" :[{
                                	"label": "SAVE FOR LATTER",
                                    "type" : "save",
                                    "show" : true
                                },
                                {
                                	"label": "REVIEW CHANGE",
                                    "type" : "review",
                                    "show" : false
                                	
                                },
                                {
                                	"label": "CANCEL",
                                    "type" : "cancel",
                                    "show" : true
                                },
                                 {
                                	"label": "SUBMIT FOR APPROVAL",
                                    "type" : "submit",
                                    "show" : true
                                },
                                {
                                	"label": "EDIT",
                                    "type" : "edit",
                                    "show" : true
                                },
                                 {
                                	"label": "CLOSE",
                                    "type" : "close",
                                    "show" : false
                                }
                                ],
                                "gradeOfService": {
                                    "label": "Grade Of Service",
                                    "columns": [{
                                        "id": "aEnd",
                                        "value": "A-End"
                                    }, {
                                        "id": "bEnd",
                                        "value": "B-End"
                                    }],
                                    "id": "gradeOfServicePB",
                                    "widget": "serviceLevel",
                                    "dataSource": [
                                        {    "id": "basic",
                                        "value": "Basic"
                                      },
                                      {
                                        "id": "Best Effort",
                                        "value": "Best Effort"
                                      },
                                      {
                                        "id": "Premium",
                                        "value": "Premium"
                                      }
                                      ]
                                },
                                "serviceLevel": {
                                    "label": "Service Level",
                                    "widget": "serviceLevel",
                                    "id": "serviceLevelPB",
                                    "columns": [{
                                        "id": "aEnd",
                                        "value": "A-End"
                                    }, {
                                        "id": "bEnd",
                                        "value": "B-End"
                                    }],
                                    "dataSource": [{
                                        "id": "Standard",
                                        "value": "Standard"
                                      },
                                      {
                                        "id": "Enhanced12",
                                        "value": "Enhanced12"
                                      },
                                      {
                                        "id": "Enhanced8",
                                        "value": "Enhanced8"
                                      },
                                      {
                                        "id": "Enhanced4",
                                        "value": "Enhanced4"
                                      }
                                    ]
                                } 
                            },
                             "events": [
                                "getTemplateforSummaryReview", "onLoad", "onLoadReview", "onSubmit"
                            ],
                            "child": {
                                "widget": "sidebar",
                                "settings": {}
                            }
                        },
                        "confirm": {
                            "widget": "sliding-confirm",
                            "behaviour": {
                                "show": false
                            },
                            "settings": {
                                "title": "Scheduled Flex Speed",
                                "path": "/assets/imgs/",
                                "list": [{
                                    "label": "CONFIGURE",
                                    "image": "traversedbutton.png",
                                    "title": "Configure",
                                    "status": "complete"
                                }, {
                                    "label": "REVIEW",
                                    "image": "traversedbutton.png",
                                    "title": "Review",
                                    "status": "complete"
                                }, {
                                    "label": "CONFIRM",
                                    "image": "traversedbutton.png",
                                    "title": "Confirm",
                                    "status": "complete"
                                }]
                            },
                             "events": [
                                "onConfirmSubmit", "onIsSubmitProgress", "onByPassProgress"
                            ]
                        }
                    }
                }
            }
        }
    }
}