// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function (){
    console.log("Port detail loading", model);
    let _ = getLodash();
    let accessRef = _.find(model.serviceDetails.product.selectedproduct.properties.service.reference, (ref)=>{
        return ref.type=='resource' && ref.subtype=='access';
    });
    console.log("Access Ref - ", accessRef);
    let products = _.filter(model.serviceDetails.product.products, (product)=> {
       return _.find(product.properties.service.reference, (ref)=>{return ref.localId==accessRef.localId;});
    });
    console.log("products on same bearer =>", products);
    
    let data = getDataSource("servicesdetails");
    data[0].portDetailData = products;
    
    resetDataSource("servicesdetails");
    updateDataSource("servicesdetails", data);
};