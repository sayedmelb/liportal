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
    console.log("product in demand", product);
    console.log("model in demand", model);
    let LPDS = getDataSource("landingPageData");
    console.log("cdo:in ondemand lunar module bw=>", map, getValue('details'), model, getDataSource('map'), getDataSource("landingPageData"), getDataSource("dashboard.landingPageData"));
    let serviceDetails = {
        serviceId: model.serviceDetails.product.selectedproduct.id, //product.id,
        product: model.serviceDetails.product.selectedproduct,//product,
        type: "ondemand",
        LPDS: model.serviceDetails.LPDS
    };
    console.log("LPDS", LPDS);
    console.log("serviceDetails on demand", serviceDetails);
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