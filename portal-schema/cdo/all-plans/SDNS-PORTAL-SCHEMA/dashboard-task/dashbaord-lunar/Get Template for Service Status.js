// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function (){
    let template;
    let product = getValue("details");
    template = "<img class='status-icon' src='" +getImage(product) + "' > " + getStatus(product);
    success(template);
};

var getStatus = function(product) {
    let responseStatus ="Normal";
    let priorityArr= ["outage", "warning", "flexing", "active", "in-progress"];
    if(product && product.properties.status) {
        let priority;
        _.forEach(priorityArr, p=> {
            priority = _.find(product.properties.status, (status)=> {
                return status.type.toLowerCase()==p;
            });
        });
        if(priority) {
            switch(priority.type.toLowerCase()) {
                case "outage":
                    responseStatus = "Outage"; break;
                case "warning": 
                    responseStatus = "Warning"; break;
                case "flexing": 
                    responseStatus = "Flexing"; break;
                case "in-progress": 
                    responseStatus = "In Provisioning"; break;
                default:
                    responseStatus = "Normal"; break;
            }
        }
    }
    return responseStatus;
}
var getImage = function (product) {
    let marker = "../../assets/imgs/NormalSignIcon.png";
    let status = getStatus(product);
    switch(status.toLowerCase()) {
        case "outage":
            marker = "../../assets/imgs/outageSignIcon.png"; break;
        case "warning": 
            marker = "../../assets/imgs/warningSignIcon.png"; break;
        case "flexing": 
            marker = "../../assets/imgs/flexingSignIcon.png"; break;
        case "in provisioning": 
            marker = "../../assets/imgs/provisioningSignIcon.png"; break;
        default:
            marker = "../../assets/imgs/NormalSignIcon.png";
            break;
    }
     
    return marker;
};