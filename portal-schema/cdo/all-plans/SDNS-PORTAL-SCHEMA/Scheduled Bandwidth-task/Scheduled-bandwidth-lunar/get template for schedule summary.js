evaluate = function (){
    let template;
  
    //template = "<h2>Bandwidth Change.</h2><p>Permanent Bandwidth changes enables you to increase your service bandwidth permanently until the end of your contract period. This is considered your Contracted Bandwidth. Contracted bandwidth or port changes cannot be <b>decreased</b> once submitted</p>";
    //template = "<h2>Speed Change</h2><p>Use the slider to set the service speed you require between A-End and B-End.<br><b>Note:</b> The slider below represents <b>A-end</b> which is currently utilised link</p>";
    template = "<ion-row > <ion-col col-12> <span class='sub-heading'> Speed Change </span>&nbsp;<info-icon></info-icon></ion-col> <ion-col col-12> <p class='description-text'>Use the slider to set the service speed you require between A-End and B-End.<br><b>Note:</b> The slider below represents <b>A-end</b> which is currently utilised link</p> </ion-col> </ion-row>";
    //if (service.properties.flexing) template = template  + `<br>` + service.properties.flexing.bandwidth +  ` Flex Capacity`; 
    // template = "test";
    success(template);
};
