{
    "widget": "menu",
    "fieldsets": [{
        "fields": ["layer1", "layer2","layer3"]
    }],
    "properties": {
    	"layer1": {
    	    "widget": "submenu",
    	    "settings": {
    	        "sticky": true,
                "color": "optusblack",
                "type": "menu",
                "layer": "layer1",
                "menucolor": "menucolor",
                "menuhover": "menuhover"
    	    },
            "fieldsets": [{
                "fields": ["mybusinessportal",  "optus", "email",  "profile", "user", "logout"],
                "itemwidths": ["100em",  "51em", "4em", "3em", "8em", "8em"]
            }],
            "properties": {
                "mybusinessportal": {
                    "widget": "menuitem",
                    "title": "MY BUSINESS PORTAL",
                    "itemtype": "text",
                    "linkurl": "https://www.optus.com.au/",
                    "itemwidth": "12em"
                },
                "optus": {
                    "widget": "menuitem",
                    "title": "OPTUS",
                    "itemtype": "logo",
                    "itemwidth": "10em"
                },
                "email": {
                    "widget": "menuitem",
                    "title": "icon-email",
                    "itemtype": "icon",
                    "itemwidth": "5em"
                },
                "profile": {
                    "widget": "menuitem",
                    "title": "icon-log-in",
                    "itemtype": "icon",
                    "itemwidth": "5em"
                },
                "user": {
                    "widget": "menuitem",
                    "title": "Test User",
                    "itemtype": "text",
                    "itemwidth": "10em"
                },
                "logout": {
                    "widget": "menuitem",
                    "title": "LOGOUT",
                    "itemtype": "text",
                    "itemwidth": "10em"
                }
            }
    	},
    	"layer2": {
            "widget": "submenu",
            "settings": {
    	        "sticky": true,
                "color": "optuswhite",
                "type": "menu",
                "layer": "layer2",
                "menucolor": "optusblack",
                "menuhover": "menuhover"
    	    },
    	    "fieldsets": [{
                "fields": ["home", "manage", "triangle", "mymanage", "mobileanddevices", "fixeddata", "sdx", "voiceandcollaboration", "ict", "managedservices", "support"],
                "itemwidths": ["0rem", "0rem", "2rem", "10rem", "12rem", "9rem", "14rem", "15rem", "4rem", "90rem", "7rem"]
            }],
            "rules": {
                "onClick": [{
                    "trigger": "ict",
                    "script": "/*Script Name: [ICT OnLoad]*/ evaluate=function(){callService('14112018-2139-4952-ba5c-9d653747ae82',{},a=>{navigate(a)},a=>{showAlert(a)})}"
                },{
                    "trigger": "sdx",
                    "script": "/*Script Name: [SDX OnLoad]*/ evaluate=function(){callService('14112018-2200-5239-d3b7-cae0d64c66d0',{},a=>{navigate(a)},a=>{showAlert(a)})}"
                }]
            },
            "properties": {
                "home": {
                    "widget": "menuitem",
                    "title": "icon-home",
                    "itemtype": "icon",
                    "itemwidth": "1em"
                },
                "manage": {
                    "widget": "menuitem",
                    "title": "Manage",
                    "itemtype": "text"
                },
				"triangle": {
                    "widget": "menuitem",
                    "title": "icon-tri",
                    "itemtype": "triangle",
                    "itemwidth": "1em"
                },
                "mymanage": {
                    "widget": "menuitem",
                    "title": "My manage",
                    "itemtype": "text"
                },
                "mobileanddevices": {
                    "widget": "menuitem",
                    "title": "Mobile & Devices",
                    "itemtype": "text"
                },
                "fixeddata": {
                    "widget": "menuitem",
                    "title": "Fixed Data",
                    "itemtype": "text"
                },
                "sdx": {
                    "widget": "menuitem",
                    "title": "Liquid Infrastructure",
                    "itemtype": "text",
                    "events": [
                        "onClick"
                    ]
                },
                "voiceandcollaboration": {
                    "widget": "menuitem",
                    "title": "Voice & Collaboration",
                    "itemtype": "text"
                },
                "ict": {
                    "widget": "menuitem",
                    "title": "ICT",
                    "itemtype": "text",
                    "events": [
                        "onClick"
                    ] 
                },
                "managedservices": {
                    "widget": "menuitem",
                    "title": "Managed Services",
                    "itemtype": "text"
                },
                "support": {
                    "widget": "menuitem",
                    "title": "Support",
                    "itemtype": "text"
                }
            }
        },
        "layer3": {
            "widget": "submenu",
            "settings": {
    	        "sticky": true,
                "color": "optuswhite",
                "type": "breadcrumbs",
                "layer": "layer3"
    	    },
    	    "fieldsets": [{
                "fields": ["nav1", "nav2"],
                "itemwidths": ["13.2rem", "226.5rem"]
            }],
            "properties": {
                "nav1": {
                    "widget": "menuitem",
                    "title": "My Business Portal",
                    "itemtype": "text"
                },
                "nav2": {
                    "widget": "menuitem",
                    "title": "Manage",
                    "itemtype": "text"
                }
                
            }
    	}
    }
    
}