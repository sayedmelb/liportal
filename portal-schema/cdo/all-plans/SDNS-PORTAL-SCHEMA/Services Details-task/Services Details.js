{
    
    "widget": "page",
    "properties": {
        "content": {
            "rules": {
                "onInit": [{
                    "trigger": ["servicesdetails"],
                    "script": "/*Script Name: [On Service Detail Load]*/ evaluate=function(){console.log(\"cdo:Loading service details MODEL \",model),console.log(\"Loading service details schema now now\",getValue(\"servicesdetails\")),console.log(\"Loading LPDS\",getValue(\"landingPageData\")),console.log(\"Loading portalLandingPage\",getDataSource(\"portalLandingPage\")),console.log(\"Loading home\",getDataSource(\"home\"));let a=getLodash(),b=[],c;model.serviceDetails.product.selectedproduct&&model.serviceDetails.product.selectedproduct.properties&&model.serviceDetails.product.selectedproduct.properties.resource&&(c=model.serviceDetails.product.selectedproduct.properties.resource.id,model.serviceDetails.product.products.forEach(e=>{e.properties.resource&&c===e.properties.resource.id&&e.id!=model.serviceDetails.product.selectedproduct.id&&b.push(e)})),getData(\"\",{pageName:\"permBWPageData\",pagetype:\"model\",properties:{customerId:\"35914\",productId:model.serviceDetails.product.selectedproduct.id,productType:\"ewan\",filterParent:\"Access\",filterChild:\"sd_fibre\",version:\"v1.6\",progressObj:{resourceId:model.serviceDetails.product.selectedproduct.id,resourceType:\"product\",type:\"modify\",subtype:\"permanent\",status:\"in-progress\",substatus:\"\",where:\"\"},outObj:\"type=grade_of_service,type=flex_pack,type=qos,type=port_selections,type=sd_fibre_sla\"}},e=>{if(console.log(\"result for SD page =>\",e),e.model){let f=[];a.forEach(e.model,h=>{let i=a.mapKeys(h,(j,k)=>{switch(k.toLowerCase()){case\"flex_capacity\":return\"flex_pack\";case\"gradeofservice\":return\"grade_of_service\";case\"portcapacity\":return\"port_selections\";case\"servicelevel\":return\"sd_fibre_sla\";default:return k;}});f.push(i)}),console.log(\"Model after converting keys =>\",f),e.model=f;let g=[];a.forEach(e.model,h=>{h.portCapacity||(model.serviceDetails.product.selectedproduct&&model.serviceDetails.product.selectedproduct.properties.service&&model.serviceDetails.product.selectedproduct.properties.service.properties.port?h.portCapacity=model.serviceDetails.product.selectedproduct.properties.service.properties.port:h.portCapacity=\"1 Gbps\"),!h.contractedBw&&model.serviceDetails.product.selectedproduct&&model.serviceDetails.product.selectedproduct.properties.service&&model.serviceDetails.product.selectedproduct.properties.service.properties.bandwidth&&(h.contractedBw=model.serviceDetails.product.selectedproduct.properties.service.properties.bandwidth);let i={};a.forIn(h,(j,k)=>{i[\"_\"+k]=j}),g.push(i)}),e.model=a.merge(g,e.model)}e.selectedProduct=model.serviceDetails.product.selectedproduct,e.otherEnds=b,e.LPDS=model.serviceDetails.LPDS,console.log(\"result.lpds\",e),updateDataSource(\"servicesdetails\",[e])},e=>{console.log(\"Failed to fetch P BW\",e)})}"
                    }],
                "onPortDetailLoad": [{
                    "trigger": ["servicesdetails"],
                    "script": "/*Script Name: [On Port Detail Load]*/ evaluate=function(){console.log('Port detail loading',model);let a=getLodash(),b=a.find(model.serviceDetails.product.selectedproduct.properties.service.reference,e=>{return'resource'==e.type&&'access'==e.subtype});console.log('Access Ref - ',b);let c=a.filter(model.serviceDetails.product.products,e=>{return a.find(e.properties.service.reference,f=>{return f.localId==b.localId})});console.log('products on same bearer =>',c);let d=getDataSource('servicesdetails');d[0].portDetailData=c,resetDataSource('servicesdetails'),updateDataSource('servicesdetails',d)}"
                }],
                "onPermBWLoad": [{
                    "trigger": ["servicesdetails"],
                    "script": "/*Script Name: [On Perm BW Load]*/ evaluate=function(){let a=getValue(\"map\"),b;!a||(b=a.selected),b||(b=getValue(\"details\"));getLodash();console.log(\"in perm bw1=>\",a,getValue(\"details\"),model,getDataSource(\"map\"),getDataSource(\"landingPageData\"),getDataSource(\"dashboard.landingPageData\")),console.log(\"in perm bw2 model =>\",model);let d={serviceId:model.serviceDetails.product.selectedproduct.id,product:model.serviceDetails.product.selectedproduct,type:\"Permanent\",LPDS:model.serviceDetails.LPDS};callService(\"07122018-0114-3959-70ba-c0e17d2a8423\",d,e=>{e.model={serviceDetails:d},console.log(\"PB HC result =>\",e),navigate(e)},e=>{showAlert(e)})}" 
                    
                }],
                "onScheduleBWLoad":  [{
                    "trigger": ["servicesdetails"],
                    "script": "/*Script Name: [On Scheduled Bandwidth load from servicedetail]*/ evaluate=function(){let a=getValue(\"map\"),b;!a||(b=a.selected),b||(b=getValue(\"details\"));let c=getLodash(),d=getDataSource(\"landingPageData\");console.log(\"in schdule lunar module bw=>\",a,getValue(\"details\"),model,getDataSource(\"map\"),getDataSource(\"landingPageData\"),getDataSource(\"dashboard.landingPageData\")),console.log(\"in serc bw2 model =>\",model);let e={serviceId:model.serviceDetails.product.selectedproduct.id,product:model.serviceDetails.product.selectedproduct,type:\"Scheduled\",LPDS:model.serviceDetails.LPDS};callService(\"11122018-0251-5712-997f-d69cee2dd344\",e,f=>{f.model={serviceDetails:e},console.log(\"schedule lunar result =>\",f),navigate(f)},f=>{showAlert(f)})}"
                    
                }],
                "onDynamicBWLoad":  [{
                    "trigger": ["servicesdetails"],
                    "script": "/*Script Name: [On Demand Lunar Change dynamic]*/ evaluate=function(){let a=getValue(\"map\"),b;!a||(b=a.selected),b||(b=getValue(\"details\"));getLodash();console.log(\"product in demand\",b),console.log(\"model in demand\",model);let d=getDataSource(\"landingPageData\");console.log(\"cdo:in ondemand lunar module bw=>\",a,getValue(\"details\"),model,getDataSource(\"map\"),getDataSource(\"landingPageData\"),getDataSource(\"dashboard.landingPageData\"));let e={serviceId:model.serviceDetails.product.selectedproduct.id,product:model.serviceDetails.product.selectedproduct,type:\"ondemand\",LPDS:model.serviceDetails.LPDS};console.log(\"LPDS\",d),console.log(\"serviceDetails on demand\",e),callService(\"12052019-0030-2589-f907-518b52e0030f\",e,f=>{f.model={serviceDetails:e},console.log(\"ondemand lunar result =>\",f),navigate(f)},f=>{showAlert(f)})}"
                }]
            },
            "fieldsets":[{
        	 "fields":["servicesdetails"]
            }],
            "properties": {
                "servicesdetails": {
                    "widget": "service-detail",
                    "events": ["onInit", "onPortDetailLoad", "onPermBWLoad", "onScheduleBWLoad", "onDynamicBWLoad"],
                    "tabs": [
                       {
                        "id" : "SDT",
                        "title": "SERVICE DETAILS",
                        "width": "20rem",
                        "properties": {
                            "sdcards": {
                                "widget": "sd-cards",
                                "cards": [
                                    "Card 1"
                                ]
                            }
                        }
                       },
                      {
                        "id" : "PD",
                        "title": "PORT DETAILS",
                        "width": "20rem",
                        "properties": {
                            "portdetails":{
                                "type": "widget",
                                "widget": "table",
                                "schema": {
                                    "widget": "table",
                                    "fieldsets": [{
                            				"fields": ["Service", "Location", "Product Type", "Network"]
                            		}],
                            		"settings": {
                                        "columns": [{
                                            "key": "properties.service.properties.serviceId",
                                            "prop": "properties.service.properties.serviceId",
                                            "title": "Service",
                                            "displayColumn": true,
                                            "type": "link",
                                            "istemplate": false,
                                            "headerclass": "md-cell-header",
                                            "cellClass": "md-cell-row",
                            			    "behaviour": {
                            				    "show": true,
                            					"readonly": true,
                            					"mandatory": false
                            				},
                            				"preserveOnDestroy": true,
                                            "linkclass": "itemlink",
                                            "event": "getserviceDeatilforService",
                                            "width": 1800
                                        }, {
                                            "key": "properties.location.title",
                                            "prop": "properties.location.title",
                                            "title": "Location",
                                            "displayColumn": true,
                                            "headerclass": "xl-cell-header",
                                            "cellClass": "xl-cell-row",
                                            "type": "text",
                                            "istemplate": false,
                            			    "behaviour": {
                            			 	    "show": true,
                            			 		"readonly": true,
                            			 		"mandatory": false
                            			 	},
                            			 	"preserveOnDestroy": true
                                        }, {
                                            "key": "properties.line",
                                            "prop": "properties.line",
                                            "title": "Product Type",
                                            "displayColumn": true,
                                            "headerclass": "lg-cell-header",
                                            "cellClass": "lg-cell-row",
                                            "type": "text",
                                            "istemplate": false,
                            			    "behaviour": {
                            			 	    "show": true,
                            			 		"readonly": true,
                            			 		"mandatory": false
                            			 	},
                            			 	"preserveOnDestroy": true,
                            			 	"pipes": "networkname"
                                        }, {
                                            "key": "properties.resource.properties.vpnName",
                                            "prop": "properties.resource.properties.vpnName",
                                            "title": "Network",
                                            "displayColumn": true,
                                            "headerclass": "lg-cell-header",
                                            "cellClass": "lg-cell-row",
                                            "type": "text",
                                            "istemplate": false,
                            			    "behaviour": {
                            				    "show": true,
                            					"readonly": true,
                            					"mandatory": false
                            				},
                            				"preserveOnDestroy": true
                                        }, {
                                            "key": "properties.service.properties.bandwidth",
                                            "prop": "properties.service.properties.bandwidth",
                                            "title": "Bandwidth",
                                            "displayColumn": true,
                                            "headerclass": "md-cell-header",
                                            "cellClass": "md-cell-row",
                                            "type": "text",
                                            "istemplate": true,
                            			    "behaviour": {
                            				    "show": true,
                            					"readonly": true,
                            					"mandatory": false
                            				},
                            				"preserveOnDestroy": true
                            				
                                        }, {
                                            "key": "properties.services[0].properties.flexing.bandwidth",
                                            "prop": "properties.services[0].properties.flexing.bandwidth",
                                            "title": "Flex",
                                            "displayColumn": true,
                                            "headerclass": "lg-cell-header",
                                            "cellClass": "lg-cell-row",
                                            "type": "template",
                                            "istemplate": false,
                            			    "behaviour": {
                            					"show": true,
                            					"readonly": true,
                            					"mandatory": false
                            				},
                            				"preserveOnDestroy": true,
                            				"event": "getTemplateForFlex",
                            				"renderStrategy": "flex"
                                        }, {
                                            "key": "properties.status.0.type",
                                            "prop": "properties.status.0.type",
                                            "title": "Service status",
                                            "displayColumn": true,
                                            "headerclass": "lg-cell-header",
                                            "cellClass": "lg-cell-row",
                                            "type": "template",
                                            "istemplate": false,
                            			    "behaviour": {
                            					"show": true,
                            					"readonly": true,
                            					"mandatory": false
                            				},
                            				"preserveOnDestroy": true,
                            				"event": "getTemplateForServiceStatus",
                            				"renderStrategy": "status-with-icon"
                                        }, {
                                            "key": "",
                                            "prop": "",
                                            "title": "",
                                            "displayColumn": true,
                                            "type": "cog",
                                            "istemplate": false,
                                            "headerclass": "sm-cell-header",
                                            "cellClass": "sm-cell-row",
                            			    "behaviour": {
                            				    "show": false,
                            					"readonly": true,
                            					"mandatory": false
                            				},
                            				"preserveOnDestroy": true,
                            				"linkclass": "cog",
                            				"imageurl": "../../assets/imgs/dwnsvg.svg",
                            				"imageclass": "imgcog"
                                        }],
                                        "stylesettings": {
                                            "headersettings": {
                                                "headerforecolor": "#00b1bb"
                                            }
                                        },
                                        "rowsettings": {
                                            "rowevenclass": {
                                                "backgroundcolor": "#f0f0f0",
                                                "height": "120px!important"
                                            },
                                            "rowoddclass": {
                                                "backgroundcolor": "#ffffff",
                                                "height": "120px!important"
                                            },
                                            "rowbodycell": {
                                                "fontsize": ".8em",
                                                "paddingtop": "1.1em",
                                                "paddingbottom": "1em",
                                                "whitespace": "normal",
                                                "height": "60"
                                            },
                                            "rowclasses": {
                                                "linkclass": "itemlink"
                                            }
                                        }
                                    }
                                },
                                "visible": true
                            }
                        }
                      },
                      {
                        "id" : "OD",
                        "title": "OTHER DETAILS",
                        "width": "20rem"
                      }
                    ]
                }    
            }
        }
    }
     
    
    
}



