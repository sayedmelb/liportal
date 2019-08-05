var execute = function (){
        var header = __loadLunarModule (/** Name: Header (task) **/ 'e7d65862-6ecb-4a52-a1b6-e44e843457cd', 'd93e1f88-aae0-4bae-a273-9a7a46ba3fb8', {});
        var serviceDetailsModule = __loadLunarModule(/** Name: Services Details (task) **/ 'e7d65862-6ecb-4a52-a1b6-e44e843457cd', 'c236cad1-5bd8-4359-a149-87f4d9d6f2a1', {});
        
        serviceDetailsModule.properties['header'] = header;
        
    return {
        schema: serviceDetailsModule
        // schema: __loadLunarModule ( /** Name: Services Details (task) **/ 'e7d65862-6ecb-4a52-a1b6-e44e843457cd', 'c236cad1-5bd8-4359-a149-87f4d9d6f2a1', {})
	   // schema: __loadLunarModule (/** Name: Permanent Bandwidth (task) **/ 'e7d65862-6ecb-4a52-a1b6-e44e843457cd', 'd6d6cbdf-d909-4b1c-9d6f-1431bad482b1', {})
	   //schema: {
	   //    properties: {
	   //        header: header,
	   //        content: __loadLunarModule ( /** Name: Services Details (task) **/ 'e7d65862-6ecb-4a52-a1b6-e44e843457cd', 'c236cad1-5bd8-4359-a149-87f4d9d6f2a1', {})
	           
	   //    }
	       
	   //}
	};
        
    //     var schema = __loadLunarModule (/** Name: Services Details (task) **/ 'e7d65862-6ecb-4a52-a1b6-e44e843457cd', 'c236cad1-5bd8-4359-a149-87f4d9d6f2a1');
    //     var header = __loadLunarModule (/** Name: Header (task) **/ 'e7d65862-6ecb-4a52-a1b6-e44e843457cd', 'd93e1f88-aae0-4bae-a273-9a7a46ba3fb8', {});
    //     delete header.id;
	   // delete header.module;
	   // schema.properties.header= header;
    //     // schema.properties.content.properties.home.properties = dashboard;
	   //// return {schema: schema};
	   // return schema;
       
};