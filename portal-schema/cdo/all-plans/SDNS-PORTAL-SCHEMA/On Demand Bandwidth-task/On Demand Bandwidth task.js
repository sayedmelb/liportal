{
    "widget": "popover",
    "properties": {
        "content": {
            "properties": {
                "ondemandflex": {
                    "widget": "ondemand",
                    "title": "OPTUS",
                    "fieldsets": [{
                        "fields": ["configure", "review", "confirm"]
                    }],
                    "rules": {
                        "onInit": [{
                            "trigger": "configure",
                            "script": "/*Script Name: [On Init Ondemand Lunar flexing data]*/ evaluate=function(){if(console.log(\"cdo:model in ondemand task -> onInit lunar => \",model),!(model.content&&model.content.scheduleflex&&(console.log(\"cdo:model in load ondemand lunar => \",model.content.scheduleflex.configure.data),\"review\"===model.content.scheduleflex.configure.data))){let a=model.serviceDetails.product;console.log(\"cdo: ondemand l=task - lunar ->product selected =>\",a);let b=[a.id],c=getLodash();if(\"Mesh\"!=a.properties.topology&&a.properties.resource){let h=a.properties.resource.id,i=c.find(model.serviceDetails.LPDS[0].product,j=>{if(j.properties.resource&&j.id!=a.id)return j.properties.resource.id==h});i&&b.push(i.id)}let d=[],f=model.serviceDetails.LPDS,g=\"\";a.properties.resource&&(g=a.properties.resource.id,model.serviceDetails.LPDS[0].product.forEach(h=>{h.properties.resource&&g===h.properties.resource.id&&h.id!=a.id&&d.push(h)})),\"Mesh\"==a.properties.topology&&c.forEach(d,h=>{b.push(h.id)}),getData(\"\",{pageName:\"permBWPageData\",pagetype:\"model\",properties:{customerId:\"35914\",productId:b,productType:a.properties.category,filterParent:\"Access\",filterChild:\"sd_fibre\",version:\"v1.6\",progressObj:{resourceId:b,resourceType:\"product\",type:\"modify\",subtype:\"permanent\",status:\"in-progress\",substatus:\"\",where:\"\"},outObj:\"type=grade_of_service,type=flex_pack,type=qos,type=port_selections,type=sd_fibre_sla\"}},h=>{console.log(\"Result ondemand =>\",h),h.selectedProduct=a,h.otherEnds=d,console.log(\"result ondemand\",h),resetDataSource(\"configure\"),updateDataSource(\"configure\",[h]),success&&success(h)},h=>{console.log(\"Failed to fetch ondemand BW\",h)})}}"
                        }],
                        "onLoad": [{
                            "trigger": "configure",
                            "script": "/*Script Name: [Load Service Flexing Data]*/ evaluate=function(){resetDataSource(\"configure\"),callCommand(\"09102018-0316-4379-1d76-8354eccdacb4\",{},a=>{updateDataSource(\"configure\",a.model.data),success()},()=>{console.log(error)})}"
                        }]
                    },
                    "properties": {
                        "configure": {
                            "widget": "sliding-content-ondemand",
                            "settings": {
                                "title": "Dynamic Flex Speed",
                                "networkimg": "assets/imgs/info2.PNG",
                                "upgrademsg": "An upgrade to your contracted speed & flex pack is required to flex to this speed or higher",
                                "configuresummary": "Dynamic Flex is a self-optimizing network tool that can automatically provide higher capacity to meet peak or unexpected bandwidth demands",
                                "flexuptitle": "Flex up rules",
                                "flexuprulessummary": "Select 3 flex profiles or customize Dynamic Flex will continually poll the link and when below criteria is met, Dynamic Flex will commence and bandwidth will increase to selected speed",
                                "enabledtitle": "<b>Dynamic Flex Enabled</b>",
                                "flexswitch": false,
                                "sliderheading": "Flex Speed",
                                "slidersummary": "Use slider to <strong>set the bandwidth Flex</strong> speed you require",
                                "slidertitle": "BANDWIDTH",
                                "path": "../../assets/imgs/",
                                "flex": {
                                    "settings": {
                                        "flexup": {
                                            "title":  "Flex speed up rules",
                                            "summary": "Select 3 flex profiles or customize Dynamic Flex will continually poll the link and when below criteria is met, Dynamic Flex will commence and bandwidth will increase to selected speed",
                                            "utilleftlabel": "if the link exceeds",
                                            "utilmidlabel": "% utilisation of",
                                            "utilrightlabel": "contracted speed",
                                            "pcleftlabel": "for more than",
                                            "pcmidlabel": "Return to",
                                            "pcrightlabel": "contracted speed"
                                        },
                                        "flexdown": {
                                            "title":  "Flex speed down rules",
                                            "summary": "Select 3 flex profiles or customize Dynamic Flex will continually poll the link and when below criteria is met, Dynamic Flex will commence and bandwidth will increase to selected speed",                    
                                            "utilleftlabel": "if the link falls below",
                                            "utilmidlabel": "utilisation of",
                                            "utilrightlabel": "contracted speed",
                                            "pcleftlabel": "for an entire pooling period of more than",
                                            "pcmidlabel": "Return to",
                                            "pcrightlabel": "contracted speed"    
                                        }
                                    }
                                },
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
                                }]
                            
                        
                            },
                            "events": [
                                "onInit", "onLoad"
                            ],
                            "controlsup": [{
                                "title": "Aggressive",
                                "widget": "button",
                                "type": "up",
                                "buttontype": "btnagg",
                                "flextype": "aggresive",
                                "active": false
                            }, {
                                "title": "Balanced",
                                "widget": "button",
                                "type": "up",
                                "buttontype": "btnbal",
                                "flextype": "balanced",
                                "active": true
                            }, {
                                "title": "Relaxed",
                                "widget": "button",
                                "type": "up",
                                "buttontype": "btnrel",
                                "flextype": "relaxed",
                                "active": false
                            }, {
                                "title": "Custom",
                                "widget": "button",
                                "type": "up",
                                "buttontype": "btncus",
                                "flextype": "custom",
                                "active": false
                            }],
                            "controlsdown": [{
                                "title": "Aggressive",
                                "widget": "button",
                                "type": "down",
                                "buttontype": "btnaggdown",
                                "flextype": "aggresivedown",
                                "active": false
                            }, {
                                "title": "Balanced",
                                "widget": "button",
                                "type": "down",
                                "buttontype": "btnbaldown",
                                "flextype": "balanceddown",
                                "active": true
                            }, {
                                "title": "Relaxed",
                                "widget": "button",
                                "type": "down",
                                "buttontype": "btnreldown",
                                "flextype": "relaxeddown",
                                "active": false
                            }, {
                                "title": "Custom",
                                "widget": "button",
                                "type": "down",
                                "buttontype": "btncusdown",
                                "flextype": "customdown",
                                "active": false
                            }]
                        },
                        "review": {
                            "widget": "sliding-review-ondemand",
                            "settings": {
                                "title": "Dynamic Flex Speed",
                                "path": "../../assets/imgs/",
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
                                "networkimg": "assets/imgs/networkdiagram.PNG"
                            }
                        },
                        "confirm": {
                            "widget": "sliding-confirm-ondemand",
                            "settings": {
                                "title": "Dynamic Flex Speed",
                                "path": "../../assets/imgs/",
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
                                }],
                                "networkimg": "assets/imgs/networkdiagram.PNG"
                            }
                        }
                    }
                }
            }
        }
    }
}