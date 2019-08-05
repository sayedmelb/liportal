// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 
evaluate = function () {
    console.log("cdo:submit Dynamic Payload model first time:: =>", model, getDataSource('review'), getDataSource('configure'));
    //console.log("cdo:submit configure:: =>", model, getDataSource('configure'));
    //console.log("cdo:submit confirm:: =>", model, getDataSource('configure'));
    let _ = getLodash();
    let dataSource;
    if (getDataSource('review')) {
        dataSource = getDataSource('review');
    } else {
        dataSource = getDataSource('configure');
    }

    console.log("cdo:: dyn datasource submit first:", dataSource, model.localid);
    if (dataSource && dataSource[0] && dataSource[0].model && dataSource[0].model.length > 0) {
        let payload = dataSource[0].model;


        let temp_model = [];
        let clone_model = [];
        let isP2P = false;

        let productIDs = [];

        if (dataSource[0].selectedProduct.properties.topology == "Point to Point") {
            let newob = {rid: ''};
            isP2P = true;
            newob.rid = dataSource[0].selectedProduct.id;
            productIDs.push(newob);
            let newob1 = {rid: ''};
            newob1.rid = dataSource[0].otherEnds[0].id;
            productIDs.push(newob1);
        
        } else {
            let newob3 = {rid: ''};
            
            newob3.rid = dataSource[0].selectedProduct.id;
            productIDs.push(newob3);
        }

        // Remove transient fields starting with _
       
        _.forEach(payload, model => {
            let newObj = {};

            _.forIn(model, (value, key) => {


                if (key.startsWith("_")) delete model[key];
                if (key == 'active') newObj['active'] = model.active;


                if (key == 'dynamic_flex_enabled') newObj['dynamic_flex_enabled'] = model.dynamic_flex_enabled;

                if (key == 'localId') {
                    newObj['localId'] = model.localId;
                    

                  }

                if (model.dynamic_flex_enabled == "Yes") {
                    if (key == 'increased_utilisation_mode') newObj['increased_utilisation_mode'] = model.increased_utilisation_mode;
                    if (key == 'utilisation_increase_threshold_pc') newObj['utilisation_increase_threshold_pc'] = model.utilisation_increase_threshold_pc;
                    if (key == 'increased_utilisation_monitor_time_period') newObj['increased_utilisation_monitor_time_period'] = parseInt(model.increased_utilisation_monitor_time_period) * 60;

                    if (key == 'decreased_utilisation_mode') {
                        newObj['decreased_utilisation_mode'] = model.decreased_utilisation_mode.replace("down", "");
                        //new_model.decreased_utilisation_mode.replace("down","");

                    }
                    if (key == 'utilisation_decrease_threshold_pc') newObj['utilisation_decrease_threshold_pc'] = model.utilisation_decrease_threshold_pc;
                    if (key == 'decreased_utilisation_monitor_time_period') newObj['decreased_utilisation_monitor_time_period'] = parseInt(model.decreased_utilisation_monitor_time_period) * 60;

                    if (key == 'contractedBw') {
                        newObj['requestedBw'] = model.contractedBw;
                    }

                    if (key == 'timeBox') newObj['timeBox'] = model.timeBox;
                    if (key == 'timebox_start_time') newObj['timebox_start_time'] = model.timebox_start_time;
                    if (key == 'timebox_end_time') newObj['timebox_end_time'] = model.timebox_end_time;
                    if (key == 'weekFlexDays') newObj['weekFlexDays'] = model.weekFlexDays;

                    if (key == 'spendCap') newObj['spendCap'] = model.spendCap;
                    if (key == 'spendCapAmountsitea') newObj['spendCapAmountsitea'] = model.spendCapAmountsitea;
                    if (key == 'spendCapHoursitea') newObj['spendCapHoursitea'] = model.spendCapHoursitea;

                }

            });
            temp_model.push(newObj);
        });

       
        let payload2;
        payload = temp_model;
        if (isP2P) {
            payload[1] = payload[0];
            payload2 = payload;
        }

        console.log("payload", payload, temp_model, payload2);
        


        let order_items = [];

        if (isP2P) {
            let cntr = 0;
            _.forEach(payload2, mod => {
              
            
                let item = {
                    properties: mod,
                    productId: productIDs[cntr].rid,
                    orderType: "dynamic"

                };
                delete item.properties.localId;
                order_items.push(item);
                cntr ++;
            });
        } else {
            _.forEach(payload, model => {
                let item = {
                    properties: model,
                    productId: productIDs[0].rid, //model.localId,
                    orderType: "dynamic"

                };
                delete item.properties.localId;
                order_items.push(item);

            });
        }



        console.log("orders_items", order_items);


        getData("",
            {
                "pageName": "permBWPageDataSubmit",
                "pagetype": "model",
                "properties": {
                    order_items: order_items,
                    order_info: {
                        requestedBy: "test",
                        type: "modify"
                    }
                }
            },
     
            (result) => {
                console.log("Result DYN SUBMIT =>", result);
                console.log("result", result);

                resetDataSource("confirm");
                updateDataSource("confirm",
                    [result
                    ]);
                if (success) success(result);
            }, (error) => {
                console.log("Failed to fetch DYN BW", error);
            });
    }
};