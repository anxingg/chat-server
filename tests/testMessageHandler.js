var node_static = require('node-static');
var path = require("path");
var ProtoBuf = require("protobufjs");
var messageHandler =require("../src/MessageHandler");


// Initialize from .proto file
/*
var builder = ProtoBuf.loadProtoFile(path.join(__dirname,"../www","chat.proto"));
var Message = builder.build("Message");
*/
messageHandler.init(ProtoBuf,path.join(__dirname,"../www","chat.proto"));
var message=messageHandler.MessageFactory.createLoginRequest("anxingg","123456");
messageHandler.CMBaseHandler.execute(message);

/*
console.log("begin encode64.........................");
var strBase64 = message.encode64();
console.log("after encode64 is "+strBase64);
var messageDecode = message.decode64(strBase64);
console.log("end  encode64.........................");
messageHandler.CMBaseHandler.execute(message);
*/

