{
    "widget": "popover",
    "properties": {
        "content": {
            "properties": {
                "ondemandflex": {
                    "widget": "ondemand-container",
                    "title": "OPTUS",
                    "fieldsets": [{
                        "fields": ["configure", "review", "confirm"]
                    }],
                    "rules": {
                        "onInit": [{
                            "trigger": "configure",
                            "script": "/*Script Name: [On initial dynamic input call]*/ evaluate=function(){if(console.log(\"cdo:model in DYNAMIC BW => \",model),!(model.content&&model.content.scheduleflex&&(console.log(\"cdo:model in load DB => \",model.content.scheduleflex.configure.data),\"review\"===model.content.scheduleflex.configure.data))){let a=model.serviceDetails.product,b=a.customerid;console.log(\"product selected and customer ID=>\",a,b);let c=[a.id],d=getLodash();if(\"Mesh\"!=a.properties.topology&&a.properties.resource){let i=a.properties.resource.id,j=d.find(model.serviceDetails.LPDS[0].product,k=>{if(k.properties.resource&&k.id!=a.id)return k.properties.resource.id==i});j&&c.push(j.id)}let e=[],g=model.serviceDetails.LPDS,h=\"\";a.properties.resource&&(h=a.properties.resource.id,model.serviceDetails.LPDS[0].product.forEach(i=>{i.properties.resource&&h===i.properties.resource.id&&i.id!=a.id&&e.push(i)})),console.log(\"PROCDUCTS IDS DYN\",c),getData(\"\",{pageName:\"dynamicBWPageData\",pagetype:\"model\",properties:{customerId:b,productId:c,productType:a.properties.category,filterParent:\"Access\",filterChild:\"sd_fibre\",version:\"v1.6\",progressObj:{resourceId:c,resourceType:\"product\",type:\"modify\",subtype:\"permanent\",status:\"In-progress\",substatus:\"\",where:\"\"},outObj:\"type=flex_increase_profile,type=flex_decrease_profile,type=flex_pack,type=port_selections\"}},i=>{console.log(\"Result DYN =>\",i),i.selectedProduct=a,i.otherEnds=e,console.log(\"result\",i),resetDataSource(\"configure\"),updateDataSource(\"configure\",[i])},i=>{console.log(\"Failed to fetch DF BW\",i)})}}"
                        }],
                         "onStatusCheck": [{
                            "trigger": "configure",
                            "script": "/*Script Name: [On Status Check]*/ evaluate=function(){if(console.log(\"model in schedule DYN => \",model),!(model.content&&model.content.ondemandflex&&(console.log(\"model in load DYN => \",model.content.ondemandflex.configure.data),\"review\"===model.content.ondemandflex.configure.data))){let a=model.serviceDetails.product;console.log(\"product selected =>\",a);let b=[a.id],c=getLodash();if(\"Mesh\"!=a.properties.topology&&a.properties.resource){let h=a.properties.resource.id,i=c.find(model.serviceDetails.LPDS[0].product,j=>{if(j.properties.resource&&j.id!=a.id)return j.properties.resource.id==h});i&&b.push(i.id)}let d=[],f=model.serviceDetails.LPDS,g=\"\";a.properties.resource&&(g=a.properties.resource.id,model.serviceDetails.LPDS[0].product.forEach(h=>{h.properties.resource&&g===h.properties.resource.id&&h.id!=a.id&&d.push(h)})),\"Mesh\"==a.properties.topology&&c.forEach(d,h=>{b.push(h.id)}),console.log(\"PROCDUCTS IDS STATUS\",b),getData(\"\",{pageName:\"scheduleBWPageData\",pagetype:\"model\",properties:{customerId:\"35914\",productId:b,productType:a.properties.category,filterParent:\"Access\",filterChild:\"sd_fibre\",version:\"v1.6\",progressObj:{resourceId:b,resourceType:\"product\",type:\"modify\",subtype:\"\",status:\"In-progress\",substatus:\"\",where:\"\"},outObj:\"type=grade_of_service,type=flex_pack,type=qos,type=port_selections,type=sd_fibre_sla\"}},h=>{console.log(\"Result SBW STATUS=>\",h),console.log(\"result\",h),success&&success(h)},h=>{console.log(\"Failed to fetch S BW\",h)})}}"
                        }],
                        "onConfirmDynamicSubmit": [{
                            "trigger": "confirm",
                            "script": "/*Script Name: [On Confirm Dynamic BW Submit]*/ evaluate=function(){console.log('cdo:submit Dynamic Payload model first time:: =>',model,getDataSource('review'),getDataSource('configure'));let b,a=getLodash();if(b=getDataSource('review')?getDataSource('review'):getDataSource('configure'),console.log('cdo:: dyn datasource submit first:',b,model.localid),b&&b[0]&&b[0].model&&0<b[0].model.length){let c=b[0].model,d=[],f=!1,g=[];if('Point to Point'==b[0].selectedProduct.properties.topology){let j={rid:''};f=!0,j.rid=b[0].selectedProduct.id,g.push(j);let k={rid:''};k.rid=b[0].otherEnds[0].id,g.push(k)}else{let j={rid:''};j.rid=b[0].selectedProduct.id,g.push(j)}a.forEach(c,j=>{let k={};a.forIn(j,(l,m)=>{m.startsWith('_')&&delete j[m],'active'==m&&(k.active=j.active),'dynamic_flex_enabled'==m&&(k.dynamic_flex_enabled=j.dynamic_flex_enabled),'localId'==m&&(k.localId=j.localId),'Yes'==j.dynamic_flex_enabled&&('increased_utilisation_mode'==m&&(k.increased_utilisation_mode=j.increased_utilisation_mode),'utilisation_increase_threshold_pc'==m&&(k.utilisation_increase_threshold_pc=j.utilisation_increase_threshold_pc),'increased_utilisation_monitor_time_period'==m&&(k.increased_utilisation_monitor_time_period=60*parseInt(j.increased_utilisation_monitor_time_period)),'decreased_utilisation_mode'==m&&(k.decreased_utilisation_mode=j.decreased_utilisation_mode.replace('down','')),'utilisation_decrease_threshold_pc'==m&&(k.utilisation_decrease_threshold_pc=j.utilisation_decrease_threshold_pc),'decreased_utilisation_monitor_time_period'==m&&(k.decreased_utilisation_monitor_time_period=60*parseInt(j.decreased_utilisation_monitor_time_period)),'contractedBw'==m&&(k.requestedBw=j.contractedBw),'timeBox'==m&&(k.timeBox=j.timeBox),'timebox_start_time'==m&&(k.timebox_start_time=j.timebox_start_time),'timebox_end_time'==m&&(k.timebox_end_time=j.timebox_end_time),'weekFlexDays'==m&&(k.weekFlexDays=j.weekFlexDays),'spendCap'==m&&(k.spendCap=j.spendCap),'spendCapAmountsitea'==m&&(k.spendCapAmountsitea=j.spendCapAmountsitea),'spendCapHoursitea'==m&&(k.spendCapHoursitea=j.spendCapHoursitea))}),d.push(k)});let h;c=d,f&&(c[1]=c[0],h=c),console.log('payload',c,d,h);let i=[];if(f){let j=0;a.forEach(h,k=>{let l={properties:k,productId:g[j].rid,orderType:'dynamic'};delete l.properties.localId,i.push(l),j++})}else a.forEach(c,j=>{let k={properties:j,productId:g[0].rid,orderType:'dynamic'};delete k.properties.localId,i.push(k)});console.log('orders_items',i),getData('',{pageName:'permBWPageDataSubmit',pagetype:'model',properties:{order_items:i,order_info:{requestedBy:'test',type:'modify'}}},j=>{console.log('Result DYN SUBMIT =>',j),console.log('result',j),resetDataSource('confirm'),updateDataSource('confirm',[j]),success&&success(j)},j=>{console.log('Failed to fetch DYN BW',j)})}}"
                            
                        }],
                         "onIsSubmitProgress": [{
                            "trigger": "confirm",
                            "script": "/*Script Name: [On Submit Progress]*/ evaluate=function(){console.log('cdo: dyn - submit PC confirm TRACK Progress =>',model,getDataSource('review'),getDataSource('configure'));let b,a=getLodash();if(b=getDataSource('review')?getDataSource('review'):getDataSource('configure'),console.log('cdo: dyn -datasource TRACK Progress',b),b&&b[0]&&b[0].model&&0<b[0].model.length){let c=model.serviceDetails.product.id;console.log('cdo: dyn - RESOURCE ID',c),getData('',{pageName:'isSubmittedProgress',pagetype:'model',properties:{progressObj:{resourceId:c,resourceType:'product',type:'modify',subtype:'dynamic',status:'In-progress',where:''}}},d=>{console.log('cdo: Result DBW TRACKSUBMIT =>',d),console.log('cdo dyn result track',d),resetDataSource('confirm'),updateDataSource('confirm',[d]),success&&success(d)},d=>{console.log('Failed to fetch P BW',d)})}}"
                        }],
                         "onByPassProgress": [{
                            "trigger": "confirm",
                            "script": "/*Script Name: [On bypass dyn submit]*/ evaluate=function(){console.log('cdo:submit DYN confirm By Pass TRACK Progress =>',model,getDataSource('review'));let a=getLodash(),b=getDataSource('review');if(console.log(' cdo:submit DYNdatasource By Pass TRACK Progress',b),model){let c=model.serviceDetails.product.id;console.log(' cdo:submit DYN RESOURCE bypass ID',c),getData('',{pageName:'isSubmittedProgress',pagetype:'model',properties:{progressObj:{resourceId:c,resourceType:'product',type:'modify',subtype:'dynamic',status:'In-progress',where:''}}},d=>{console.log('CDO Result DYN bypass TRACKSUBMIT =>',d),console.log('CDO result track',d),resetDataSource('confirm'),updateDataSource('confirm',[d]),success&&success(d)},d=>{console.log('Failed to fetch P BW',d)})}}"
                        }]
                       
                        
                    },
                    "properties": {
                        "configure": {
                            "widget": "ondemand-configure",
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
                                "onInit", "onStatusCheck"
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
                            "widget": "ondemand-review",
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
                            "widget": "ondemand-confirm",
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
                                
                            },
                            "events": [
                                "onConfirmDynamicSubmit", "onIsSubmitProgress", "onByPassProgress"
                            ]
                        }
                    }
                }
            }
        }
    }
}