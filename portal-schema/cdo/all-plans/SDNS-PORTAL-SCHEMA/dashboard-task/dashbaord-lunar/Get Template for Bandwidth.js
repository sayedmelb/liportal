// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function (){
    let template;
    let product = getValue("details");
    //console.log("product => DETAILS", product);
    let bandwidth = product.properties.service.properties.bandwidth;
    let flexing;
    // product.properties.services.forEach(service => {
    //     if(service.properties) {
    //         if(!!service.properties.bandwidth) {
    //             bandwidth = service.properties.bandwidth;
    //         }
    //         if(service.properties.flexing && !!service.properties.flexing.bandwidth) { //TODO
    //             flexing = service.properties.flexing.bandwidth;
    //         }
    //     }
    // });
    //template = `` + bandwidth;
    //if (flexing) 
    //template = template  + `<br>` + flexing +  ` Flex Capacity`; 
    template = "" + bandwidth;
    success(template);
};
