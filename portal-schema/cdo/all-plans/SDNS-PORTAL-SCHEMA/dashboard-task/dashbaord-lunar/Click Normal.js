// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

var _ = getLodash();

evaluate = function (){
    var map = [];
    var LPDS = getDataSource("landingPageData");
    console.log("model => ",  LPDS);
    let model = LPDS[0];
    if (LPDS[0].location){
        resetDataSource ("map");
        LPDS[0].location.forEach ((location)=>{
            console.log("filter results =>",filterByStatus(location.properties.products, 'Active'));
            if(filterByStatus(location.properties.products, 'Active')) {
                map.push({
                    address: location,
                    products: getProducts(location.properties.products, model),
                    marker: getMarker(location.properties.products, model),
                    services: getServices(location.properties.services, model)
                });
            }
        });
        console.log('datasource for map => ', map);
        updateDataSource ("map", map);
    }
    call("content.home.dashboard.map", "updateBehaviour", null, null, {
        showChild: false
    });
};


var filterByStatus = function(products, status) {
    let count = 0;
    _.forEach(products, product => {
        if(product.properties.status) {
            let servStatus = _.find(product.properties.status, servStat=> {
                return servStat.type == status;
            });
            if(servStatus && servStatus.type && servStatus.type == 'Active') {
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
        _.forEach(priorityArr, p=> {
            priority = _.find(products[0].properties.status, (status)=> {
                return status.type==p;
            });
        });
        console.log("priority for marker =>", products[0].properties.status, priority);
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
    // let marker = "";
    // let priorityArr= ["outage", "warning", "flexing", "Active", "In-progress"];
    // if(products && products.length>0) {
    //     let priority;
    //     _.forEach(priorityArr, p=> {
    //         priority = _.find(products[0].properties.status, (status)=> {
    //             return status.type==p;
    //         });
    //     });
    //     console.log("priority for marker =>", products[0].properties.status, priority);
    //     if(priority) {
    //         switch(priority.type.toUpperCase()) {
    //             case "OUTAGE":
    //                 marker = "<span><img src='../../assets/imgs/outage.png' alt=''>  Outage</span>"; break;
    //             case "WARNING": 
    //                 marker = "<span><img src='../../assets/imgs/warning.png' alt=''>  Warning"; break;
    //             case "FLEXING": 
    //                 marker = "<span><img src='../../assets/imgs/flexing.png' alt=''>  flexing"; break;
    //             case "IN-PROGRESS": 
    //                 marker = "<span><img src='../../assets/imgs/provisioning.png' alt=''>  provisioning</span>"; break;
    //             default:
    //                 marker = "<span><img src='../../assets/imgs/Normal.png' alt=''>  Normal</span>";
    //                 break;
    //         }
    //     }
    // }
    return marker;
};