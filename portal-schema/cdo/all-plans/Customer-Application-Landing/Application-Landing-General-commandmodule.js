var execute = function (planId){
    try{
        if (__model && __model.custId === "XYZ"){
            return __callCommandModule (/** Name: Portal Landing Page Identification (Command) **/ '25072018-0559-1460-8fbf-427896beac00');
        } else if (__model && __model.custId === "PORTAL"){
            return __callCommandModule (/** Name: Landing Page (Command) **/ '20112018-0429-5660-06ad-930341834ab7');
        } else if (__model && __model.custId === "PORTALHEADER"){
            return __callCommandModule (/** Name: Landing Page for Header (Command) **/ '22112018-0047-0272-6709-310c678d2a6d');
        } else {
            var schema = __loadLunarModule (planId, /** Name: Default Landing Page (task) **/ 'f0a526e9-0e61-4524-b6ad-fa47b0a9c112', {});
            var header = __loadLunarModule (/** Name: Header (Common) (task) **/ '5c9d7651-4121-4cb3-8351-69ceebeb6d2b', 'fe68a7e8-11b4-42d4-9726-589c611ef21c', {});
            delete header.id;
    	    delete header.module;
    	    var dashboard = __loadLunarModule (/** Name: Dashboard (task) **/ '5c9d7651-4121-4cb3-8351-69ceebeb6d2b', '828831bd-dac0-40f4-9b2c-e82ce9759fa5', {});
    	    delete dashboard.id;
    	    delete dashboard.module;
            schema.properties.header = header;
    	    schema.properties.content.properties.home.properties = dashboard;
    	    return schema;
        }
    } catch (e){
        return {
            hasException: true,
            message: ""+e
        };
    }
};