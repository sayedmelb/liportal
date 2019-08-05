// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function (){
    console.log("submit PC Payload model first time =>", model, getDataSource('review'));
    let _ = getLodash();
    let dataSource = getDataSource('review');
    console.log("datasource submit first", dataSource);
    
    if(dataSource && dataSource[0] && dataSource[0].model && dataSource[0].model.length>0) {
        let payload = dataSource[0].model;
        
        // Remove transient fields starting with _
        _.forEach(payload, model => {
            _.forIn(model, (value, key)=> {
               if(key.startsWith("_")) delete model[key];
            });
        });
       // let id = new Date() + "" + Math.random() * 9999999;
   
      let order_items =[];
   
      _.forEach( payload, model =>{
        let item = { 
            properties: model,
            productId: model.localId
   
        };  
        delete item.properties.localId;
        order_items.push(item);
   
      });
   
   
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
       }, success => {
           console.log("succss msg: ", success);
          
      }, error => {
          console.log("error msg: ", error);
      });
    }
   };