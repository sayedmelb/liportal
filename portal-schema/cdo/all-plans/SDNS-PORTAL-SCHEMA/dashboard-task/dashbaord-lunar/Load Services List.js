// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function (){
    resetDataSource ("landingPageData");
    updateDataSource("landingPageData", [model]);
    console.log("In Load Services List =>", model);
    if (model.location && model.product && model.service){
        console.log("model.location from Load Services Change:", model.location);
        // model.service.forEach ((service) => {
        //     service.reference.forEach ((ref) => {
        //         if (ref.type == 'product') {
        //             service.properties.product = model.product.filter ((product) => product.id == ref.localId) [0];
        //             service.properties.product.reference.forEach ((ref) => {
        //                 if (ref.type == 'offer') {
        //                     service.properties.offer = model.offer.filter ((offer) => offer.id == ref.localId) [0];
        //                 }
        //             });
        //         }
        //         if (ref.type == 'resource') {
        //             service.properties.resource = model.resource.filter ((resource) => resource.id == ref.localId) [0];
        //         }
        //         if (ref.type == 'address') {
        //             service.properties.address = model.address.filter ((address) => address.id == ref.localId) [0];
        //         }
        //     });
        // });
        // let _ = getLodash();
        // let products = _.cloneDeep(model.product);
        // _.forEach(model.location, location => {
        //     _.forEach(products, product=>{
        //         if(_.includes(location.properties.products, product.id)) {
        //             product.properties.location = _.cloneDeep(location);         
        //         }
        //         _.forEach(product.reference)
        //     });
        // });
        
        //call ("content.home.services.details", "onLoad", null, null, model.product);
         call ("content.home.services.details", "onLoad", null, null, model.product);
    }
};

// evaluate = function (){
//     if (model.location){
//         //call ("content.home.services.details", "onLoad", null, null, model.location.properties.products);
//     }
// };