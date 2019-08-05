evaluate = function (){
    let template = '';
    // let product = getValue("details");
    // let futureservicephrase = '';
    // let futureservicFlag = false;
    // if(service.product.futureservice !== "") {
    //     futureservicFlag = true;
    //     futureservicephrase = futureservicephrase	+ "<br><a href='#' class='ancView'>" + service.product.futureservice + " future events</a>";
    // }
    // if(service.product.scheduled_flex_enabled === true) {
    //     template = template + 'Scheduled - ' + service.product.scheduled_bw;
    //     template = template + "<br><span class='rowdate'>" + service.product.scheduled_start_date + " - " + service.product.scheduled_end_date 	+ "<br><a href='#' class='ancView'>View</a></span>";
    //     if(futureservicFlag===true) template = template +  futureservicephrase;
    // } 
	// else if(service.product.dynamic_flex_enabled === true) {
    // 	template = template + 'Dynamic - ' + service.product.dynamic_bw;
    // 	template = template + "<br><span class='rowdate'>" + service.product.scheduled_start_date + " - " + service.product.scheduled_end_date 	+ "<br><a href='#' class='ancView'>Edit</a></span>";
    // 	if(futureservicFlag===true) template = template +  futureservicephrase;
    // }
    // else {
      //  console.log("Get Tempalte for flex =>",model);
    	template = template + "No events scheduled";
    // }
    success(template);
};
