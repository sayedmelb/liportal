// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function (){
    updateSettings ("map", {
        center: "Arckaringa, Australia",
        zoom: 4
    });
    call("content.home.dashboard.map", "updateBehaviour", null, null, {
        showChild: false
    });
};