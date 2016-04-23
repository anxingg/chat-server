/**
 * The MessageHandler namespace.
 * @exports MessageHandler
 * @namespace MessageHandler
 * @expose
 */

var Message ,Request,Response,
    LoginRequest,LoginResponse;
var init = function (ProtoBuf,path){
    // Initialize from .proto file
    var builder = ProtoBuf.loadProtoFile(path);

    Message = builder.build("Message");
    Request = builder.build("Request");
    Response =builder.build("Response");
    LoginRequest = builder.build("LoginRequest");
    LoginResponse = builder.build("LoginResponse");
    //register all handler
    CMBaseHandler.register(CMBaseHandler);
    CMBaseHandler.register(CMLoginRequestHandler);
    CMBaseHandler.register(CMLoginResponseHandler);
}

/**
 * @description encode message
 * @param {Message} message
 * @return {string}
 */
var encode = function(message){
    return message.encode64();
}

/**
 * @description decode message
 * @param {string} data
 * @return {Message}
 */
var decode = function(data){
    return Message.decode64(data);
}

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
CMBaseHandler.process = function(con,message){
    console.log("CMBaseHandler.process:"+message.type);
}
CMBaseHandler.register = function(handler){
    this.handlers[handler.type]=handler;
}
CMBaseHandler.execute = function(con,message){
    console.log("CMBaseHandler.execute:message= "+message);
    var handler=this.handlers[message.type];
    console.log("CMBaseHandler.execute:handler= "+handler.type);
    if(handler!=undefined){
        return handler.process(con,message);
    }
    else
        return undefined;
}

//login request handler
var CMLoginRequestHandler = {};
CMLoginRequestHandler.process = function(con,message){
    console.log("CMLoginRequestHandler.process:"+message.type);
    return undefined;
}
CMLoginRequestHandler.type = CMConstants.LOGINREQUEST;

//login response handler
var CMLoginResponseHandler = {}
CMLoginResponseHandler.process = function(con,message){
    console.log("CMLoginResponseHandler.process:"+message.type);
    return undefined;
}
CMLoginResponseHandler.type = CMConstants.LOGINRESPONSE;

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
MessageFactory.createLoginRequest = function(userid,username,password){
    var message =new Message();
    var loginRequest = new LoginRequest();
    var request = new Request();
    request.loginRequest = loginRequest;
    loginRequest.userid = userid;
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
    message.response = response;
    return message;
}

var MessageHandler = {
    init : init,
    encode : encode,
    decode : decode,
    execute : function(con,message){
        return CMBaseHandler.execute(con,message);
    },
    CMLoginRequestHandler : CMLoginRequestHandler,
    CMLoginResponseHandler : CMLoginResponseHandler,
    CMConstants : CMConstants,
    MessageFactory : MessageFactory
};

if (typeof define === 'function' && define["amd"]){
    define([], function () { return MessageHandler; } );
}  
else if (typeof require === "function" && typeof module === "object" && module && module["exports"]){
    module.exports = MessageHandler;
} 
else if ( typeof window === "object" && typeof window.document === "object" ) {
    window.MessageHandler  = MessageHandler;
}
else{
    global["MessageHandler"] = MessageHandler;    
} 
