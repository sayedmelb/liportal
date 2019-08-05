// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

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
    console.log("in serc bw2 model =>", model);
    let serviceDetails = {
        serviceId: model.serviceDetails.product.selectedproduct.id,
        //product: product,
        product: model.serviceDetails.product.selectedproduct,
        type: "Scheduled",
        LPDS: model.serviceDetails.LPDS
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