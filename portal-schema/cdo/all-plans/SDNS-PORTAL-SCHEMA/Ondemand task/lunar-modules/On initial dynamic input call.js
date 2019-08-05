// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

// evaluate = function (){
//     console.log("on Init Load service lunar module");

// };


// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function () {
    //let home = getValue("home");
    //console.log("home customer ID", getValue('configure'));
    //let customerid="";
    //if(home.dashboard && home.dashboard.map && home.dashboard.map.customerid) customerid = home.dashboard.map.customerid;
    //else customerid = "4469";
    //else customerid = "51271"; //"518841";
    
    //console.log("Customer ID in Dynamic input = > ", customerid);
    
    //resetDataSource("scheduleflex");
    console.log("cdo:model in DYNAMIC BW => ",model);
    if(model.content && model.content.scheduleflex){
    console.log("cdo:model in load DB => ",model.content.scheduleflex.configure.data);
    if(model.content.scheduleflex.configure.data==='review')
    return;
    }
    let product=model.serviceDetails.product; // selected product
    
    let customerID = product.customerid;
    console.log("product selected and customer ID=>", product, customerID);
    let productIds = [];
    productIds.push(product.id);

   
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
    //if(product.properties.topology == 'Mesh') {
      //  _.forEach(otherEnds, prod=> {
        //    productIds.push(prod.id);
        //});
    //}
   
    console.log("PROCDUCTS IDS DYN", productIds);
    //hardcode
    //productIds = ['da2c14c5-fe43-4532-bd78-480885fa183d']; yes
     //productIds = ['7fb4606f-efb2-45ee-b8b4-1bd483159478']; // no
     //productIds = ['c4e9dca9-28a2-46f0-a3de-26bc7e550f4f']; // its serviceId

    getData('',
    {
        "pageName": "dynamicBWPageData",
        "pagetype": "model",
        "properties": {
            "customerId": customerID,
            "productId": productIds,
            "productType": product.properties.category,
            "filterParent": "Access",
            "filterChild": "sd_fibre",
            "version": "v1.6",
            "progressObj" : {
                "resourceId": productIds,
                "resourceType": "product",
                "type": "modify",
                "subtype": "permanent",
                "status": "In-progress",
                "substatus": "",
                "where": "" 
            },
            "outObj": "type=flex_increase_profile,type=flex_decrease_profile,type=flex_pack,type=port_selections"
        }
    }, (result) => {
        console.log("Result DYN =>", result);
        // tempOtherEnd =  _.clone(result.model[0],true);
        result.selectedProduct = product;
        result.otherEnds = otherEnds;
        // result.model.push(tempOtherEnd);// This is done for the time being to get B-point in model
        console.log("result", result ); 
        resetDataSource("configure");
        //resetDataSource ("configure");
        //updateDataSource ("scheduleflex",
        updateDataSource ("configure",
        [result
        ]);
    }, (error) => {
        console.log("Failed to fetch DF BW", error);
    });
};



// evaluate = function () {
//     //resetDataSource("scheduleflex");
//     console.log("model in schedule SB => ",model);
//     if(model.content && model.content.scheduleflex){
//     console.log("model in load SB => ",model.content.scheduleflex.configure.data);
//     if(model.content.scheduleflex.configure.data==='review')
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
//         console.log("Result SBW =>", result);
//         // tempOtherEnd =  _.clone(result.model[0],true);
//         result.selectedProduct = product;
//         result.otherEnds = otherEnds;
//         // result.model.push(tempOtherEnd);// This is done for the time being to get B-point in model
//         console.log("result", result ); 
//         resetDataSource("configure");
//         //resetDataSource ("configure");
//         //updateDataSource ("scheduleflex",
//         updateDataSource ("configure",
//         [result
//         ]);
//     }, (error) => {
//         console.log("Failed to fetch S BW", error);
//     });
// };

//old model below beore 17 apr 2019
// evaluate=function(){
//     resetDataSource("scheduleflex");
//     console.log("cdo scheduleflex");
//     callCommand(/** Name: Get Customer Service Flexing Details (Command) **/ '11122018-0313-1062-f256-a599e7788082',
//         model.serviceDetails,
//         (result)=>{
//             result.model.service.forEach ((service) => {
//                 if (service.reference) {
//                     service.reference.forEach ((ref) => {
//                         if (ref.type == 'product') {
//                             service.properties.product = result.model.product.filter ((product) => product.id == ref.localId) [0];
//                             service.properties.product.reference.forEach ((ref) => {
//                                 if (ref.type == 'offer') {
//                                     service.properties.offer = result.model.offer.filter ((offer) => offer.id == ref.localId) [0];
//                                     service.properties.offer.properties.pricetemplate = service.properties.offer.properties.currency.symbol + service.properties.offer.properties.price + "/" + service.properties.offer.properties.billingCycle;
//                                 }
//                             });
//                         }
//                         if (ref.type == 'resource') {
//                             service.properties.resource = result.model.resource.filter ((resource) => resource.id == ref.localId) [0];
//                         }
//                         if (ref.type == 'address') {
//                             service.properties.address = result.model.address.filter ((address) => address.id == ref.localId) [0];
//                         }
//                     });
//                 }
//             });
//             updateDataSource("scheduleflex", result.model.service);
//         },(error)=>{
//             console.log(error);
//         });
// };


