// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function (){
    let service = getValue ("map").location;
    let imap = getValue("map");
    console.log("cdo: Map Child Load service and map", service, imap);
    
    updateSettings ("map", {
        center: {
            lat: Number(location.lat),
            lng: Number(location.long)
        },
        zoom: 9
    });
    let imap2 = getValue("map");
console.log("cdo: Map Child Load service after update of center and imap", service, imap2);
};