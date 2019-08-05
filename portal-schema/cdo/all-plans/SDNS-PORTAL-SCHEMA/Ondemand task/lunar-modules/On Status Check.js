
evaluate = function () {
    //resetDataSource("scheduleflex");
    console.log("model in schedule DYN => ",model);
    if(model.content && model.content.ondemandflex){
    console.log("model in load DYN => ",model.content.ondemandflex.configure.data);
    if(model.content.ondemandflex.configure.data==='review')
    return;
    }
    let product=model.serviceDetails.product; // selected product
    console.log("product selected =>", product);
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
    if(product.properties.topology == 'Mesh') {
        _.forEach(otherEnds, prod=> {
            productIds.push(prod.id);
        });
    }
   
    console.log("PROCDUCTS IDS STATUS", productIds);


    getData('',
    {
        "pageName": "scheduleBWPageData",
        "pagetype": "model",
        "properties": {
            "customerId": "35914",
            "productId": productIds,
            "productType": product.properties.category,
            "filterParent": "Access",
            "filterChild": "sd_fibre",
            "version": "v1.6",
            "progressObj" : {
                "resourceId": productIds,
                "resourceType": "product",
                "type": "modify",
                "subtype": "",
                "status": "In-progress",
                "substatus": "",
                "where": "" 
            },
            "outObj": "type=grade_of_service,type=flex_pack,type=qos,type=port_selections,type=sd_fibre_sla"
        }
    }, (result) => {
        console.log("Result SBW STATUS=>", result);
        // tempOtherEnd =  _.clone(result.model[0],true);
       // result.selectedProduct = product;
        //result.otherEnds = otherEnds;
        // result.model.push(tempOtherEnd);// This is done for the time being to get B-point in model
        console.log("result", result ); 
       // resetDataSource("configure");
        //resetDataSource ("configure");
        //updateDataSource ("scheduleflex",
       // updateDataSource ("configure",
        //[result
       // ]);
        if (success) success(result);
    }, (error) => {
        console.log("Failed to fetch S BW", error);
    });
};





