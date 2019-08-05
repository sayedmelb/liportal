{
    "dashboard": {
        "fieldsets": [{
			"fields": ["map", "landingPageData"]
		}],
		"settings": {
		    "behaviour": {
		        "show": false
		    }
		},
        "rules": {
            "onInit": [{
                "trigger": "map",
                "script": "/*Script Name: [On Map Initialize]*/ evaluate=function(){if(resetDataSource(\"map\"),resetDataSource(\"landingPageData\"),updateDataSource(\"landingPageData\",[model]),console.log(\"inside map =>\",model),model.location){var a=[];model.location.forEach(h=>{a.push({address:h,products:getProducts(h.properties.products,model),marker:getMarker(h.properties.products,model),services:getServices(h.properties.services,model)})}),console.log(\"datasource for map => \",a),updateDataSource(\"map\",a);let b=location.properties.products.length,c=filterByStatus(location.properties.products,\"Active\"),d=filterByStatus(location.properties.products,\"flexing\"),e=filterByStatus(location.properties.products,\"warning\"),f=filterByStatus(location.properties.products,\"outage\"),g=filterByStatus(location.properties.products,\"In-progress\");call(\"content.home.dashboard.map\",\"onControlsReload\",null,null,[{id:\"all\",title:\"All \"+b,active:!0},{id:\"normal\",title:\"Normal \"+c},{id:\"flexing\",title:\"Flexing \"+d},{id:\"warning\",title:\"Warning \"+e},{id:\"outage\",title:\"Outage \"+f},{id:\"provisioning\",title:\"In Provisioning \"+g}])}};var _=getLodash(),filterByStatus=function(a,b){let c=0;return _.forEach(a,d=>{if(d.properties.status){console.log(\"counting for =>\",b);let e=_.find(d.properties.status,f=>{return f.type==b});e&&e.type&&e.type==b&&c++}}),c},getProducts=function(a,b){let c=[];return a.forEach(d=>{let e=b.product.find(f=>{return f.id==d});!e||c.push(e)}),c},getServices=function(a,b){let c=[];return a.forEach(d=>{let e=b.service.find(f=>{return f.id==d});!e||c.push(e)}),c},getMarker=function(a){let b=\"normal\";if(a&&0<a.length){let d,e=!1;if(_.forEach([\"outage\",\"warning\",\"flexing\",\"normal\",\"In-progress\"],f=>{if(d=_.find(a[0].properties.status,g=>{if(console.log(\"status lower\",g.type.toLowerCase()),g.type.toLowerCase()==f.toLowerCase())return e=!0,!0}),e)return!1}),console.log(\"priority for marker =>\",a[0],a[0].properties.status,d),d)switch(d.type.toUpperCase()){case\"OUTAGE\":b=\"outage\";break;case\"WARNING\":b=\"warning\";break;case\"FLEXING\":b=\"flexing\";break;case\"IN-PROGRESS\":b=\"provisioning\";break;default:}}return b}"
            }],
            "onHover": [{
                "trigger": "map",
                "script":  "/*Script Name: [Set Marker Info]*/ evaluate=function(){let a=getValue(\"map\").location;console.log(\"Set marker info map =>\",getValue(\"map\"));let b=\"<div class='info-content'>\",d=a.properties.products.length,e=1;a.properties.products.forEach(f=>{let g=getStatus([f]),h=f.properties.service;b=b+\"<div class='info-address'>\"+f.properties.location.title+\"</div>\",b=b+\"<p><span class='info-sub'>\"+getNetworkName(f.properties.line)+\"  -  \"+h.properties.serviceId+\"</span><br><span>\"+h.properties.bandwidth+\"</span></p><br>\"+g+\"<br>\",e==d||(b+=\"<hr class='hrdivider'>\"),e++}),b+=\"</div>\",updateSettings(\"map\",{info:{text:b,class:\"info-window\"}})};var getNetworkName=function(a){return\"SDETHERNET\"==a.toUpperCase()?\"SD Ethernet\":\"Evolve EWAN\"},getStatusTemplate=function(a){let b;return a.properties.status.includes(\"warning\")&&a.properties.status.includes(\"flexing\")?b=\"<img src='../../assets/imgs/warningSignIcon.png'> Utilisation Warning<br><img src='../../assets/imgs/flexingsignicon.png' class='popover-img'> Flexing</p>\":a.properties.status.includes(\"warning\")?b=\"<img src='../../assets/imgs/warningSignIcon.png'> Utilisation Warning</p>\":a.properties.status.includes(\"flexing\")?b=\"<img src='../../assets/imgs/flexingSignIcon.png'> Flexing</p>\":a.properties.status.includes(\"normal\")?b=\"<img src='../../assets/imgs/NormalSignIcon.png'> Normal</p>\":a.properties.status.includes(\"outage\")?b=\"<img src='../../assets/imgs/outageSignIcon.png'> Outage</p>\":a.properties.status.includes(\"provisioning\")&&(b=\"<img src='../../assets/imgs/provisioningSignIcon.png'> Provisioning</p>\"),b||\"\"},getStatus=function(a){let b=\"\";if(a&&0<a.length){let d;if(_.forEach([\"outage\",\"warning\",\"flexing\",\"active\",\"in-progress\"],e=>{if(d=_.find(a[0].properties.status,f=>{return f.type.toLowerCase()==e}),d)return!1}),console.log(\"priority for marker =>\",a[0].properties.status,d),d)switch(d.type.toLowerCase()){case\"outage\":b=\"<span><img src='../../assets/imgs/outage.png' alt=''>  Outage</span>\";break;case\"warning\":b=\"<span><img src='../../assets/imgs/warning.png' alt=''>  Warning\";break;case\"flexing\":b=\"<span><img src='../../assets/imgs/flexing.png' alt=''>  Flexing\";break;case\"in-progress\":b=\"<span><img src='../../assets/imgs/provisioning.png' alt=''>  In Provisioning</span>\";break;default:b=\"<span><img src='../../assets/imgs/Normal.png' alt=''>  Normal</span>\";}}return b}"
                
            }],
            "onChildLoad": [{
                "trigger": "map",
                "script": "/*Script Name: [Child Load]*/ evaluate=function(){let a=getValue(\"map\").location,b=getValue(\"map\");console.log(\"cdo: Map Child Load service and map\",a,b),updateSettings(\"map\",{center:{lat:+location.lat,lng:+location.long},zoom:9});let c=getValue(\"map\");console.log(\"cdo: Map Child Load service after update of center and imap\",a,c)}"
            }],
            "onStatusDisplay": [{
                "trigger": "map",
                "script": "/*Script Name: [Display Status from Template]*/ evaluate=function(){let a,b=model;a=\"<img class='status-icon status-sidebar-icon' style='width:20px; height:20px;' src='\"+getImage(b)+\"' > \",a=a+\"<span class='statuslabel' style='margin-top:4px; padding-left:4px'>\"+getStatus(b)+\"</span>\",success(a)};var getStatus=function(a){let b=\"Normal\";if(a&&a.properties.status){let d,e=!1;if(_.forEach([\"outage\",\"warning\",\"flexing\",\"active\",\"in-progress\"],f=>{if(d=_.find(a.properties.status,g=>{if(g.type.toLowerCase()==f.toLowerCase())return e=!0,!0}),e)return!1}),d)switch(d.type.toLowerCase()){case\"outage\":b=\"Outage\";break;case\"warning\":b=\"Warning\";break;case\"flexing\":b=\"Flexing\";break;case\"in-progress\":b=\"In Provisioning\";break;default:b=\"Normal\";}}return b},getImage=function(a){let b=\"../../assets/imgs/NormalSignIcon.png\",c=getStatus(a);switch(c.toLowerCase()){case\"outage\":b=\"../../assets/imgs/outage.png\";break;case\"warning\":b=\"../../assets/imgs/warning.png\";break;case\"flexing\":b=\"../../assets/imgs/flexing.png\";break;case\"in provisioning\":b=\"../../assets/imgs/provisioning.png\";break;default:b=\"../../assets/imgs/Normal.png\";}return b}"
            }],
            "onUtilizationDisplay": [{
                "trigger": "map",
                "script": "/*Script Name: [Display Utilization from Template]*/ evaluate=function(){let a=\" <ion-col col-6 class='field-label'>Utilizations</ion-col>\";a=a+\"<ion-col col-6 class='field-text'>\"+model.properties.service.properties.utilization.utilization+\"</ion-col>\",success(a)}"
            }],
            "onFilter": [{
                "trigger": "map",
                "script": "/*Script Name: [Click Filter]*/ evaluate=function(){success({line:{title:\"Service type\",values:{Internet:!0,Ethernet:!0}},category:{title:\"Product Family\",values:{SD:!0,\"Evolve EWAN\":!0}}})}"
            }],
            "onAll": [{
                "trigger": "map",
                "script": "/*Script Name: [Click All]*/ var _=getLodash();evaluate=function(){var a=[],b=getDataSource(\"landingPageData\");console.log(\"model => \",b);let c=b[0];b[0].location&&(resetDataSource(\"map\"),b[0].location.forEach(d=>{a.push({address:d,products:getProducts(d.properties.products,c),marker:getMarker(d.properties.products,c),services:getServices(d.properties.services,c)})}),console.log(\"datasource for map => \",a),updateDataSource(\"map\",a)),call(\"content.home.dashboard.map\",\"updateBehaviour\",null,null,{showChild:!1})};var getProducts=function(a,b){let c=[];return a.forEach(d=>{let e=b.product.find(f=>{return f.id==d});!e||c.push(e)}),c},getServices=function(a,b){let c=[];return a.forEach(d=>{let e=b.service.find(f=>{return f.id==d});!e||c.push(e)}),c},getMarker=function(a){let b=\"normal\";if(a&&0<a.length){let d;if(_.forEach([\"outage\",\"warning\",\"flexing\",\"normal\",\"In-progress\"],e=>{d=_.find(a[0].properties.status,f=>{return f.type==e})}),console.log(\"priority for marker =>\",a[0].properties.status,d),d)switch(d.type.toUpperCase()){case\"OUTAGE\":b=\"outage\";break;case\"WARNING\":b=\"warning\";break;case\"FLEXING\":b=\"flexing\";break;case\"IN-PROGRESS\":b=\"provisioning\";break;default:}}return b}"
            }],
            "onNormal": [{
                "trigger": "map",
                "script": "/*Script Name: [Click Normal]*/ var _=getLodash();evaluate=function(){var a=[],b=getDataSource(\"landingPageData\");console.log(\"model => \",b);let c=b[0];b[0].location&&(resetDataSource(\"map\"),b[0].location.forEach(d=>{console.log(\"filter results =>\",filterByStatus(d.properties.products,\"Active\")),filterByStatus(d.properties.products,\"Active\")&&a.push({address:d,products:getProducts(d.properties.products,c),marker:getMarker(d.properties.products,c),services:getServices(d.properties.services,c)})}),console.log(\"datasource for map => \",a),updateDataSource(\"map\",a)),call(\"content.home.dashboard.map\",\"updateBehaviour\",null,null,{showChild:!1})};var filterByStatus=function(a,b){let c=0;return _.forEach(a,d=>{if(d.properties.status){let e=_.find(d.properties.status,f=>{return f.type==b});e&&e.type&&\"Active\"==e.type&&c++}}),c},getProducts=function(a,b){let c=[];return a.forEach(d=>{let e=b.product.find(f=>{return f.id==d});!e||c.push(e)}),c},getServices=function(a,b){let c=[];return a.forEach(d=>{let e=b.service.find(f=>{return f.id==d});!e||c.push(e)}),c},getMarker=function(a){let b=\"normal\";if(a&&0<a.length){let d;if(_.forEach([\"outage\",\"warning\",\"flexing\",\"normal\",\"In-progress\"],e=>{d=_.find(a[0].properties.status,f=>{return f.type==e})}),console.log(\"priority for marker =>\",a[0].properties.status,d),d)switch(d.type.toUpperCase()){case\"OUTAGE\":b=\"outage\";break;case\"WARNING\":b=\"warning\";break;case\"FLEXING\":b=\"flexing\";break;case\"IN-PROGRESS\":b=\"provisioning\";break;default:}}return b}"
            }],
            "onFlex": [{
                "trigger": "map",
                "script": "/*Script Name: [Click Flexing]*/ var _=getLodash();evaluate=function(){var a=[],b=getDataSource(\"landingPageData\");console.log(\"model => \",b);let c=b[0];b[0].location&&(resetDataSource(\"map\"),b[0].location.forEach(d=>{console.log(\"filter results =>\",filterByStatus(d.properties.products,\"flexing\")),filterByStatus(d.properties.products,\"flexing\")&&a.push({address:d,products:getProducts(d.properties.products,c),marker:getMarker(d.properties.products,c),services:getServices(d.properties.services,c)})}),console.log(\"datasource for map => \",a),updateDataSource(\"map\",a)),call(\"content.home.dashboard.map\",\"updateBehaviour\",null,null,{showChild:!1})};var filterByStatus=function(a,b){let c=0;return _.forEach(a,d=>{if(d.properties.status){let e=_.find(d.properties.status,f=>{return f.type==b});e&&e.type&&\"flexing\"==e.type&&c++}}),c},getProducts=function(a,b){let c=[];return a.forEach(d=>{let e=b.product.find(f=>{return f.id==d});!e||c.push(e)}),c},getServices=function(a,b){let c=[];return a.forEach(d=>{let e=b.service.find(f=>{return f.id==d});!e||c.push(e)}),c},getMarker=function(a){let b=\"normal\";if(a&&0<a.length){let d;if(_.forEach([\"outage\",\"warning\",\"flexing\",\"normal\",\"In-progress\"],e=>{d=_.find(a[0].properties.status,f=>{return f.type==e})}),console.log(\"priority for marker =>\",a[0].properties.status,d),d)switch(d.type.toUpperCase()){case\"OUTAGE\":b=\"outage\";break;case\"WARNING\":b=\"warning\";break;case\"FLEXING\":b=\"flexing\";break;case\"IN-PROGRESS\":b=\"provisioning\";break;default:}}return b}"
            }],
            "onWarning": [{
                "trigger": "map",
                "script": "/*Script Name: [Click Utilisation Warning]*/ var _=getLodash();evaluate=function(){var a=[],b=getDataSource(\"landingPageData\");console.log(\"model => \",b);let c=b[0];b[0].location&&(resetDataSource(\"map\"),b[0].location.forEach(d=>{console.log(\"filter results =>\",filterByStatus(d.properties.products,\"warning\")),filterByStatus(d.properties.products,\"warning\")&&a.push({address:d,products:getProducts(d.properties.products,c),marker:getMarker(d.properties.products,c),services:getServices(d.properties.services,c)})}),console.log(\"datasource for map => \",a),updateDataSource(\"map\",a)),call(\"content.home.dashboard.map\",\"updateBehaviour\",null,null,{showChild:!1})};var filterByStatus=function(a,b){let c=0;return _.forEach(a,d=>{if(d.properties.status){let e=_.find(d.properties.status,f=>{return f.type==b});e&&e.type&&\"warning\"==e.type&&c++}}),c},getProducts=function(a,b){let c=[];return a.forEach(d=>{let e=b.product.find(f=>{return f.id==d});!e||c.push(e)}),c},getServices=function(a,b){let c=[];return a.forEach(d=>{let e=b.service.find(f=>{return f.id==d});!e||c.push(e)}),c},getMarker=function(a){let b=\"normal\";if(a&&0<a.length){let d;if(_.forEach([\"outage\",\"warning\",\"flexing\",\"normal\",\"In-progress\"],e=>{d=_.find(a[0].properties.status,f=>{return f.type==e})}),console.log(\"priority for marker =>\",a[0].properties.status,d),d)switch(d.type.toUpperCase()){case\"OUTAGE\":b=\"outage\";break;case\"WARNING\":b=\"warning\";break;case\"FLEXING\":b=\"flexing\";break;case\"IN-PROGRESS\":b=\"provisioning\";break;default:}}return b}"
            }],
            "onOutage": [{
                "trigger": "map",
                "script": "/*Script Name: [Click Outage]*/ var _=getLodash();evaluate=function(){var a=[],b=getDataSource(\"landingPageData\");console.log(\"model => \",b);let c=b[0];b[0].location&&(resetDataSource(\"map\"),b[0].location.forEach(d=>{console.log(\"filter results =>\",filterByStatus(d.properties.products,\"outage\")),filterByStatus(d.properties.products,\"outage\")&&a.push({address:d,products:getProducts(d.properties.products,c),marker:getMarker(d.properties.products,c),services:getServices(d.properties.services,c)})}),console.log(\"datasource for map => \",a),updateDataSource(\"map\",a)),call(\"content.home.dashboard.map\",\"updateBehaviour\",null,null,{showChild:!1})};var filterByStatus=function(a,b){let c=0;return _.forEach(a,d=>{if(d.properties.status){let e=_.find(d.properties.status,f=>{return f.type==b});e&&e.type&&\"outage\"==e.type&&c++}}),c},getProducts=function(a,b){let c=[];return a.forEach(d=>{let e=b.product.find(f=>{return f.id==d});!e||c.push(e)}),c},getServices=function(a,b){let c=[];return a.forEach(d=>{let e=b.service.find(f=>{return f.id==d});!e||c.push(e)}),c},getMarker=function(a){let b=\"normal\";if(a&&0<a.length){let d;if(_.forEach([\"outage\",\"warning\",\"flexing\",\"normal\",\"In-progress\"],e=>{d=_.find(a[0].properties.status,f=>{return f.type==e})}),console.log(\"priority for marker =>\",a[0].properties.status,d),d)switch(d.type.toUpperCase()){case\"OUTAGE\":b=\"outage\";break;case\"WARNING\":b=\"warning\";break;case\"FLEXING\":b=\"flexing\";break;case\"IN-PROGRESS\":b=\"provisioning\";break;default:}}return b}"
            }],
            "onProvisioning": [{
                "trigger": "map",
                "script": "/*Script Name: [Click Provisioning]*/ var _=getLodash();evaluate=function(){var a=[],b=getDataSource(\"landingPageData\");console.log(\"model => \",b);let c=b[0];b[0].location&&(resetDataSource(\"map\"),b[0].location.forEach(d=>{console.log(\"filter results =>\",filterByStatus(d.properties.products,\"In-progress\")),filterByStatus(d.properties.products,\"In-progress\")&&a.push({address:d,products:getProducts(d.properties.products,c),marker:getMarker(d.properties.products,c),services:getServices(d.properties.services,c)})}),console.log(\"datasource for map => \",a),updateDataSource(\"map\",a)),call(\"content.home.dashboard.map\",\"updateBehaviour\",null,null,{showChild:!1})};var filterByStatus=function(a,b){let c=0;return _.forEach(a,d=>{if(d.properties.status){let e=_.find(d.properties.status,f=>{return f.type==b});e&&e.type&&\"In-progress\"==e.type&&c++}}),c},getProducts=function(a,b){let c=[];return a.forEach(d=>{let e=b.product.find(f=>{return f.id==d});!e||c.push(e)}),c},getServices=function(a,b){let c=[];return a.forEach(d=>{let e=b.service.find(f=>{return f.id==d});!e||c.push(e)}),c},getMarker=function(a){let b=\"normal\";if(a&&0<a.length){let d;if(_.forEach([\"outage\",\"warning\",\"flexing\",\"normal\",\"In-progress\"],e=>{d=_.find(a[0].properties.status,f=>{return f.type==e})}),console.log(\"priority for marker =>\",a[0].properties.status,d),d)switch(d.type.toUpperCase()){case\"OUTAGE\":b=\"outage\";break;case\"WARNING\":b=\"warning\";break;case\"FLEXING\":b=\"flexing\";break;case\"IN-PROGRESS\":b=\"provisioning\";break;default:}}return b}"
            }],
            "getControls": [{
                "trigger": "map",
                "script": "/*Script Name: [Get Controls]*/ evaluate=function(){let a=getValue(\"map\").selected,b=a.title,c=a.properties.status,d=[];switch(b){case\"SD Ethernet\":switch(c){case\"outage\":d=[\"c1\",\"c4\",\"c5\",\"c6\",\"c7\"];break;case\"provisioning\":d=[\"c4\",\"c5\",\"c6\",\"c7\"];break;default:d=[\"c1\",\"c2\",\"c3\",\"c4\",\"c5\",\"c6\",\"c7\"];}break;case\"SD Internet\":d=[\"c1\",\"c2\",\"c3\",\"c4\",\"c5\",\"c6\",\"c7\"];break;case\"Evolve EWAN Ethernet\":d=[\"c4\",\"c5\",\"c6\",\"c7\"];break;case\"Evolve EWAN Internet\":d=[\"c4\",\"c5\",\"c6\",\"c7\"];break;case\"EWAN\":d=[\"c4\",\"c5\",\"c6\",\"c7\"];break;default:d=[\"c1\",\"c2\",\"c3\",\"c4\",\"c5\",\"c6\",\"c7\"];}call(\"content.home.dashboard.map\",\"onControlsFilter\",null,null,d)}"
            }],
            "onClick": [{
                "trigger": "map",
                "script": "/*Script Name: [On Click]*/ evaluate=function(){let a=getValue(\"map\").location;console.log(\"Map pointer clicked aaa\",a.title,a),updateSettings(\"map\",{center:a.title,zoom:16}),call(\"content.home.dashboard.map\",\"updateBehaviour\",null,null,{showChild:!0})}"
            }],
            "onClose": [{
                "trigger": "map",
                "script": "/*Script Name: [On Close]*/ evaluate=function(){updateSettings(\"map\",{center:\"Arckaringa, Australia\",zoom:4}),call(\"content.home.dashboard.map\",\"updateBehaviour\",null,null,{showChild:!1})}"
            }],
            "onPermanentBandwidthChange": [{
                "trigger": "map",
                "script": "/*Script Name: [On Permanent Bandwidth Change]*/ evaluate=function(){let a=getValue(\"map\"),b;!a||(b=a.selected),b||(b=getValue(\"details\"));let c=getLodash(),d=getDataSource(\"landingPageData\");console.log(\"in perm bw=>\",a,getValue(\"details\"),model,getDataSource(\"map\"),getDataSource(\"landingPageData\"));let e={serviceId:b.id,product:b,type:\"Permanent\",LPDS:d};callService(\"07122018-0114-3959-70ba-c0e17d2a8423\",e,f=>{f.model={serviceDetails:e},console.log(\"PB HC result =>\",f),navigate(f)},f=>{showAlert(f)})}"
            }],
            "onScheduledBandwidthFlex": [{
                "trigger": "map",
                "script":  "/*Script Name: [On Scheduled Bandwidth Flex]*/ evaluate=function(){let a=getValue(\"map\"),b;!a||(b=a.selected),b||(b=getValue(\"details\"));let c=getLodash(),d=getDataSource(\"landingPageData\");console.log(\"in schdule lunar module bw=>\",a,getValue(\"details\"),model,getDataSource(\"map\"),getDataSource(\"landingPageData\"),getDataSource(\"dashboard.landingPageData\"));let e={serviceId:b.id,product:b,type:\"Scheduled\",LPDS:d};callService(\"11122018-0251-5712-997f-d69cee2dd344\",e,f=>{f.model={serviceDetails:e},console.log(\"schedule lunar result =>\",f),navigate(f)},f=>{showAlert(f)})}"
            }],
            "onDynamicFlex": [{
                "trigger": "map",
                "script": "/*Script Name: [On Demand Flex Lunar]*/ evaluate=function(){let a=getValue(\"map\"),b;!a||(b=a.selected),b||(b=getValue(\"details\"));getLodash();console.log(\"product for ondemand in dashboard\",b),console.log(\"model for ondemand in dashboard\",model);let d=getDataSource(\"landingPageData\");console.log(\"cdo:in ondemand lunar module bw=>\",a,getValue(\"details\"),model,getDataSource(\"map\"),getDataSource(\"landingPageData\"),getDataSource(\"dashboard.landingPageData\"));let e={serviceId:b.id,product:b,type:\"ondemand\",LPDS:d};console.log(\"LPDS map\",d),console.log(\"serviceDetails map\",e),callService(\"12052019-0030-2589-f907-518b52e0030f\",e,f=>{f.model={serviceDetails:e},console.log(\"ondemand lunar result =>\",f),navigate(f)},f=>{showAlert(f)})}"
            }],
             "getserviceDeatilforServiceFromMap": [{
                "trigger": "map",
                "script": "/*Script Name: [On Get Service Details from sidebar]*/ evaluate=function(){console.log(\"In Map serviceDetails request lunar module\");let a=getValue(\"map\"),b;!a||(b=a.selected),b||(b=getValue(\"details\"));let c=getLodash(),d=getDataSource(\"landingPageData\"),e={serviceId:b.id,product:{products:d[0].product,selectedproduct:b},type:\"servicesdetails\",LPDS:d};callService(\"26022019-1126-1009-1248-16874fb7abd4\",e,f=>{f.model={serviceDetails:e},console.log(\"cdo:sidebar call to get services detail =>\",f),navigate(f)},f=>{showAlert(f)})}"
                }],
                 "onReloadedMap": [{
                "trigger": "map",
                "script": "/*Script Name: [On Map reload list]*/ evaluate=function(){console.log(\"cdo: reload starts\"),console.log(\"model CDO reload list: map\",model);let a=model.content.home;console.log(\"home\",a);let b=\"\";b=a.dashboard&&a.dashboard.map&&a.dashboard.map.customerid?a.dashboard.map.customerid:\"51271\",console.log(\"Customer ID = > \",b),getData(\"29112018-0454-0769-3c63-f6271c2553df\",{pageName:\"portalLandingPage\",pagetype:\"model\",properties:{customerId:b}},c=>{console.log(\"result received =>\",c);var d=Object.assign({},c);c.location.forEach(g=>{let h=[];d.service.forEach(j=>{if(j.reference){let k=j.reference.filter(l=>{return l.localId==g.id});k&&0<k.length&&h.push(j)}});let i=[];d.product.forEach(j=>{if(j&&j.reference){let k=j.reference.filter(m=>{return\"service\"==m.type}),l=[];if(k.forEach(m=>{let n=d.service.find(q=>{return q.id==m.localId}),o=d.service.find(q=>{return q.id==m.localId&&\"TBA\"!=q.properties.serviceId});!o||(j.properties.service=_.cloneDeep(o)),!n||(n.properties.productId=j.id,l.push(n))}),j.properties.services=_.cloneDeep(l),l.forEach(m=>{if(m&&m.reference&&0<m.reference.length){let n=m.reference.find(o=>{return o.localId==g.id});!n||(j.properties.location=_.cloneDeep(g),i.push(j)),!n||j.properties.service||(j.properties.service=_.cloneDeep(m))}}),j.properties.service){let m=_.find(j.properties.service.reference,v=>{return\"resource\"==v.type&&\"network\"==v.subtype});if(m){let v=_.find(d.resource,w=>{return w.id==m.localId});v&&(j.properties.resource=v)}let n=[];_.forEach(j.properties.service.reference,v=>{let w=_.find(d.resource,x=>{return x.id==v.localId});w&&n.push(_.cloneDeep(w))}),j.properties.resources=n;let o=_.find(j.properties.status,v=>{return\"In-progress\"==v.type});if(o&&(j.properties.service.properties.serviceId=\"TBA\"),\"2e33a2c1-0bcf-4066-a043-4e8891315332\"==j.id){let w=_.find(j.properties.status,x=>{return\"Flexing\"==x.type});w||j.properties.status.push({type:\"Flexing\",subtype:\"scheduled\",pcr:\"TESTING_CPO_PO_RECEIVED_COMPLETED\"})}j.properties.services.forEach(v=>{j.properties.Flexing=\"\";let x=_.find(j.properties.status,z=>{if(\"flex\"==z.type)return z});if(x){let z={type:\"Flexing\",subtype:x.subtype,pcr:x.pcr},A=_.find(j.properties.status,B=>{if(\"Flexing\"==B.type)return B});A||j.properties.status.push(z)}let y=_.find(j.properties.status,z=>{if(\"Flexing\"==z.type)return z});v.properties.bandwidth&&\"schedule_flex\"==v.title&&y&&(j.properties.Flexing=v.properties.bandwidth)});let q=[],r=_.find(j.properties.status,v=>{if(\"Flexing\"==v.type)return v}),t=_.find(j.properties.status,v=>{if(\"In-progress\"==v.type)return v}),u=_.find(j.properties.status,v=>{if(\"Active\"==v.type)return v});r&&q.push(r),u&&q.push(u),t&&q.push(t),j.properties.status=q}}}),g.properties={services:_.cloneDeep(h),products:_.cloneDeep(i)}});let e=c;if(resetDataSource(\"map\"),e.location){var f=[];e.location.forEach(g=>{f.push({address:g,products:getProducts(g.properties.products,e),marker:getMarker(g.properties.products,e),services:getServices(g.properties.services,e)})}),console.log(\"datasource for map reload => \",f),updateDataSource(\"map\",f)}console.log(\"result from service reload: cdo: MAP  => \",c),success&&success(c),d=void 0},c=>{console.log(c)})};var _=getLodash(),filterByStatus=function(a,b){let c=0;return _.forEach(a,d=>{if(d.properties.status){console.log(\"counting for =>\",b);let e=_.find(d.properties.status,f=>{return f.type==b});e&&e.type&&e.type==b&&c++}}),c},getProducts=function(a,b){let c=[];return a.forEach(d=>{let e=b.product.find(f=>{return f.id==d});!e||c.push(e)}),c},getServices=function(a,b){let c=[];return a.forEach(d=>{let e=b.service.find(f=>{return f.id==d});!e||c.push(e)}),c},getMarker=function(a){let b=\"normal\";if(a&&0<a.length){let d,e=!1;if(_.forEach([\"outage\",\"warning\",\"flexing\",\"normal\",\"In-progress\"],f=>{if(d=_.find(a[0].properties.status,g=>{if(console.log(\"status lower\",g.type.toLowerCase()),g.type.toLowerCase()==f.toLowerCase())return e=!0,!0}),e)return!1}),console.log(\"priority for marker =>\",a[0],a[0].properties.status,d),d)switch(d.type.toUpperCase()){case\"OUTAGE\":b=\"outage\";break;case\"WARNING\":b=\"warning\";break;case\"FLEXING\":b=\"flexing\";break;case\"IN-PROGRESS\":b=\"provisioning\";break;default:}}return b}"
                }]
        },
        "properties": {
            "map": {
                "widget": "map",
                "settings": {
                    "center": "Arckaringa, Australia",
                    "zoom": 4.0,
                    "path": "/assets/imgs/",
                    "marker": {
                        "normal": "NormalSign.png",
                        "flexing": "flexingSign.png",
                        "warning": "warningSign.png",
                        "outage": "outageSign.png",
                        "provisioning": "provisioningSign.png"
                    },
                    "signs": {
                        "normal": "NormalSignIcon.png",
                        "flexing": "flexingSignIcon.png",
                        "warning": "warningSignIcon.png",
                        "outage": "outageSignIcon.png",
                        "provisioning": "provisioningSignIcon.png"
                    },
                    "info": {
                        "class": "info-window"
                    },
                    "behaviour": {
                        "showChild": false
                    }
                },
                "events": [
                    "onInit", "onHover", "onChildLoad", "onControlsReload", "getControls", "onClick", "onClose", "onPermanentBandwidthChange", "onScheduledBandwidthFlex", "onDynamicFlex", "getserviceDeatilforServiceFromMap", "onReloadedMap"
                ],
                "controls": [{
                    "id": "products",
                    "title": "Product",
                    "subtitle": "Filters",
                    "type": "search",
                    "clear": true,
                    "event": {
                        "type": "onFilter"
                    }
                }, {
                    "id": "all",
                    "title": "All",
                    "type": "button",
                    "outline": true,
                    "large": true,
                    "color": "light",
                    "active": true,
                    "event": {
                        "type": "onAll"
                    }
                },  {
                    "id": "normal",
                    "title": "Normal",
                    "type": "button",
                    "outline": true,
                    "large": true,
                    "color": "light",
                    "event": {
                        "type": "onNormal"
                    }
                },  {
                    "id": "flexing",
                    "title": "Flexing",
                    "type": "button",
                    "outline": true,
                    "large": true,
                    "color": "light",
                    "event": {
                        "type": "onFlex"
                    }
                },  {
                    "id": "warning",
                    "title": "Utilisation Warning",
                    "type": "button",
                    "outline": true,
                    "large": true,
                    "color": "light",
                    "event": {
                        "type": "onWarning"
                    }
                },  {
                    "id": "outage",
                    "title": "Outage",
                    "type": "button",
                    "outline": true,
                    "large": true,
                    "color": "light",
                    "event": {
                        "type": "onOutage"
                    }
                },  {
                    "id": "provisioning",
                    "title": "In Provisioning",
                    "type": "button",
                    "outline": true,
                    "large": true,
                    "color": "light",
                    "event": {
                        "type": "onProvisioning"
                    }
                }],
                "child": {
                    "widget": "sidebar",
                    "icon": "md-settings",
                    "icon-color": "optusgrey",
                    "settings": {
                        "rows": [{
                            "key": "properties.service.properties.serviceId",
                            "title": "Service ID",
                            "type": "col"
                        }, {
                            "key": "properties.location.title",
                            "title": "Address",
                            "type": "col"
                        },  {
                            "key": "properties.line",
                            "title": "Product",
                            "type": "col",
                            "pipes": "networkName"
                        },  {
                            "key": "properties.resource.properties.vpnName",
                            "title": "Network",
                            "type": "col"
                        },  {
                            "key": "properties.service.properties.bandwidth",
                            "title": "Contracted BW",
                            "type": "col"
                            
                        },  {
                            "key": "properties.offer.properties.pricetemplate",
                            "title": "Rate",
                            "type": "col"
                        }, {
                            "key": "properties.service.properties.utilization.utilization",
                            "title": "Utilization",
                            "type": "col"
                        }, {
                            "type": "template",
                            "event": "onStatusDisplay"
                        },
                         {
                            "key": "properties.Flexing",
                            "title": "Currently Flexing",
                            "type": "col-nodisplay"
                        }
                        ]    
                    },
                    "events": [
                        "onStatusDisplay", "onUtilizationDisplay"
                    ],
                    "controls": [{
                        "id": "c1",
                        "title": "Permanent Change",
                        "event": {
                            "type": "onPermanentBandwidthChange"
                        }
                    }, {
                        "id": "c2",
                        "title": "Schedule Flex",
                        "event": {
                            "type": "onScheduledBandwidthFlex"
                        }
                    }, {
                        "id": "c3",
                        "title": "Dynamic Flex",
                        "event": {
                            "type": "onDynamicFlex"
                        }
                    }, {
                        "id": "c4",
                        "title": "Raise an incident",
                        "event": {
                            "type": "onDoNothing"
                        }
                    }, {
                        "id": "c5",
                        "title": "Add new service at this location",
                        "event": {
                            "type": "onDoNothing"
                        }
                    }, {
                        "id": "c6",
                        "title": "View Service",
                        "event": {
                            "type": "getserviceDeatilforServiceFromMap"
                        }
                    }]
                }
            },
            "landingPageData": {
                "widget": "blank"
            }
        }
    },
    "services": {
        "rules": {
            "onInit": [{
                "trigger": "details",
                "script": "/*Script Name: [Load Services List]*/ evaluate=function(){resetDataSource(\"landingPageData\"),updateDataSource(\"landingPageData\",[model]),console.log(\"In Load Services List =>\",model),model.location&&model.product&&model.service&&(console.log(\"model.location from Load Services Change:\",model.location),call(\"content.home.services.details\",\"onLoad\",null,null,model.product))}"
            }],
             "getTemplateForBandwidth": [{
                "trigger": "details",
                "script": "/*Script Name: [Get Template for Bandwidth]*/ evaluate=function(){let a,b=getValue(\"details\"),c=b.properties.service.properties.bandwidth;a=\"\"+c,success(a)}"
            }],
             "getTemplateForServiceStatus": [{
                "trigger": "details",
                "script": "/*Script Name: [Get Template for Service Status]*/ evaluate=function(){let a,b=getValue(\"details\");a=\"<img class='status-icon' src='\"+getImage(b)+\"' > \"+getStatus(b),success(a)};var getStatus=function(a){let b=\"Normal\";if(a&&a.properties.status){let d;if(_.forEach([\"outage\",\"warning\",\"flexing\",\"active\",\"in-progress\"],e=>{d=_.find(a.properties.status,f=>{return f.type.toLowerCase()==e})}),d)switch(d.type.toLowerCase()){case\"outage\":b=\"Outage\";break;case\"warning\":b=\"Warning\";break;case\"flexing\":b=\"Flexing\";break;case\"in-progress\":b=\"In Provisioning\";break;default:b=\"Normal\";}}return b},getImage=function(a){let b=\"../../assets/imgs/NormalSignIcon.png\",c=getStatus(a);switch(c.toLowerCase()){case\"outage\":b=\"../../assets/imgs/outageSignIcon.png\";break;case\"warning\":b=\"../../assets/imgs/warningSignIcon.png\";break;case\"flexing\":b=\"../../assets/imgs/flexingSignIcon.png\";break;case\"in provisioning\":b=\"../../assets/imgs/provisioningSignIcon.png\";break;default:b=\"../../assets/imgs/NormalSignIcon.png\";}return b}"
            }],
             "getTemplateForFlex": [{
                "trigger": "details",
                "script": "/*Script Name: [Get Template for Flex Condition]*/ evaluate=function(){let a=\"\";a+=\"No events scheduled\",success(a)}"
            }],
            "getControls": [{
                "trigger": "details",
                "script": "/*Script Name: [Get Controls For Services List]*/ evaluate=function(){let a=getValue(\"details\");console.log(\"Get controls for services list- =>\",a);let b=a.title,c=[];c=\"SD Ethernet\"===b?[\"c1\",\"c2\",\"c3\",\"c4\",\"c5\",\"c6\",\"c7\"]:\"EWAN\"===b?[\"c4\",\"c5\",\"c6\",\"c7\"]:[\"c1\",\"c2\",\"c3\",\"c4\",\"c5\",\"c6\",\"c7\"];call(\"content.home.services.details\",\"onControlsFilter\",null,null,c)}"
            }],
            "onPermanentBandwidthChange": [{
                "trigger": "details",
                "script": "/*Script Name: [On Permanent Bandwidth Change]*/ evaluate=function(){let a=getValue(\"map\"),b;!a||(b=a.selected),b||(b=getValue(\"details\"));let c=getLodash(),d=getDataSource(\"landingPageData\");console.log(\"in perm bw=>\",a,getValue(\"details\"),model,getDataSource(\"map\"),getDataSource(\"landingPageData\"),getDataSource(\"dashboard.landingPageData\"));let e={serviceId:b.id,product:b,type:\"Permanent\",LPDS:d};callService(\"07122018-0114-3959-70ba-c0e17d2a8423\",e,f=>{f.model={serviceDetails:e},console.log(\"PB HC result =>\",f),navigate(f)},f=>{showAlert(f)})}"
            }],
            "onScheduledBandwidthFlex": [{
                "trigger": "details",
                "script": "/*Script Name: [On Scheduled Bandwidth Flex]*/ evaluate=function(){let a=getValue(\"map\"),b;!a||(b=a.selected),b||(b=getValue(\"details\"));let c=getLodash(),d=getDataSource(\"landingPageData\");console.log(\"in schdule lunar module bw=>\",a,getValue(\"details\"),model,getDataSource(\"map\"),getDataSource(\"landingPageData\"),getDataSource(\"dashboard.landingPageData\"));let e={serviceId:b.id,product:b,type:\"Scheduled\",LPDS:d};callService(\"11122018-0251-5712-997f-d69cee2dd344\",e,f=>{f.model={serviceDetails:e},console.log(\"schedule lunar result =>\",f),navigate(f)},f=>{showAlert(f)})}"
            }],
            "onDynamicFlex": [{
                "trigger": "details",
                "script": "/*Script Name: [On Demand Flex Lunar]*/ evaluate=function(){let a=getValue(\"map\"),b;!a||(b=a.selected),b||(b=getValue(\"details\"));let c=getLodash(),d=getDataSource(\"landingPageData\");console.log(\"cdo:in ondemand lunar module bw=>\",a,getValue(\"details\"),model,getDataSource(\"map\"),getDataSource(\"landingPageData\"),getDataSource(\"dashboard.landingPageData\"));let e={serviceId:b.id,product:b,type:\"ondemand\",LPDS:d};callService(\"12052019-0030-2589-f907-518b52e0030f\",e,f=>{f.model={serviceDetails:e},console.log(\"ondemand lunar result =>\",f),navigate(f)},f=>{showAlert(f)})}"
                
            }],
            "getserviceDeatilforService": [{
                "trigger": "details",
                "script": "/*Script Name: [On Get Service Detail for service]*/ evaluate=function(){let b=getValue(\"details\");let c=getLodash(),d=getDataSource(\"landingPageData\");console.log(\"service Details from serviceID test1\",b);let e={serviceId:b.id,product:b,type:\"servicesdetails\",LPDS:d};callService(\"26022019-1126-1009-1248-16874fb7abd4\",e,f=>{f.model={serviceDetails:e},console.log(\"SC from get services detail =>\",f),navigate(f)},f=>{showAlert(f)})}"
                }],
             "onReloadedServiceList": [{
                "trigger": "details",
                "script": "/*Script Name: [On Reload Service List]*/ console.log(\"cdo: reload starts\"),console.log(\"model CDO reload list\",model);let home=model.content.home;console.log(\"home\",home);let customerid=\"\";customerid=home.dashboard&&home.dashboard.map&&home.dashboard.map.customerid?home.dashboard.map.customerid:\"51271\",console.log(\"Customer ID = > \",customerid),getData(\"29112018-0454-0769-3c63-f6271c2553df\",{pageName:\"portalLandingPage\",pagetype:\"model\",properties:{customerId:customerid}},a=>{console.log(\"result received =>\",a);var b=Object.assign({},a);a.location.forEach(c=>{let d=[];b.service.forEach(f=>{if(f.reference){let g=f.reference.filter(h=>{return h.localId==c.id});g&&0<g.length&&d.push(f)}});let e=[];b.product.forEach(f=>{if(f.customerid=customerid,f&&f.reference){let g=f.reference.filter(i=>{return\"service\"==i.type}),h=[];if(g.forEach(i=>{let j=b.service.find(l=>{return l.id==i.localId}),k=b.service.find(l=>{return l.id==i.localId&&\"TBA\"!=l.properties.serviceId});!k||(f.properties.service=_.cloneDeep(k)),!j||(j.properties.productId=f.id,h.push(j))}),f.properties.services=_.cloneDeep(h),h.forEach(i=>{if(i&&i.reference&&0<i.reference.length){let j=i.reference.find(k=>{return k.localId==c.id});!j||(f.properties.location=_.cloneDeep(c),e.push(f)),!j||f.properties.service||(f.properties.service=_.cloneDeep(i))}}),f.properties.service){let i=_.find(f.properties.service.reference,p=>{return\"resource\"==p.type&&\"network\"==p.subtype});if(i){let p=_.find(b.resource,q=>{return q.id==i.localId});p&&(f.properties.resource=p)}let j=[];_.forEach(f.properties.service.reference,p=>{let q=_.find(b.resource,r=>{return r.id==p.localId});q&&j.push(_.cloneDeep(q))}),f.properties.resources=j;let k=_.find(f.properties.status,p=>{return\"In-progress\"==p.type});k&&(f.properties.service.properties.serviceId=\"TBA\"),f.properties.services.forEach(p=>{f.properties.Flexing=\"\";let r=_.find(f.properties.status,t=>{if(\"flex\"==t.type)return t});if(r){let t={type:\"Flexing\",subtype:r.subtype,pcr:r.pcr},u=_.find(f.properties.status,v=>{if(\"Flexing\"==v.type)return v});u||f.properties.status.push(t)}let s=_.find(f.properties.status,t=>{if(\"Flexing\"==t.type)return t});p.properties.bandwidth&&\"schedule_flex\"==p.title&&s&&(f.properties.Flexing=p.properties.bandwidth),p.properties.bandwidth&&\"dynamic_flex\"==p.title&&s&&(f.properties.Flexing=p.properties.bandwidth)});let l=[],m=_.find(f.properties.status,p=>{if(\"Flexing\"==p.type)return p}),n=_.find(f.properties.status,p=>{if(\"In-progress\"==p.type)return p}),o=_.find(f.properties.status,p=>{if(\"Active\"==p.type)return p});m&&l.push(m),o&&l.push(o),n&&l.push(n),f.properties.status=l}}}),c.properties={services:_.cloneDeep(d),products:_.cloneDeep(e)}}),call(\"content.home.services.details\",\"onReloadedServiceList\",null,null,a),console.log(\"result from service reload: cdo  => \",a),success&&success(a),b=void 0},a=>{console.log(a)})"
                }]    
        },
        "properties": {
            "details": {
                "widget" : "table",
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
                        "key": "properties.Flexing",
                        "prop": "properties.Flexing",
                        "title": "Flex",
                        "displayColumn": true,
                        "headerclass": "lg-cell-header",
                        "cellClass": "lg-cell-row",
                        "type": "text-flex",
                        "istemplate": false,
        			    "behaviour": {
        					"show": true,
        					"readonly": true,
        					"mandatory": false
        				},
        				"preserveOnDestroy": true
        				
        				
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
                },
                "events": [
                    "onInit", "onLoad", "onReloadedServiceList", "getTemplateForBandwidth", "getTemplateForServiceStatus", "getTemplateForFlex", "getControls", "onPermanentBandwidthChange", "onScheduledBandwidthFlex", "onDynamicFlex", "getserviceDeatilforService"
                ],
                "controls": [{
                    "id": "c1",
                    "title": "Permanent Change",
                    "event": {
                        "type": "onPermanentBandwidthChange"
                    }
                }, {
                    "id": "c2",
                    "title": "Schedule Flex",
                    "event": {
                        "type": "onScheduledBandwidthFlex"
                    }
                }, {
                    "id": "c3",
                    "title": "Dynamic Flex",
                    "event": {
                        "type": "onDynamicFlex"
                    }
                }, {
                    "id": "c4",
                    "title": "Raise an incident",
                    "event": {
                        "type": "onDoNothing"
                    }
                }, {
                    "id": "c5",
                    "title": "Add new service at this location",
                    "event": {
                        "type": "onDoNothing"
                    }
                }, {
                    "id": "c6",
                    "title": "View Service",
                    "event": {
                        "type": "getserviceDeatilforService"
                    }
                }]
            },
            "landingPageData": {
                "widget": "blank"
            }
        }
    },
    "bandwidthevents": { 
        "widget": "blank"
    },
    "requests": {
       "properties": {
        "details": {
            "widget" : "request-widget"
        }

       }
    },
    "activitylog": {
        "properties": {
        "details": {
            "widget" : "activity-log"
        }

       }
    },
    "reporting": {
        "widget": "blank"
    },
    "usage": {
        "widget": "blank"
    },
    "landingPage": {
        "widget": "blank"
    },
    "servicedetailstab": {
        "behaviour": {
          "show": false  
        },
        "properties": {
                "servicesdetails": {
                    "widget": "service-detail",
                    "events": ["onInit"],
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
                        "width": "20rem"
            
                      },
                      {
                        "id" : "OD",
                        "title": "OTHER DETAILS",
                        "width": "20rem"
                      }
                    ]
                }    
            }
    },
    "tableau": {
        "properties": {
        "details": {
            "widget" : "tableau-poc"
        }

       }
    }
}