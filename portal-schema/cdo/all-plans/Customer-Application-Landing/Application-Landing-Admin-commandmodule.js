var execute = function (planId){
    try{
	    return __loadLunarModule (planId, /** Name: Admin Landing Page (task) **/ 'ebb8d54a-da85-4f47-86c6-2432797728aa', {});
    } catch (e){
        return {
            hasException: true,
            message: ""+e
        };
    }
};