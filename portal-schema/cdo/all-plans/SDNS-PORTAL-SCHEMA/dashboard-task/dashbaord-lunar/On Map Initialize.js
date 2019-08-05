// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function (){
    resetDataSource ("map");
    resetDataSource ("landingPageData");
    updateDataSource("landingPageData", [model]);
    console.log("inside map.. =>", model);
    if (model.location){
        var map = [];
        model.location.forEach ((location)=>{
            map.push({
                address: location,
                products: getProducts(location.properties.products, model),
                marker: getMarker(location.properties.products, model),
                services: getServices(location.properties.services, model)
            });
        });
        console.log('datasource for map => ', map);
        updateDataSource ("map", map);
        let allservices = location.properties.products.length;
        let normalservices = filterByStatus(location.properties.products, "Active");
        let flexingservices = filterByStatus(location.properties.products, "flexing");
        let warningservices = filterByStatus(location.properties.products, "warning");
        let outageservices = filterByStatus(location.properties.products, "outage");
        let provisioningservices = filterByStatus(location.properties.products, "In-progress");
        // call ("content.home.dashboard.map", "onControlsReload", null, null, null);
        call ("content.home.dashboard.map", "onControlsReload", null, null, [{
            id: "all",
            title: "All " + allservices,
            active: true
        }, {
            id: "normal",
            title: "Normal " + normalservices
        }, {
            id: "flexing",
            title: "Flexing " + flexingservices
        }, {
            id: "warning",
            title: "Warning " + warningservices
        }, {
            id: "outage",
            title: "Outage " + outageservices
        }, {
            id: "provisioning",
            title: "In Provisioning " + provisioningservices
        }]);
    }
};
var _ = getLodash();

var filterByStatus = function(products, status) {
    let count = 0;
    _.forEach(products, product => {
        if(product.properties.status) {
            console.log("counting for =>", status);
            let servStatus = _.find(product.properties.status, servStat=> {
                return servStat.type == status;
            });
            if(servStatus && servStatus.type && servStatus.type==status) {
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
        let found  = false;
        _.forEach(priorityArr, p=> {
            priority = _.find(products[0].properties.status, (status)=> {
              // console.log("status lower", status.type.toLowerCase());
          if(status.type.toLowerCase() == p.toLowerCase())
          {
            found = true;
            return true;
            
          }
         
        });
       if(found)
        return false;
        });
       // console.log("priority for marker =>",  products[0], products[0].properties.status, priority);
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
    return marker;
};