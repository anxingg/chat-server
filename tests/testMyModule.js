var node_static = require('node-static');
var path = require("path");
var ProtoBuf = require("protobufjs");
var myModule = require("../src/MyModule");
//var messageHandler =require("../server/MessageHandler");


// Initialize from .proto file
var builder = ProtoBuf.loadProtoFile(path.join(__dirname,"../www","chat.proto"));

myModule.DemoFun();
myModule.CMConstants.print();
console.log(myModule.CMConstants.UNKNOWN);