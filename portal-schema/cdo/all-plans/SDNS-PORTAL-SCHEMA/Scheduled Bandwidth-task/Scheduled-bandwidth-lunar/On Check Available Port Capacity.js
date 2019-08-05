// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function (){
    console.log("cdo:submit check available port capacity =>", model, getDataSource('configure'));
    let _ = getLodash();
    let dataSource = getDataSource('configure');
    console.log("cdo:datasource check available Progress", dataSource);
    if(dataSource && dataSource[0] && dataSource[0].model && dataSource[0].model.length>0) {
     let payload = dataSource[0].model;
       let rid =  model.serviceDetails.product.id; //"0f3f1163-1f0d-441d-93e7-195f62df27b6"; //model.serviceDetails.product.id;
       let serviceID = model.serviceDetails.product.properties.service.properties.serviceId;
       
       console.log("RESOURCE ID", rid);
       //let serviceID = rid;
       let startDate, endDate, startTime, endTime, frequency;
        _.forEach(payload, model => { 
            console.log("payload model", payload, model);
             _.forIn(model, (value, key)=> { 
                 
                 if(key=='single_date') {
                     if(!startDate)
                     startDate = model.single_date;
                     if(!endDate)
                     endDate = model.single_date;
                     
                 } else {
                     if(!startDate)
                     startDate = model.start_date;
                     if(!endDate)
                     endDate = model.end_date;
                 }
                 if(!startTime)
                 startTime = model.start_time;
                 if(!endTime)
                 endTime = model.end_time;
                 if(!frequency)
                 frequency = model.recurrence_type;
                 console.log("startDate", startDate);
             });
            
        });
       //let startDate = 
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
           "pageName": "portCapacityBW",
           "pagetype": "model",
           "properties": {
                "customerId": "49091",
                                     "serviceID": serviceID,                                 
                                     "startDate": startDate,  
                                     "endDate":  endDate,
                                     "startTime": startTime,
                                     "endTime": endTime,
                                     "frequency": frequency,
                                     "filterChild": "sd_fibre",
                                     "filterParent": "Access",
                                     "outObj": "type=grade_of_service,type=flex_pack,type=qos,type=port_selections,type=sd_fibre_sla",
                                     "productId": ["942229cd-699f-4e23-bfea-595b8a8a1500"],
                                     "productType": "ewan",
                                     "version": "v1.6",
               
                                   "progressObj": {
                                   "resourceId":  rid,
                                   "resourceType": "product",
                                       "type": "modify",
                                       "subtype": "schedule",
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
       console.log("cdo result port=>", result);
       // tempOtherEnd =  _.clone(result.model[0],true);
      // result.selectedProduct = product;
       //result.otherEnds = otherEnds;
       // result.model.push(tempOtherEnd);// This is done for the time being to get B-point in model
       console.log("cdo result port capacity SBW", result ); 
       
       //resetDataSource ("confirm");
       //updateDataSource ("confirm",
       //[result
       //]);
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