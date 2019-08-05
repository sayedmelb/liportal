evaluate = function (){
    console.log("cdo: reload starts");



//block 4 
console.log("model CDO reload list: map", model);

let home = model.content.home; //getValue(model.home);
console.log("home", home);
   let customerid="";
   if(home.dashboard && home.dashboard.map && home.dashboard.map.customerid) customerid = home.dashboard.map.customerid;
   //else customerid = "4469";
   else customerid = "51271"; //"10124"; // "518841";
   
   console.log("Customer ID = > ", customerid);
   getData( /** Name: Get Customer Service Summary (Command) **/ '29112018-0454-0769-3c63-f6271c2553df', {

           "pageName": "portalLandingPage",
           "pagetype": "model",
           "properties": {
               "customerId": customerid



           }

       },
       (result) => {
           console.log("result received =>", result); 
           var tempResult = Object.assign({}, result);
          
           // iterate over locations to add products and services in its properties.
           result.location.forEach(location => {
               let services = [];

               // iterate over services to identify service belonging to location in current interation.
               tempResult.service.forEach(service => {
                   if (service.reference) {
                       // Get service for location in current iteration.
                       let serve = service.reference.filter(refServe => {
                           return refServe.localId == location.id;
                       });
                       if (serve && serve.length > 0) {
                           // Add references of services in current location.
                           services.push(service);
                       }
                   }
               });
               /* console.log("services =>", services); */
               let productsForLocation = [];
               // Iterate over products
               tempResult.product.forEach(product => {
                   if (product && product.reference) {
                       //Get all services for current product.
                       let cfs = product.reference.filter(refProd => {
                           return refProd.type == 'service';
                       });
                       let servicesForProd = [];
                       // Iterate over service references of current product. [Get the service objects]
                       cfs.forEach(refProd => {
                           // Get the only service which refers to current location. [Product belonging to current location]
                           let srvInList = tempResult.service.find(service => {
                               return service.id == refProd.localId;
                           });
                           
                           let accessService =  tempResult.service.find(service => {
                               return service.id == refProd.localId && service.properties.serviceId != 'TBA';
                           });
                           
                           if(!!accessService) {product.properties.service = _.cloneDeep(accessService)}
                       
                           if (!!srvInList) {
                               // Add reference of productId in service.
                               srvInList.properties.productId = product.id;
                               servicesForProd.push(srvInList);
                           }
                       });

                       // Add reference of services for current product.
                       product.properties.services = _.cloneDeep(servicesForProd);

                       // Iterate over services for current product [Get Products available at current location].
                       servicesForProd.forEach(srvFrPrd => {
                           if (srvFrPrd && srvFrPrd.reference && srvFrPrd.reference.length > 0) {
                                 let locFound = srvFrPrd.reference.find(rfS => {
                                   return rfS.localId == location.id;
                               });
                               if (!!locFound) {
                                   product.properties.location = _.cloneDeep(location);
                                   productsForLocation.push(product);
                               }
                               if (!!locFound && !product.properties.service) {
                                   product.properties.service = _.cloneDeep(srvFrPrd);
                               }
                           }
                       });

                       //Add resources in Product
                       
                       if (product.properties.service) {
                           let referenceOfResource = _.find(product.properties.service.reference, (refServe) => {
                               return refServe.type == 'resource' && refServe.subtype == 'network';
                           });
                           if (referenceOfResource) {
                               let resource = _.find(tempResult.resource, (res) => {
                                   return res.id == referenceOfResource.localId;
                               });
                               if (resource)
                                   product.properties.resource = resource;
                           }
                           let allResourcesOfProduct = [];
                           _.forEach(product.properties.service.reference, (refServe)=> {
                              let resource = _.find(tempResult.resource, (res)=> {
                                 return res.id == refServe.localId; 
                              });
                              if(resource) allResourcesOfProduct.push(_.cloneDeep(resource));
                           });
                          // console.log("Resources for product--", product.id, allResourcesOfProduct);
                           product.properties.resources = allResourcesOfProduct;
                           let inProgress = _.find(product.properties.status, (status)=> {return status.type=='In-progress'});
                           if(inProgress) {
                               product.properties.service.properties.serviceId = 'TBA';
                           }

                            //below  block is hardocded for mocking test
                           // if(product.id =='55a8b95e-fc76-4d74-bb14-f6fab44011de') {
                           //     let newstatusObj = {type: "Flexing", subtype: "scheduled", pcr: "TESTING_CPO_PO_RECEIVED_COMPLETED"};
                           //      let inFlexing = _.find(product.properties.status, (status)=> {return status.type=='Flexing'});
                           //      if(!inFlexing)
                           //     product.properties.status.push(newstatusObj);
                           //      //let inFlex_schedule = _.find(product.properties (schedule_flex)=> { return true});
                           //      if(!product.properties.schedule_flex)
                           //      {
                           //          let schedule_flex = {properties: {bandwidth: "10 Mbps"}};
                           //          let newObj = {schedule_flex };
                           //          product.properties.schedule_flex = schedule_flex;
                                    
                           //      }
                               
                           //      let tempStatusObj = [];
                           //      let FlexingObj = _.find(product.properties.status, (status)=> { if(status.type=='Flexing') return status; });
                           //      let ProgressObj = _.find(product.properties.status, (status)=> { if(status.type=='In-progress') return status; });
                           //      let ActiveObj = _.find(product.properties.status, (status)=> { if(status.type=='Active') return status; });
                           //      tempStatusObj.push(FlexingObj);
                           //      tempStatusObj.push(ActiveObj);
                           //      if(ProgressObj)
                           //      tempStatusObj.push(ProgressObj);

                           //      product.properties.status = tempStatusObj;
                           // }
                           //  block end is hardocded for mocking test

                           //block 1.2 start
                           
                           if(product.id=='2e33a2c1-0bcf-4066-a043-4e8891315332')
                           {
                              // console.log("reload test");
                               let newstatusObj = {type: "Flexing", subtype: "scheduled", pcr: "TESTING_CPO_PO_RECEIVED_COMPLETED"};
                               let inFlexing = _.find(product.properties.status, (status)=> {return status.type=='Flexing'});
                                 if(!inFlexing)
                                product.properties.status.push(newstatusObj);
                           }
                           
                           product.properties.services.forEach(srvFrPrd => {
                               let Flexing = '';
                               product.properties.Flexing = Flexing;
                                let FlexingFromOriginObj = _.find(product.properties.status, (status)=> { if(status.type=='flex') return status; });
                                if(FlexingFromOriginObj){
                                    let newflexObj = {type: "Flexing", subtype: FlexingFromOriginObj.subtype, pcr: FlexingFromOriginObj.pcr};

                                   //FlexingFromOriginObj.type = 'Flexing';
                                   //console.log("FlexingFromOriginObj", FlexingFromOriginObj.type );
                                   let checkFlexingObj = _.find(product.properties.status, (status)=> { if(status.type=='Flexing') return status; });
                                   if(!checkFlexingObj)
                                   product.properties.status.push(newflexObj); 
                                }
                               
                                //{
                               //     FlexingFromOriginObj.type='Flexing';
                               //     //now remove object

                               // }
                               // product.properties.status.push(FlexingFromOriginObj); 
                               let tempflexing_obj= _.find(product.properties.status, (status)=> { if(status.type=='Flexing') return status; });
                               if(srvFrPrd.properties.bandwidth && srvFrPrd.title=='schedule_flex' && tempflexing_obj  ) {
                                  
                                   product.properties.Flexing = srvFrPrd.properties.bandwidth;
                                   // let newstatusObj = {type: "Flexing", subtype: "scheduled", pcr: "TESTING_CPO_PO_RECEIVED_COMPLETED"};
                                   // let FlexingObj = _.find(product.properties.status, (status)=> { if(status.type=='Flexing') return status; });
                                   // if(!FlexingObj)
                                   // product.properties.status.push(newstatusObj); 
                                   // console.log("srvFrPrd.properties.bandwidth ",product.id, srvFrPrd.id,  srvFrPrd.properties.bandwidth);
                               }
                               
                               
                           });

                           //block 1.2 ends

                           //block 1.3 starts
                                let tempStatusObj = [];
                                let FlexingObj_2 = _.find(product.properties.status, (status)=> { if(status.type=='Flexing') return status; });
                                let ProgressObj_2 = _.find(product.properties.status, (status)=> { if(status.type=='In-progress') return status; });
                                let ActiveObj_2 = _.find(product.properties.status, (status)=> { if(status.type=='Active') return status; });
                                if(FlexingObj_2)
                                tempStatusObj.push(FlexingObj_2);
                                if(ActiveObj_2)
                                tempStatusObj.push(ActiveObj_2);
                                if(ProgressObj_2)
                                tempStatusObj.push(ProgressObj_2);

                                product.properties.status = tempStatusObj;
                           //block 1.3 ends
                       }

                   }

               });
               // update location object with references to products and services.
               location.properties = {
                   services: _.cloneDeep(services),
                   products: _.cloneDeep(productsForLocation)
               };
           });
           //call("content.home.dashboard.map", "onReloadedMap", null, null, result);
           
           // call("content.home.bandwidthevents.details", "onInit", null, null, result);
          
           //block 1.9 start
           let model = result;
           resetDataSource ("map");
           if (model.location){
               var map = [];
               model.location.forEach ((location)=>{
                   map.push({
                       address: location,
                       products: getProducts(location.properties.products, model),
                       marker: getMarker(location.properties.products, model),
                       services: getServices(location.properties.services, model)
                   });
               });
               console.log('datasource for map reload => ', map);
               updateDataSource ("map", map);
            //    let allservices = location.properties.products.length;
            //    let normalservices = filterByStatus(location.properties.products, "Active");
            //    let flexingservices = filterByStatus(location.properties.products, "flexing");
            //    let warningservices = filterByStatus(location.properties.products, "warning");
            //    let outageservices = filterByStatus(location.properties.products, "outage");
            //    let provisioningservices = filterByStatus(location.properties.products, "In-progress");
               // call ("content.home.dashboard.map", "onControlsReload", null, null, null);
            //    call ("content.home.dashboard.map", "onControlsReload", null, null, [{
            //        id: "all",
            //        title: "All " + allservices,
            //        active: true
            //    }, {
            //        id: "normal",
            //        title: "Normal " + normalservices
            //    }, {
            //        id: "flexing",
            //        title: "Flexing " + flexingservices
            //    }, {
            //        id: "warning",
            //        title: "Warning " + warningservices
            //    }, {
            //        id: "outage",
            //        title: "Outage " + outageservices
            //    }, {
            //        id: "provisioning",
            //        title: "In Provisioning " + provisioningservices
            //    }]);
           }

           //block 1.9 ends

          
           console.log('result from service reload: cdo: MAP  => ', result);
            if (success) success(result);
           tempResult = undefined;
       },
       (error) => {
           console.log(error);
       });

   }

   var _ = getLodash();

var filterByStatus = function(products, status) {
   let count = 0;
   _.forEach(products, product => {
       if(product.properties.status) {
           console.log("counting for =>", status);
           let servStatus = _.find(product.properties.status, servStat=> {
               return servStat.type == status;
           });
           if(servStatus && servStatus.type && servStatus.type==status) {
               count ++;
           }
       }
   });
   return count;
};

var getProducts = function(productIds, model) {
   let products = [];
   productIds.forEach( id => {
       let prod = model.product.find(p=>{
           return p.id == id;
       });
       if(!!prod) products.push(prod);
   });
   return products;    
};
var getServices = function(serviceIds, model) {
    let services = [];
   serviceIds.forEach( id=> {
       let serve = model.service.find(s=>{return s.id==id;});
       if(!!serve) services.push(serve);
   });
   return services;
};
var getMarker = function (products) {
   // let products = getProducts(serviceIds, model);
   let marker = "normal";
   let priorityArr= ["outage", "warning", "flexing", "normal", "In-progress"];
   if(products && products.length>0) {
       let priority;
       let found  = false;
       _.forEach(priorityArr, p=> {
           priority = _.find(products[0].properties.status, (status)=> {
             console.log("status lower", status.type.toLowerCase());
         if(status.type.toLowerCase() == p.toLowerCase())
         {
           found = true;
           return true;
           
         }
        
       });
     if(found)
       return false;
       });
       console.log("priority for marker =>",  products[0], products[0].properties.status, priority);
       if(priority) {
           switch(priority.type.toUpperCase()) {
               case "OUTAGE":
                   marker = "outage"; break;
               case "WARNING": 
                   marker = "warning"; break;
               case "FLEXING": 
                   marker = "flexing"; break;
               case "IN-PROGRESS": 
                   marker = "provisioning"; break;
               default:
                   break;
           }
       }
   }
   return marker;
};


