
// // Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

// evaluate = function () {
//     console.log("model in load PB => ",model);
//     if(model.content && model.content.permanentbandwidthchange){
//     console.log("model in load PB => ",model.content.permanentbandwidthchange.configure.data);
//     if(model.content.permanentbandwidthchange.configure.data==='review')
//     return;
//     }
//     let product=model.serviceDetails.product; // selected product
//     console.log("product selected =>", product);
//     let productIds = [];
//     productIds.push(product.id);

   
//     let _ = getLodash();
//     //If P2P: Iterate over model to find B-End's Product ID.
//     if (product.properties.topology != 'Mesh' && product.properties.resource) {
//         let localResourceId = product.properties.resource.id;
//         let otherEndProduct = _.find(model.serviceDetails.LPDS[0].product, (prod) => {
//             if(prod.properties.resource && prod.id!=product.id) return prod.properties.resource.id == localResourceId;
//         });
//         if(otherEndProduct) productIds.push(otherEndProduct.id);
//     }
//     let otherEnds= []; // Other ends product
//     let tempOtherEnd;
//     let lpds = model.serviceDetails.LPDS;
//     let localidofSelected ='';
//     if(product.properties.resource) {
     
//      localidofSelected= product.properties.resource.id;
    
//      model.serviceDetails.LPDS[0].product.forEach ((prod) =>{
//          if(prod.properties.resource){
//             if(localidofSelected === prod.properties.resource.id  && prod.id != product.id) {
//                 otherEnds.push(prod);
//               // tempOtherEnd =  _.clone(prod, true);
//                 }
                
//             }
//         });
//     }
    
//     // Add ids of other products on the same network on Mesh.
//     if(product.properties.topology == 'Mesh') {
//         _.forEach(otherEnds, prod=> {
//             productIds.push(prod.id);
//         });
//     }
   
    


//     getData('',
//     {
//         "pageName": "permBWPageData",
//         "pagetype": "model",
//         "properties": {
//             "customerId": "35914",
//             "productId": productIds,
//             "productType": product.properties.category,
//             "filterParent": "Access",
//             "filterChild": "sd_fibre",
//             "version": "v1.6",
//             "outObj": "type=grade_of_service,type=flex_pack,type=qos,type=port_selections,type=sd_fibre_sla"
//         }
//     }, (result) => {
//         console.log("Result PBW =>", result);
//         // tempOtherEnd =  _.clone(result.model[0],true);
//         result.selectedProduct = product;
//         result.otherEnds = otherEnds;
//         // result.model.push(tempOtherEnd);// This is done for the time being to get B-point in model
//         console.log("result", result ); 
        
//         resetDataSource ("configure");
//         updateDataSource ("configure",
//         [result
//         ]);
//     }, (error) => {
//         console.log("Failed to fetch P BW", error);
//     });
// };


// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function () {
    console.log("model in load PB => ",model);
    if(model.content && model.content.permanentbandwidthchange){
    console.log("model in load PB => ",model.content.permanentbandwidthchange.configure.data);
    if(model.content.permanentbandwidthchange.configure.data==='review')
    return;
    }
    let product=model.serviceDetails.product; // selected product
    console.log("product selected =>", product);
    let productIds = [];
    productIds.push(product.id);
    
    let rid = product.id;

   
    let _ = getLodash();
    //If P2P: Iterate over model to find B-End's Product ID.
    if (product.properties.topology != 'Mesh' && product.properties.resource) {
        let localResourceId = product.properties.resource.id;
        let otherEndProduct = _.find(model.serviceDetails.LPDS[0].product, (prod) => {
            if(prod.properties.resource && prod.id!=product.id) return prod.properties.resource.id == localResourceId;
        });
        if(otherEndProduct) productIds.push(otherEndProduct.id);
    }
    let otherEnds= []; // Other ends product
    let tempOtherEnd;
    let lpds = model.serviceDetails.LPDS;
    let localidofSelected ='';
    if(product.properties.resource) {
     
     localidofSelected= product.properties.resource.id;
    
     model.serviceDetails.LPDS[0].product.forEach ((prod) =>{
         if(prod.properties.resource){
            if(localidofSelected === prod.properties.resource.id  && prod.id != product.id) {
                otherEnds.push(prod);
               // tempOtherEnd =  _.clone(prod, true);
                }
                
            }
        });
    }
    
    // Add ids of other products on the same network on Mesh.
    if(product.properties.topology == 'Mesh') {
        _.forEach(otherEnds, prod=> {
            productIds.push(prod.id);
        });
    }
   
    


    getData('',
    {
        "pageName": "permBWPageData",
        "pagetype": "model",
        "properties": {
            "customerId": "35914",
            "productId": productIds,
            "productType": product.properties.category,
            "filterParent": "Access",
            "filterChild": "sd_fibre",
            "version": "v1.6",
            "progressObj" : {
                "resourceId": rid,
                "resourceType": "product",
                "type": "modify",
                "subtype": "permanent",
                "status": "In-progress",
                "substatus": "",
                "where": "" 
            },
            "outObj": "type=grade_of_service,type=flex_pack,type=qos,type=port_selections,type=sd_fibre_sla"
        }
    }, (result) => {
        console.log("Result PBW =>", result);
        // tempOtherEnd =  _.clone(result.model[0],true);
        result.selectedProduct = product;
        result.otherEnds = otherEnds;
        // result.model.push(tempOtherEnd);// This is done for the time being to get B-point in model
        console.log("result", result ); 
        
        resetDataSource ("configure");
        updateDataSource ("configure",
        [result
        ]);
    }, (error) => {
        console.log("Failed to fetch P BW", error);
    });
};



