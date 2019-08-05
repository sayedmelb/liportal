// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

// evaluate = function (){
//     console.log("Map pointer clicked aaa");
//       updateSettings ("map", {
//          center: "68 Little Lonsdale Street, Melbourne VIC 3000, AU"
//      });
//     call("content.home.dashboard.map", "updateBehaviour", null, null, {
//         showChild: true
//     });
// };

evaluate = function (){
    let service = getValue ("map").location;
    console.log("Map pointer clicked aaa",service.title, service);
    //   updateSettings ("map", {
    //      center: "68 Little Lonsdale Street, Melbourne VIC 3000, AU"
    //  });
    // updateSettings ("map", {
    //     center: {
    //         lat: Number(location.lat),
    //         lng: Number(location.long)
    //     },
    //     zoom: 9
    // });
     updateSettings ("map", {
          center: service.title, 
          zoom: 16
         
      });
    call("content.home.dashboard.map", "updateBehaviour", null, null, {
        showChild: true
    });
};