{
	"type": "object",
	"widget": "page",
    "properties": {
    	"content": {
    	    "rules": {
    	        "onInit": [{
    	            "trigger": [
    	                "home"
                    ],
                    "script": "/*Script Name: [On Tab Load]*/ evaluate=function(){let a=getValue(\"home\"),b=\"\";b=a.dashboard&&a.dashboard.map&&a.dashboard.map.customerid?a.dashboard.map.customerid:\"51271\",console.log(\"Customer ID = > \",b),getData(\"29112018-0454-0769-3c63-f6271c2553df\",{pageName:\"portalLandingPage\",pagetype:\"model\",properties:{customerId:b}},c=>{console.log(\"result received =>\",c);var d=Object.assign({},c);c.location.forEach(e=>{let f=[];d.service.forEach(h=>{if(h.reference){let i=h.reference.filter(j=>{return j.localId==e.id});i&&0<i.length&&f.push(h)}});let g=[];d.product.forEach(h=>{if(h.customerid=b,h&&h.reference){let i=h.reference.filter(k=>{return\"service\"==k.type}),j=[];if(i.forEach(k=>{let l=d.service.find(n=>{return n.id==k.localId}),m=d.service.find(n=>{return n.id==k.localId&&\"TBA\"!=n.properties.serviceId});!m||(h.properties.service=_.cloneDeep(m)),!l||(l.properties.productId=h.id,j.push(l))}),h.properties.services=_.cloneDeep(j),j.forEach(k=>{if(k&&k.reference&&0<k.reference.length){let l=k.reference.find(m=>{return m.localId==e.id});!l||(h.properties.location=_.cloneDeep(e),g.push(h)),!l||h.properties.service||(h.properties.service=_.cloneDeep(k))}}),h.properties.service){let k=_.find(h.properties.service.reference,r=>{return\"resource\"==r.type&&\"network\"==r.subtype});if(k){let r=_.find(d.resource,s=>{return s.id==k.localId});r&&(h.properties.resource=r)}let l=[];_.forEach(h.properties.service.reference,r=>{let s=_.find(d.resource,t=>{return t.id==r.localId});s&&l.push(_.cloneDeep(s))}),h.properties.resources=l;let m=_.find(h.properties.status,r=>{return\"In-progress\"==r.type});m&&(h.properties.service.properties.serviceId=\"TBA\"),h.properties.services.forEach(r=>{h.properties.Flexing=\"\";let t=_.find(h.properties.status,v=>{if(\"flex\"==v.type)return v});if(t){let v={type:\"Flexing\",subtype:t.subtype,pcr:t.pcr},w=_.find(h.properties.status,x=>{if(\"Flexing\"==x.type)return x});w||h.properties.status.push(v)}let u=_.find(h.properties.status,v=>{if(\"Flexing\"==v.type)return v});r.properties.bandwidth&&\"schedule_flex\"==r.title&&u&&(h.properties.Flexing=r.properties.bandwidth),r.properties.bandwidth&&\"dynamic_flex\"==r.title&&u&&(h.properties.Flexing=r.properties.bandwidth)});let n=[],o=_.find(h.properties.status,r=>{if(\"Flexing\"==r.type)return r}),p=_.find(h.properties.status,r=>{if(\"In-progress\"==r.type)return r}),q=_.find(h.properties.status,r=>{if(\"Active\"==r.type)return r});o&&n.push(o),q&&n.push(q),p&&n.push(p),h.properties.status=n}}}),e.properties={services:_.cloneDeep(f),products:_.cloneDeep(g)}}),call(\"content.home.dashboard.map\",\"onInit\",null,null,c),call(\"content.home.services.details\",\"onInit\",null,null,c),call(\"content.home.services.details\",\"onReloadedServiceList\",null,null,c),console.log(\"result from service. => \",c),d=void 0},c=>{console.log(c)})}"
    	        }]
    	    },
    		"properties": {
    		    "home": {
    		        "widget": "tab",
    		        "swipeable": false,
    		        "events": ["onInit"],
            		"tabs": [{
                            "id": "dashboard",
                            "title": "Dashboard",
                            "heading": "Optus Liquid Infrastructure",
                            "width": "9rem"
                        }, {
                            "id": "services",
                            "title": "Services",
                            "heading": "Services",
                            "width": "8rem"
                        }, {
                            "id": "requests",
                            "title": "Requests",
                            "heading": "Requests",
                            "width": "8rem"
                        }, {
                            "id": "activitylog",
                            "title": "Activity Log",
                            "heading": "Activity log",
                            "width": "11rem"
                        }
                        
                    ]
    		    }
    		}
    	}
    }
}