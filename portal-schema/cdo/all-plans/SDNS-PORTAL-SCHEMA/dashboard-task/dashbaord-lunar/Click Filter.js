evaluate = function (){
    let filter = {
        line: {
            title: "Service type",
            values: {
                "Internet": true, 
                "Ethernet": true
            }
        },
        category: {
            title: "Product Family",
            values: {
                "SD": true, 
                "Evolve EWAN": true
            }
        }
    };
    success(filter);
};