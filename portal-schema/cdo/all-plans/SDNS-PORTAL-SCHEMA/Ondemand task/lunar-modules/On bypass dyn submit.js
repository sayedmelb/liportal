// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

// evaluate = function (){
//     console.log("confirm submitted");
    

// };

// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function (){
    console.log("cdo:submit DYN confirm By Pass TRACK Progress =>", model, getDataSource('review'));
    let _ = getLodash();
    let dataSource = getDataSource('review');
    console.log(" cdo:submit DYNdatasource By Pass TRACK Progress", dataSource);
    if(model ) {
   
       let rid = model.serviceDetails.product.id; //"0f3f1163-1f0d-441d-93e7-195f62df27b6"; //model.serviceDetails.product.id;
       
       console.log(" cdo:submit DYN RESOURCE bypass ID", rid);
   //      let payload = dataSource[0].model;
        
   //      // Remove transient fields starting with _
   //      _.forEach(payload, model => {
   //          _.forIn(model, (value, key)=> {
   //             if(key.startsWith("_")) delete model[key];
   //          });
   //      });
   //     // let id = new Date() + "" + Math.random() * 9999999;
   
   //    let order_items =[];
   
   //    _.forEach( payload, model =>{
   //      let item = { 
   //          properties: model,
   //          productId: model.localId
   
   //      };  
   //      delete item.properties.localId;
   //      order_items.push(item);
   
   //    });
   
   
      getData("",     
      {
           "pageName": "isSubmittedProgress",
           "pagetype": "model",
           "properties": {
               "progressObj": {
               "resourceId":  rid,
               "resourceType": "product",
                   "type": "modify",
                   "subtype": "dynamic",
                   "status": "In-progress",
                   "where": ""
   
               }
             
           }
       }, 
   //     success => {
   //         console.log("succss msg: ", success);
          
   //    }, error => {
   //        console.log("error msg: ", error);
   //    });
   (result) => {
       console.log("CDO Result DYN bypass TRACKSUBMIT =>", result);
       // tempOtherEnd =  _.clone(result.model[0],true);
      // result.selectedProduct = product;
       //result.otherEnds = otherEnds;
       // result.model.push(tempOtherEnd);// This is done for the time being to get B-point in model
       console.log("CDO result track", result ); 
       
       resetDataSource ("confirm");
       updateDataSource ("confirm",
       [result
       ]);
       //if (success) success(result.model.orders[0].progress);
        if (success) success(result);
   }, (error) => {
       console.log("Failed to fetch P BW", error);
   });
    }
   };
   
   // (result) => {
   //     console.log("Result PBW tracking SUBMIT =>", result);
   //     // tempOtherEnd =  _.clone(result.model[0],true);
   //   // result.selectedProduct = product;
   //     //result.otherEnds = otherEnds;
   //     // result.model.push(tempOtherEnd);// This is done for the time being to get B-point in model
   //     //console.log("result", result ); 
       
   //     resetDataSource ("confirm");
   //     updateDataSource ("confirm",
   //     [result
   //     ]);
   //     if( success) (success);
   // }, (error) => {
   //     console.log("Failed to fetch P BW", error);
   // });
   //  }
   // };