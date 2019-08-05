// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

// evaluate = function (){
//     console.log("confirm submitted");
    

// };

// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function (){
    console.log("submit PC Payload model first time =>", model, getDataSource('review'));
    let _ = getLodash();
    let dataSource = getDataSource('review');
    console.log("datasource submit first:", dataSource);
    if(dataSource && dataSource[0] && dataSource[0].model && dataSource[0].model.length>0) {
        let payload = dataSource[0].model;
        
        // Remove transient fields starting with _
        _.forEach(payload, model => {
            _.forIn(model, (value, key)=> {
               if(key.startsWith("_")) delete model[key];
               if(key=='flexMax') delete model[key];
               if(key=='flex_capacity') delete model[key];
               if(key=='portAvailableBW') delete model[key];
               if(key=='portCapacity') delete model[key];
               if(key=='proactiveMonitoring') delete model[key];
               if(key=='qos') delete model[key];
               if(key=='serviceLevel') delete model[key];
               if(key=='utilizedByOtherServices') delete model[key];
               if(key=='utilizedByOtherServicesLabel') delete model[key];
               if(key=='vlan') delete model[key];
               if(key=='gradeOfService') delete model[key];
               if(key=='contractedBw') {
                   model.requestedBw = model.contractedBw;
                   delete model[key];
               }
               if(key=='single_date') {
   
                   model.start_date = model.single_date;
   
                   model.end_date = model.single_date; // if user dont put singe_date1 in UI
                   delete model[key];
               }
               if(key=='single_date1') {
                   model.end_date = model.single_date1;
                   delete model[key]; // this condition is covered above;
               }
               
               
            });
        });
       // let id = new Date() + "" + Math.random() * 9999999;
   
      let order_items =[];
   
      _.forEach( payload, model =>{
        let item = { 
            properties: model,
            productId: model.localId,
            orderType: "schedule"
   
        };  
        delete item.properties.localId;
        order_items.push(item);
   
      });
      
      console.log("orders_items", order_items);
   
   
      getData("",     
      {
           "pageName": "permBWPageDataSubmit",
           "pagetype": "model",
           "properties": {
               order_items: order_items,
               order_info: {
                   requestedBy: "test",
                   type: "modify"
               }
           }
       }, 
   //     success => {
   //         console.log("succss msg: ", success);
          
   //    }, error => {
   //        console.log("error msg: ", error);
   //    });
   (result) => {
       console.log("Result PBW SUBMIT =>", result);
       // tempOtherEnd =  _.clone(result.model[0],true);
      // result.selectedProduct = product;
       //result.otherEnds = otherEnds;
       // result.model.push(tempOtherEnd);// This is done for the time being to get B-point in model
       console.log("result", result ); 
       
       resetDataSource ("confirm");
       updateDataSource ("confirm",
       [result
       ]);
       //if (success) success(result.model.orders[0].progress);
       if (success) success(result);
   }, (error) => {
       console.log("Failed to fetch S BW", error);
   });
    }
   };