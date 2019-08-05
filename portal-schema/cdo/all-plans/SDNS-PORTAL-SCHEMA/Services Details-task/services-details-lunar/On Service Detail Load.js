// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function () {
    console.log("cdo:Loading service details MODEL ", model);
    console.log("Loading service details schema now now", getValue('servicesdetails'));
    console.log("Loading LPDS", getValue('landingPageData'));
    console.log("Loading portalLandingPage", getDataSource('portalLandingPage'));
    console.log("Loading home", getDataSource('home'));
    // resetDataSource("servicesdetails");
    let _ = getLodash();
    let otherEnds = [];
    let localidofSelected;
    let LPDS ;
    if(model.serviceDetails.product.selectedproduct && model.serviceDetails.product.selectedproduct.properties && model.serviceDetails.product.selectedproduct.properties.resource){
    localidofSelected = model.serviceDetails.product.selectedproduct.properties.resource.id;
    model.serviceDetails.product.products.forEach ((prod) =>{
         if(prod.properties.resource){
            if(localidofSelected === prod.properties.resource.id && prod.id != model.serviceDetails.product.selectedproduct.id) {
                otherEnds.push(prod);
                }
            }
        });
    }
    getData('', 
    {
        "pageName": "permBWPageData",
        "pagetype": "model",
        "properties": {
            "customerId": "35914",
            "productId": model.serviceDetails.product.selectedproduct.id,
            "productType": "ewan",
            "filterParent": "Access",
            "filterChild": "sd_fibre",
            "version": "v1.6",
            "progressObj": {
        "resourceId":  model.serviceDetails.product.selectedproduct.id
        ,
        "resourceType": "product",
        "type": "modify",
        "subtype": "permanent",
        "status": "in-progress",
        "substatus": "",
        "where": ""
      },
            "outObj": "type=grade_of_service,type=flex_pack,type=qos,type=port_selections,type=sd_fibre_sla"
        }
    }, (result)=> {
        console.log("result for SD page =>", result);
        if(result.model) {
            let newResult = [];
            _.forEach(result.model, m => {
                let newM = _.mapKeys(m, (value, key)=>{
                    switch(key.toLowerCase()) {
                        case 'flex_capacity': return 'flex_pack';
                        case 'gradeofservice': return 'grade_of_service';
                        case 'portcapacity': return 'port_selections';
                        case 'servicelevel': return 'sd_fibre_sla';
                        default: return key;
                    }
                });
                newResult.push(newM);
            });
            console.log("Model after converting keys =>", newResult);
            result.model = newResult;
            let newModel=[];
            _.forEach(result.model, mode=> {
                if(!mode.portCapacity) {
                    if(model.serviceDetails.product.selectedproduct && model.serviceDetails.product.selectedproduct.properties.service && model.serviceDetails.product.selectedproduct.properties.service.properties.port)
                      mode.portCapacity = model.serviceDetails.product.selectedproduct.properties.service.properties.port;
                    else mode.portCapacity = "1 Gbps";
                 }
                 if(!mode.contractedBw){
                     if(model.serviceDetails.product.selectedproduct && model.serviceDetails.product.selectedproduct.properties.service && model.serviceDetails.product.selectedproduct.properties.service.properties.bandwidth)
                      mode.contractedBw = model.serviceDetails.product.selectedproduct.properties.service.properties.bandwidth;
                    
                 }
                let newObj = {};
                _.forIn(mode, (value, key)=> {
                    newObj['_'+key] = value;
                });
                newModel.push(newObj);
            });
            result.model = _.merge(newModel, result.model);
        }
        result.selectedProduct = model.serviceDetails.product.selectedproduct;
        result.otherEnds = otherEnds;
        result.LPDS = model.serviceDetails.LPDS; /* testing by syed **/
        console.log("result.lpds",result);
        
        updateDataSource("servicesdetails", [result]);
    }, (error)=> {
        console.log("Failed to fetch P BW", error);
    });
};

// evaluate = function () {
//     console.log("cdo:in SERVICE detail load");
//     console.log("Loading service details MODEL", model);
//     console.log("Loading service details schema now now", getValue('servicesdetails'));
//     console.log("Loading LPDS", getValue('landingPageData'));
//     console.log("Loading portalLandingPage", getDataSource('portalLandingPage'));
//     console.log("Loading home", getDataSource('home'));
//     // resetDataSource("servicesdetails");
//     let _ = getLodash();
//     let otherEnds = [];
//     let localidofSelected;
//     let LPDS ;
//     if(model.serviceDetails.product.selectedproduct && model.serviceDetails.product.selectedproduct.properties && model.serviceDetails.product.selectedproduct.properties.resource){
//     localidofSelected = model.serviceDetails.product.selectedproduct.properties.resource.id;
//     model.serviceDetails.product.products.forEach ((prod) =>{
//          if(prod.properties.resource){
//             if(localidofSelected === prod.properties.resource.id && prod.id != model.serviceDetails.product.selectedproduct.id) {
//                 otherEnds.push(prod);
//                 }
//             }
//         });
//     }
//     getData('', 
//     {
//         "pageName": "permBWPageData",
//         "pagetype": "model",
//         "properties": {
//             "customerId": "35914",
//             "productId": model.serviceDetails.product.selectedproduct.id,
//             "productType": product.properties.category,
//             "filterParent": "Access",
//             "filterChild": "sd_fibre",
//             "version": "v1.6",
//             "progressObj" : {
//                 "resourceId": [model.serviceDetails.product.selectedproduct.id],
//                 "resourceType": "product",
//                 "type": "modify",
//                 "subtype": "permanent",
//                 "status": "in-progress",
//                 "substatus": "",
//                 "where": "" 
//             },
//             "outObj": "type=grade_of_service,type=flex_pack,type=qos,type=port_selections,type=sd_fibre_sla"
//         }
//     }, (result)=> {
//         console.log("result for SD page =>", result);
//         if(result.model) {
//             let newResult = [];
//             _.forEach(result.model, m => {
//                 let newM = _.mapKeys(m, (value, key)=>{
//                     switch(key.toLowerCase()) {
//                         case 'flex_capacity': return 'flex_pack';
//                         case 'gradeofservice': return 'grade_of_service';
//                         case 'portcapacity': return 'port_selections';
//                         case 'servicelevel': return 'sd_fibre_sla';
//                         default: return key;
//                     }
//                 });
//                 newResult.push(newM);
//             });
//             console.log("Model after converting keys =>", newResult);
//             result.model = newResult;
//             let newModel=[];
//             _.forEach(result.model, mode=> {
//                 if(!mode.portCapacity) {
//                     if(model.serviceDetails.product.selectedproduct && model.serviceDetails.product.selectedproduct.properties.service && model.serviceDetails.product.selectedproduct.properties.service.properties.port)
//                       mode.portCapacity = model.serviceDetails.product.selectedproduct.properties.service.properties.port;
//                     else mode.portCapacity = "1 Gbps";
//                  }
//                  if(!mode.contractedBw){
//                      if(model.serviceDetails.product.selectedproduct && model.serviceDetails.product.selectedproduct.properties.service && model.serviceDetails.product.selectedproduct.properties.service.properties.bandwidth)
//                       mode.contractedBw = model.serviceDetails.product.selectedproduct.properties.service.properties.bandwidth;
                    
//                  }
//                 let newObj = {};
//                 _.forIn(mode, (value, key)=> {
//                     newObj['_'+key] = value;
//                 });
//                 newModel.push(newObj);
//             });
//             result.model = _.merge(newModel, result.model);
//         }
//         result.selectedProduct = model.serviceDetails.product.selectedproduct;
//         result.otherEnds = otherEnds;
//         result.LPDS = model.serviceDetails.LPDS; /* testing by syed **/
        
//         updateDataSource("servicesdetails", [result]);
//     }, (error)=> {
//         console.log("Failed to fetch P BW", error);
//     });
// };