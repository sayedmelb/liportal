evaluate = function (){
    let _product = getValue("details");
    console.log("Get controls for services list- =>", _product);
    let product = _product.title;
    // let product = service.properties.product.title;
    let controls = [];
    switch (product) {
        case "SD Ethernet":
            controls = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];
            break;
        case "EWAN":
            controls = ["c4", "c5", "c6", "c7"];
            break;
        default:
            controls = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];
    }
    call ("content.home.services.details", "onControlsFilter", null, null, controls);
};