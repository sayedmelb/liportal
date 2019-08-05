evaluate = function (){
    console.log("In Map serviceDetails request lunar module");
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
    
    //console.log("in perm bw=>", map, getValue('details'), model, getDataSource('map'), getDataSource("landingPageData"), getDataSource("dashboard.landingPageData"));
    //console.log("landing page obj: ",getDataSource("landingPageData") );
    //console.log("product: ", product);
    let serviceDetails = {
        serviceId: product.id,
        product: {products: LPDS[0].product,
                  selectedproduct: product  
                    },
        type: "servicesdetails",
        LPDS: LPDS
    };
    callService ( /** Name: Get Services Details Schema (Command) **/ '26022019-1126-1009-1248-16874fb7abd4', 
    serviceDetails, 
    (result)=>{
        result.model = {
            serviceDetails: serviceDetails
        };
        console.log("cdo:sidebar call to get services detail =>", result);
       
        navigate(result);
    }, (err) => {
        showAlert (err);
    });
};