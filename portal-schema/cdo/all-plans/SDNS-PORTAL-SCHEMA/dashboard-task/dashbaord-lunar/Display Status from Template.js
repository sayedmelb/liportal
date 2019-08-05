// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

//evaluate = function (){
  //  let template;
    //let service = model;
    //let status = service.properties.status;
    // if (status && status.includes ("warning") && status.includes ("flexing")) {
    //     template = `<p class='info-window'>
    //                     <img src='../../assets/imgs/warningSignIcon.png'> Utilisation <span class="warning-color">` + service.properties.utilization.value + service.properties.utilization.unit + `</span><br>
    //                     <img src='../../assets/imgs/flexingSignIcon.png'> Flexing <span class="flex-color"><ion-icon name="ios-arrow-up"></ion-icon>  &#x5e;` + service.properties.flexing.bandwidth + `/` + service.properties.flexing.bandwidth + `</span>
    //                 </p>`;
    // }
    // else if (status && status.includes ("warning"))
    //     template = `<p class='info-window'>
    //                     <img src='../../assets/imgs/warningsignicon.png'> Utilisation <span class="warning-color">` + service.properties.utilization.value + service.properties.utilization.unit + `</span>
    //                 </p>`;
    // else if (status && status.includes ("flexing")) {
    //     template = `<p class='info-window'>
    //                     <img src='../../assets/imgs/flexingSignIcon.png'> Flexing <span class="flex-color"><ion-icon name="ios-arrow-up"></ion-icon>  &#x5e;` + service.properties.flexing.bandwidth + `/` + service.properties.flexing.bandwidth + `</span>
    //                 </p>`;
    // }
    // else if (status && status.includes ("normal"))
    //     template = `<p class='info-window'>
    //                     <img src='../../assets/imgs/NormalSignIcon.png'> Normal
    //                 </p>`;
    // else if (status && status.includes ("outage"))
    //     template = `<p class='info-window'>
    //                     <img src='../../assets/imgs/outageSignIcon.png'> Outage
    //                 </p>`;
    // else if (status && status.includes ("provisioning"))
    //     template = `<p class='info-window'>
    //                     <img src='../../assets/imgs/provisioningSignIcon.png'> Provisioning
    //                 </p>`;
    // template = `<p class='info-window'>
      //                   <img src='../../assets/imgs/NormalSignIcon.png'> Normal
        //         </p>`;
    //success (template);
//};


// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 
// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 
evaluate = function (){
    let template;
    let product = model;
    template = "<img class='status-icon status-sidebar-icon' style='width:20px; height:20px;' src='" +getImage(product) + "' > ";
    template = template + "<span class='statuslabel' style='margin-top:4px; padding-left:4px'>" + getStatus(product) + "</span>";
    success(template);
};

var getStatus = function(product) {
    let responseStatus ="Normal";
    let priorityArr= ["outage", "warning", "flexing", "active", "in-progress"];
    //console.log("product DISPLAY CDO", product);
    if(product && product.properties.status) {
        let priority;
        let found  = false;
        _.forEach(priorityArr, p=> {
            priority = _.find(product.properties.status, (status)=> {
               // return status.type.toLowerCase()==p;
               if(status.type.toLowerCase() == p.toLowerCase())
          {
            found = true;
            return true;
            
          } 
            });
            if(found)
            return false;  
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
};
var getImage = function (product) {
    let marker = "../../assets/imgs/NormalSignIcon.png";
    let status = getStatus(product);
    switch(status.toLowerCase()) {
        case "outage":
            marker = "../../assets/imgs/outage.png"; break;
        case "warning": 
            marker = "../../assets/imgs/warning.png"; break;
        case "flexing": 
            marker = "../../assets/imgs/flexing.png"; break;
        case "in provisioning": 
            marker = "../../assets/imgs/provisioning.png"; break;
        default:
            marker = "../../assets/imgs/Normal.png";
            break;
    }
     
    return marker;
};