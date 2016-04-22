console.log("MyModule.js Start");
var MyModule = {};
var CMConstants ={};
/**
 * @description unknown message
 * @type {string}
 * @const
 */
CMConstants.UNKNOWN = "UNKNOWN";
/**
 * @description loginRequest message
 * @type {string}
 * @const
 */
CMConstants.LOGINREQUEST = "LOGINREQUEST";
/**
 * @description loginResponse message
 * @type {string}
 * @const
 */
CMConstants.LOGINRESPONSE = "LOGINRESPONSE";
CMConstants.print =function(){
    console.log(this.LOGINRESPONSE);
}
MyModule.CMConstants = CMConstants;

MyModule.DemoFun = function(){
    console.log("DemoFun run....");
};

console.log("MyModule.js End");
if (typeof define === 'function' && define["amd"]){
    define([], function () { return MyModule; } );
}  
else if (typeof require === "function" && typeof module === "object" && module && module["exports"]){
    module.exports = MyModule;
} 
else if ( typeof window === "object" && typeof window.document === "object" ) {
    window.MyModule  = MyModule;
}
else{
    global["MyModule"] = MyModule;    
} 

