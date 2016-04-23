var http = require('http');
var sockjs = require('sockjs');
var node_static = require('node-static');
var path = require("path");
var ProtoBuf = require("protobufjs");
var messageHandler = require("./src/MessageHandler");
var serverTalk = require("./src/ServerTalk");
// Initialize from .proto file

messageHandler.init(ProtoBuf,path.join(__dirname,"www","chat.proto"));
messageHandler.CMLoginRequestHandler.process = serverTalk.onLogin;
// 1. chatServer sockjs server
var chatServer_sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};

var chatServer_sockjs = sockjs.createServer(chatServer_sockjs_opts);
chatServer_sockjs.on('connection', function(conn) {
    conn.on('data', function(data) {
    try {
            // Decode the Message
            var msg = messageHandler.decode(data);
            console.log("Received: "+msg.type);
            var response = messageHandler.execute(conn,msg);
            if(response!=null){
                conn.write(messageHandler.encode(response));  
                console.log("Sent: "+response.type);  
            }
        } catch (err) {
            console.log("Processing failed:", err.message);
            throw err;
        }
    });
});

// 2. Static files server
var static_directory = new node_static.Server(path.join(__dirname, "www"));

// 3. Usual http stuff
var server = http.createServer();
server.addListener('request', function(req, res) {
    static_directory.serve(req, res);
});
server.addListener('upgrade', function(req,res){
    res.end();
});

chatServer_sockjs.installHandlers(server, {prefix:'/chatServer'});

console.log(' [*] Listening on 0.0.0.0:9999' );
server.listen(9999, '0.0.0.0');

console.log("chat server start ok :"+new Date());