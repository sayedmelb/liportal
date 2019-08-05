
evaluate = function (){
    let map = getValue("map");
    let product;
    if(!!map) {
        product = map.selected;
    }
    if(!product) {
        product = getValue('details');
    }
    let _ = getLodash();
    let LPDS = getDataSource("landingPageData");
    console.log("in schdule lunar module bw=>", map, getValue('details'), model, getDataSource('map'), getDataSource("landingPageData"), getDataSource("dashboard.landingPageData"));
    let serviceDetails = {
        serviceId: product.id,
        product: product,
        type: "Scheduled",
        LPDS: LPDS
    };
    //callService ( /** Name: Get Permanent Bandwidth Schema (Command) **/ '07122018-0114-3959-70ba-c0e17d2a8423', 
     callService (/** Name: Get Scheduled Bandwidth Schema (Command) **/ '11122018-0251-5712-997f-d69cee2dd344', 
        serviceDetails, 
        (result)=>{
            result.model = {
                serviceDetails: serviceDetails
            };
            console.log("schedule lunar result =>", result);
           
            navigate(result);
        }, (err) => {
            showAlert (err);
        });
};

//evaluate = function (){
   // console.log("cdo at Lunar module -> On Scheduled Bandwidth Flex: serviceDetails step 1" );
    
    // let service = getValue("map").selected;
    // let serviceDetails = {
    //     serviceId: service.properties.serviceId,
    //     type: "Scheduled"
    // };
    // console.log("cdo at Lunar module -> On Scheduled Bandwidth Flex: serviceDetails",serviceDetails );
    // callService (/** Name: Get Scheduled Bandwidth Schema (Command) **/ '11122018-0251-5712-997f-d69cee2dd344', 
    //     serviceDetails, 
    //     (result)=>{
    //         result.model = {
    //             serviceDetails: serviceDetails
    //         };
    //         navigate(result);
    //     }, (err) => {
    //         showAlert (err);
    //     });
//};