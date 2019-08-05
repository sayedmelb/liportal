
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
    console.log("product for ondemand in dashboard", product);
    console.log("model for ondemand in dashboard", model);
    let LPDS = getDataSource("landingPageData");
    console.log("cdo:in ondemand lunar module bw=>", map, getValue('details'), model, getDataSource('map'), getDataSource("landingPageData"), getDataSource("dashboard.landingPageData"));
    let serviceDetails = {
        serviceId: product.id,
        product: product,
        type: "ondemand",
        LPDS: LPDS
    };
    console.log("LPDS map", LPDS);
    console.log("serviceDetails map", serviceDetails);
    //callService ( /** Name: Get Permanent Bandwidth Schema (Command) **/ '07122018-0114-3959-70ba-c0e17d2a8423', 
     callService ( /** Name: Get OnDemand Bandwith Schema com module (Command) **/ 
    '12052019-0030-2589-f907-518b52e0030f' , 
        serviceDetails, 
        (result)=>{
            result.model = {
                serviceDetails: serviceDetails
            };
            console.log("ondemand lunar result =>", result);
           
            navigate(result);
        }, (err) => {
            showAlert (err);
        });
};

// evaluate = function (){
//     console.log("cdo: ondemand call lunar2");
//     callService ( /** Name: Get OnDemand Bandwith Schema com module (Command) **/ 
//     '12052019-0030-2589-f907-518b52e0030f' , 
//         {}, 
//         (result)=>{
//             navigate(result);
//         }, (err) => {
//             showAlert (err);
//         });
// };
