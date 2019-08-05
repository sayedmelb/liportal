var execute = function (){
    __print("Name: Submit Permanent Change Request (Command) called ... ");
    __print(__model);
    try{
        var response = __callAPI (/** Name: DR API[Put DR] (API) **/ '26032019-0339-1151-1fdc-693f54e5e4f6', '1649fb96-573e-47a3-a3f4-3bd9abb97a12', {
            data: __model
        });
    } catch (e){
        __print (""+e);
    }
    
	return {
	    "model": response
	};
};