/**
 * The MessageHandler namespace.
 * @exports MessageHandler
 * @namespace MessageHandler
 * @expose
 */
var path = require("path");
var ProtoBuf = require("protobufjs");


// Initialize from .proto file
var builder = ProtoBuf.loadProtoFile(path.join(__dirname,"../www","chat.proto"));
var Message = builder.build("Message"),Request = builder.build("Request"),
    LoginRequest = builder.build("LoginRequest"),LoginResponse = builder.build("LoginResponse")
    ;

//protocol type constants
/**
 * @description message constants
 */
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

//base handler
var CMBaseHandler = {};
CMBaseHandler.type = CMConstants.UNKNOWN;
CMBaseHandler.handlers = {};

/**
 * @description process message
 * @param {Message} message
 * @example 
 */
CMBaseHandler.process = function(message){
    console.log("CMBaseHandler.process:"+message.toString());
}
CMBaseHandler.register = function(handler){
    console.log("CMBaseHandler.register:"+handler.type);
    this.handlers[handler.type]=handler;
}
CMBaseHandler.execute = function(message){
    var handler=this.handlers[message.type];
    console.log("CMBaseHandler.execute:"+handler.type);
    if(handler!=undefined){
        handler.process(message);
    }
}

//login request handler
var CMLoginRequestHandler = {};
CMLoginRequestHandler.prototype = CMBaseHandler;
CMLoginRequestHandler.process = function(message){
    console.log("CMLoginRequestHandler.process:"+message.toString());
}
CMLoginRequestHandler.type = CMConstants.LOGINREQUEST;

//login response handler
var CMLoginResponseHandler = {}
CMLoginResponseHandler.prototype = CMBaseHandler;
CMLoginResponseHandler.process = function(message){
    console.log("CMLoginResponseHandler.process:"+message.toString());
}
CMLoginResponseHandler.type = CMConstants.LOGINRESPONSE;

//register all handler
CMBaseHandler.register(CMBaseHandler);
CMBaseHandler.register(CMLoginRequestHandler);
CMBaseHandler.register(CMLoginResponseHandler);

//message create factory
var MessageFactory = {};

//message sequence global var
MessageFactory._sequence = 0;

//increment sequence
MessageFactory.incSequence = function(){
    this._sequence = this._sequence+1;
    return this._sequence;
}
//create login request message
MessageFactory.createLoginRequest = function(username,password){
    var message =new Message();
    var loginRequest = new LoginRequest();
    var request = new Request();
    request.loginRequest = loginRequest;
    loginRequest.username = username;
    loginRequest.password = password;
    message.type = CMConstants.LOGINREQUEST;
    message.sequence = this.incSequence();
    message.request = request;
    return message;
}
//create login response message
MessageFactory.createLoginResponse = function(sequence,result,errorDescription){
    var message =new Message();
    var loginResponse = new LoginResponse();
    var response = new Response();
    response.loginResponse = loginResponse;
    loginResponse.result = result;
    loginResponse.errorDescription = errorDescription;
    message.type = CMConstants.LOGINRESPONSE;
    message.sequence = sequence;
    message.request = request;
    return message;
}


//exports variable
exports.CMBaseHandler = CMBaseHandler;
exports.CMLoginRequestHandler = CMLoginRequestHandler;
exports.CMLoginResponseHandler = CMLoginResponseHandler;
exports.CMConstants = CMConstants;
exports.MessageFactory = MessageFactory;
