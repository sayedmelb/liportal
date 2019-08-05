evaluate=function(){
    resetDataSource("scheduleflex");
    console.log("cdo scheduleflex");
    callCommand(/** Name: Get Customer Service Flexing Details (Command) **/ '11122018-0313-1062-f256-a599e7788082',
        model.serviceDetails,
        (result)=>{
            result.model.service.forEach ((service) => {
                if (service.reference) {
                    service.reference.forEach ((ref) => {
                        if (ref.type == 'product') {
                            service.properties.product = result.model.product.filter ((product) => product.id == ref.localId) [0];
                            service.properties.product.reference.forEach ((ref) => {
                                if (ref.type == 'offer') {
                                    service.properties.offer = result.model.offer.filter ((offer) => offer.id == ref.localId) [0];
                                    service.properties.offer.properties.pricetemplate = service.properties.offer.properties.currency.symbol + service.properties.offer.properties.price + "/" + service.properties.offer.properties.billingCycle;
                                }
                            });
                        }
                        if (ref.type == 'resource') {
                            service.properties.resource = result.model.resource.filter ((resource) => resource.id == ref.localId) [0];
                        }
                        if (ref.type == 'address') {
                            service.properties.address = result.model.address.filter ((address) => address.id == ref.localId) [0];
                        }
                    });
                }
            });
            updateDataSource("scheduleflex", result.model.service);
        },(error)=>{
            console.log(error);
        });
};