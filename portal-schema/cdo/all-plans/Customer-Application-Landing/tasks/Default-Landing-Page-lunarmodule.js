{
	"type": "object",
	"widget": "page",
    "properties": {
    	"menu": {
    		"type": "object",
    		"widget": "fieldset",
    		"rules": {
                "onClick": [{
                    "trigger": [
                        "profile"
                    ],
                    "script": "evaluate=function(){callProcess('116f5612-d959-44a5-9916-f5263f5e19d8','extract party details',null,function(t){navigate(t)},function(t){showAlert(t)})};"
                }]
    		},
    		"properties": {
    			"profile": {
    				"widget": "menuItem",
    				"title": "My Profile",
    				"icon": "person",
    				"color": "md-teal",
    				"events": [
    					"onClick"
    				]
    			}
    		},
    		"fieldsets": [{
    		    "title": "Settings",
    			"fields": ["profile"]
    		}]
    	},
    	"content": {
    		"properties": {
    		    "home": {
    		        "widget": "tab",
    		        "swipeable": false,
            		"tabs": [{
                            "id": "dashboard",
                            "title": "Dashboard",
                            "heading": "Optus SDx"
                        }, {
                            "id": "services",
                            "title": "Services",
                            "heading": "Services"
                        }, {
                            "id": "bandwidthevents",
                            "title": "Bandwidth events",
                            "heading": "Bandwidth events"
                        }, {
                            "id": "requests",
                            "title": "Requests",
                            "heading": "Requests"
                        }, {
                            "id": "activitylog",
                            "title": "Activity log",
                            "heading": "Activity log"
                        }, {
                            "id": "reporting",
                            "title": "Reporting",
                            "heading": "Reporting"
                        }, {
                            "id": "usage",
                            "title": "Usage",
                            "heading": "Usage"
                        }
                    ]
    		    }
    		}
    	}
    }
}