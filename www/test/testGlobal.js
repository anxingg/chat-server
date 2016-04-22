/*
if (typeof dcodeIO === 'undefined' || !dcodeIO.ProtoBuf) {
            throw(new Error("ProtoBuf.js is not present. Please see www/index.html for manual setup instructions."));
        }
// Initialize ProtoBuf.js
var ProtoBuf = dcodeIO.ProtoBuf;
var builder = ProtoBuf.loadProtoFile('./chat.proto');
*/
require(['MyModule'], function (myModule){
　   myModule.DemoFun();
     console.log(myModule.CMConstants.UNKNOWN);
});