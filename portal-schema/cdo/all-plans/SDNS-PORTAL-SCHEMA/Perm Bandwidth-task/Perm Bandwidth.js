{
    "widget": "popover",
    "properties": {
        "content": {
            "properties": {
                "permanentbandwidthchange": {
                    "widget": "permanent",
                    "title": "OPTUS",
                    "fieldsets": [{
                        "fields": ["configure", "review", "confirm"]
                    }],
                    "rules": {
                        "getTemplateforSummary": [{
                            "trigger": "configure",
                            "script": "/*Script Name: [get template sum]*/ evaluate=function(){let a;a=\"<ion-row > <ion-col col-12> <span class='sub-heading'> Contracted Speed </span>&nbsp;<info-icon></info-icon></ion-col> <ion-col col-12> <p class='description-text'>Use the slider to set the service speed you require between A-End and B-End.<br><b>Note:</b> The slider below represents <b>A-end</b> which is currently utilised link</p> </ion-col> </ion-row>\",success(a)}"
                            
                        }],
                        "onInit": [{
                            "trigger": "configure",
                            "script": "/*Script Name: [Load Perm Service Flexing data]*/ evaluate=function(){if(console.log(\"model in load PB => \",model),!(model.content&&model.content.permanentbandwidthchange&&(console.log(\"model in load PB => \",model.content.permanentbandwidthchange.configure.data),\"review\"===model.content.permanentbandwidthchange.configure.data))){let a=model.serviceDetails.product;console.log(\"product selected =>\",a);let b=[a.id],c=a.id,d=getLodash();if(\"Mesh\"!=a.properties.topology&&a.properties.resource){let i=a.properties.resource.id,j=d.find(model.serviceDetails.LPDS[0].product,k=>{if(k.properties.resource&&k.id!=a.id)return k.properties.resource.id==i});j&&b.push(j.id)}let e=[],g=model.serviceDetails.LPDS,h=\"\";a.properties.resource&&(h=a.properties.resource.id,model.serviceDetails.LPDS[0].product.forEach(i=>{i.properties.resource&&h===i.properties.resource.id&&i.id!=a.id&&e.push(i)})),\"Mesh\"==a.properties.topology&&d.forEach(e,i=>{b.push(i.id)}),getData(\"\",{pageName:\"permBWPageData\",pagetype:\"model\",properties:{customerId:\"35914\",productId:b,productType:a.properties.category,filterParent:\"Access\",filterChild:\"sd_fibre\",version:\"v1.6\",progressObj:{resourceId:c,resourceType:\"product\",type:\"modify\",subtype:\"permanent\",status:\"In-progress\",substatus:\"\",where:\"\"},outObj:\"type=grade_of_service,type=flex_pack,type=qos,type=port_selections,type=sd_fibre_sla\"}},i=>{console.log(\"Result PBW =>\",i),i.selectedProduct=a,i.otherEnds=e,console.log(\"result\",i),resetDataSource(\"configure\"),updateDataSource(\"configure\",[i])},i=>{console.log(\"Failed to fetch P BW\",i)})}}"
                        }],
                        "getTemplateforSummaryReview": [{
                            "trigger": "review",
                            "script": "/*Script Name: [get template sum]*/ evaluate=function(){let a;a=\"<h2>Speed Change</h2><p>Use the slider to set the service speed you require between A-End and B-End.<br><b>Note:</b> The slider below represents <b>A-end</b> which is currently utilised link</p>\",success(a)}"
                        }],
                        "onSubmit": [{
                            "trigger": "review",
                            "script": "/*Script Name: [On Submit Permanent Change]*/ evaluate=function(){console.log('submit PC Payload model =>',model,getDataSource('review'));let a=getLodash(),b=getDataSource('review');if(b&&b[0]&&b[0].model&&0<b[0].model.length){let c=b[0].model;a.forEach(c,e=>{a.forIn(e,(f,g)=>{g.startsWith('_')&&delete e[g]})});let d=[];a.forEach(c,e=>{let f={properties:e,productId:e.localId};delete f.properties.localId,d.push(f)}),getData('',{pageName:'permBWPageDataSubmit',pagetype:'model',properties:{order_items:d,order_info:{requestedBy:'test',type:'modify'}}},e=>{console.log('succss msg: ',e)},e=>{console.log('error msg: ',e)})}}"
                        }] ,
                        "onConfirmSubmit": [{
                            "trigger": "confirm",
                            "script":  "/*Script Name: [On Confirm Perm BW Submit]*/ evaluate=function(){console.log('submit PC Payload model first time =>',model,getDataSource('review'));let a=getLodash(),b=getDataSource('review');if(console.log('datasource submit first:',b),b&&b[0]&&b[0].model&&0<b[0].model.length){let c=b[0].model;a.forEach(c,e=>{a.forIn(e,(f,g)=>{g.startsWith('_')&&delete e[g]})});let d=[];a.forEach(c,e=>{let f={properties:e,productId:e.localId,orderType:'permanent'};delete f.properties.localId,d.push(f)}),console.log('orders_items',d),getData('',{pageName:'permBWPageDataSubmit',pagetype:'model',properties:{order_items:d,order_info:{requestedBy:'test',type:'modify'}}},e=>{console.log('Result PBW SUBMIT =>',e),console.log('result',e),resetDataSource('confirm'),updateDataSource('confirm',[e]),success&&success(e)},e=>{console.log('Failed to fetch P BW',e)})}}"
                            }],
                        "onIsSubmitProgress": [{
                            "trigger": "confirm",
                            "script": "/*Script Name: [On isSubmittedProgress]*/ evaluate=function(){console.log('submit PC confirm TRACK Progress =>',model,getDataSource('review'));let a=getLodash(),b=getDataSource('review');if(console.log('datasource TRACK Progress',b),b&&b[0]&&b[0].model&&0<b[0].model.length){let c=model.serviceDetails.product.id;console.log('RESOURCE ID',c),getData('',{pageName:'isSubmittedProgress',pagetype:'model',properties:{progressObj:{resourceId:c,resourceType:'product',type:'modify',subtype:'permanent',status:'In-progress',where:''}}},d=>{console.log('Result PBW TRACKSUBMIT =>',d),console.log('result track',d),resetDataSource('confirm'),updateDataSource('confirm',[d]),success&&success(d)},d=>{console.log('Failed to fetch P BW',d)})}}"
                        }],
                         "onByPassProgress": [{
                            "trigger": "confirm",
                            "script": "/*Script Name: [On bypass flow progress]*/ evaluate=function(){console.log('cdo:submit PC confirm By Pass TRACK Progress =>',model,getDataSource('review'));let a=getLodash(),b=getDataSource('review');if(console.log('datasource By Pass TRACK Progress',b),model){let c=model.serviceDetails.product.id;console.log('RESOURCE bypass ID',c),getData('',{pageName:'isSubmittedProgress',pagetype:'model',properties:{progressObj:{resourceId:c,resourceType:'product',type:'modify',subtype:'permanent',status:'In-progress',where:''}}},d=>{console.log('Result PBW bypass TRACKSUBMIT =>',d),console.log('result track',d),resetDataSource('confirm'),updateDataSource('confirm',[d]),success&&success(d)},d=>{console.log('Failed to fetch P BW',d)})}}"
                        }]
                    },
                    "properties": {
                        "configure": {
                            "widget": "configure-general",
                            "behaviour": {
                                "show": true
                            },
                            "settings": {
                                "title": "Permanent Change",
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
                                    "label": "Port Capacity",
                                    "key": "portCapacity",
                                    "type" : "port",
                                    "radioid": 0,
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
                                        "id": "1gbps",
                                        "value": "1 Gbps"
                                    },  {
                                        "id": "10gbps",
                                        "value": "10 Gbps"
                                    }]
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
                                    "warningmessage": "Confirm a valid number within ranges 100-126 ,128-1000,1006-4094 (inclusive) before proceeding",
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
                            "events": [
                                "onInit",  "getTemplateforSummary"
                            ],
                            "child": {
                                "widget": "sidebar",
                                "settings": {}
                            }
                        },
                        "review": {
                            "widget": "review-general",
                            "behaviour": {
                                "show": false
                            },
                            "settings": {
                                "title": "Permanent Change",
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
                            "widget": "confirm-general",
                            "behaviour": {
                                "show": false
                            },
                            "settings": {
                                "title": "Permanent Change",
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