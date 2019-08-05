// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 


// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function (){
    let template;
   // let product = getValue("details");
    //console.log("product => DETAILS", product);
   // let bandwidth = product.properties.service.properties.bandwidth;
    //let flexing;
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
    
    let product;
    
    product = getValue('details');
    
   // let bandwidth = product.selectedproduct.properties.service.properties.bandwidth;
    let _ = getLodash();
    let LPDS = getDataSource("landingPageData");
   // console.log("in perm bw=>", map, getValue('details'), model, getDataSource('map'), getDataSource("landingPageData"));
    // let serviceDetails = {
    //     serviceId: product.id,
    //     product: product,
    //     type: "Permanent",
    //     LPDS: LPDS  
    // };

    console.log("service Details from serviceID test1", product );
    
  //  template = "test " + bandwidth;
    //success(template);
     //call ("details", "onCallLoad", null, null, product);
     
      let serviceDetails = {
        serviceId: product.id,
        product: product,
        type: "servicesdetails",
        LPDS: LPDS
       
    };
    callService ( /** Name: Get Services Details Schema (Command) **/ '26022019-1126-1009-1248-16874fb7abd4', 
        serviceDetails, 
        (result)=>{
            result.model = {
                serviceDetails: serviceDetails
            };
            console.log("SC from get services detail =>", result);
           
            navigate(result);
        }, (err) => {
            showAlert (err);
        });
     
     
};


//evaluate = function (){
//   let template = "test";
//   let product = getValue("details");
//let template ="test";
// console.log("service deatil lunar test");
// success(template);

//evaluate = function (){
    // let map = getValue("map");
    // let product;
    // if(!!map) {
    //     product = map.selected;
    // }
    // if(!product) {
    //     product = getValue('details');
    // }
    // let _ = getLodash();
    // let LPDS = getDataSource("landingPageData");
    // console.log("in perm bw=>", map, getValue('details'), model, getDataSource('map'), getDataSource("landingPageData"));
    // let serviceDetails = {
    //     serviceId: product.id,
    //     product: product,
    //     type: "Permanent",
    //     LPDS: LPDS  
    // };

    // console.log("service Details from serviceID", serviceDetails );
    // callService ( /** Name: Get Permanent Bandwidth Schema (Command) **/ '07122018-0114-3959-70ba-c0e17d2a8423', 
    //     serviceDetails, 
    //     (result)=>{
    //         result.model = {
    //             serviceDetails: serviceDetails
    //         };
    //         console.log("PB HC result =>", result);
           
    //         navigate(result);
    //     }, (err) => {
    //         showAlert (err);
    //     });

//};