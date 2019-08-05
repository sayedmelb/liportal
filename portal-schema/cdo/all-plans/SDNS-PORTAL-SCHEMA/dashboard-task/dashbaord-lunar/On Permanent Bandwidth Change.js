
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
    console.log("in perm bw=>", map, getValue('details'), model, getDataSource('map'), getDataSource("landingPageData"), getDataSource("dashboard.landingPageData"));
    let serviceDetails = {
        serviceId: product.id,
        product: product,
        type: "Permanent",
        LPDS: LPDS
    };
    callService ( /** Name: Get Permanent Bandwidth Schema (Command) **/ '07122018-0114-3959-70ba-c0e17d2a8423', 
        serviceDetails, 
        (result)=>{
            result.model = {
                serviceDetails: serviceDetails
            };
            console.log("PB HC result =>", result);
           
            navigate(result);
        }, (err) => {
            showAlert (err);
        });
};