// Please do not add 'var' in-front of evaluate function or do not override evaluate function with var evaluate 

evaluate = function (){
    callService (/** Name: Get Dynamic Bandwidth Schema (Command) **/ '12122018-0334-2447-8cbd-430a3a1b104e', 
        {}, 
        (result)=>{
            navigate(result);
        }, (err) => {
            showAlert (err);
        });
}; 