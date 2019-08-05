// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function (){
    let product = getValue("map").selected;
    let productTitle = product.title;
    let status = product.properties.status;
    let controls = [];
    switch (productTitle) {
        case "SD Ethernet":
            switch (status) {
                case "outage":
                    controls = ["c1", "c4", "c5", "c6", "c7"];
                    break;
                case "provisioning":
                    controls = ["c4", "c5", "c6", "c7"];
                    break;
                default:
                    controls = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];
                    break;
            }
            break;
        case "SD Internet":
            controls = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];
            break;
        case "Evolve EWAN Ethernet":
            controls = ["c4", "c5", "c6", "c7"];
            break;
        case "Evolve EWAN Internet":
            controls = ["c4", "c5", "c6", "c7"];
            break;
        case "EWAN":
            controls = ["c4", "c5", "c6", "c7"];
            break;
        default:
            controls = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];
    }
    call ("content.home.dashboard.map", "onControlsFilter", null, null, controls);
};