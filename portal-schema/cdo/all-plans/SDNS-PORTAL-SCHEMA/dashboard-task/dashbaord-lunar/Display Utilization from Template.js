// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function (){
    //console.log("template called for utilization", model);
    //let template = "Utilization ";
    //template= template.concat(model.properties.service.properties.utilization.utilization);
    let template = " <ion-col col-6 class='field-label'>Utilizations</ion-col>"
    template = template + "<ion-col col-6 class='field-text'>" + model.properties.service.properties.utilization.utilization +"</ion-col>"
    success(template);
};