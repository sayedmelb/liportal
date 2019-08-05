var execute = function (planId){
    try{
        var schema = __loadLunarModule (/** Name: Landing Page (task) **/ 'e7d65862-6ecb-4a52-a1b6-e44e843457cd', '49828c83-eef3-4d36-bc16-663c23f89172', {});
        var header = __loadLunarModule (/** Name: Header (task) **/ 'e7d65862-6ecb-4a52-a1b6-e44e843457cd', 'd93e1f88-aae0-4bae-a273-9a7a46ba3fb8', {});
        var dashboard = __loadLunarModule ( /** Name: Dashboard (task) **/ 'e7d65862-6ecb-4a52-a1b6-e44e843457cd', '9acda9b6-c8fa-4800-871f-fdfb54cd3450', {});
        delete header.id;
	    delete header.module;
	    delete dashboard.id;
	    delete dashboard.module;
	    schema.properties.header= header;
        schema.properties.content.properties.home.properties = dashboard;
	    return schema;
    } catch (e){
        return {
            hasException: true,
            message: ""+e
        };
    }
};