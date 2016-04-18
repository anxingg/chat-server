var http = require('http');
var sockjs = require('sockjs');
var node_static = require('node-static');
var path = require("path");
var ProtoBuf = require("protobufjs");


// Initialize from .proto file
var builder = ProtoBuf.loadProtoFile(path.join(__dirname, "www", "chat.proto")),
    ChatMessage = builder.build("ChatMessage");
    
// 1. chatServer sockjs server
var chatServer_sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};

var chatServer_sockjs = sockjs.createServer(chatServer_sockjs_opts);
chatServer_sockjs.on('connection', function(conn) {
    conn.on('data', function(data) {
    try {
            // Decode the Message
            var msg = ChatMessage.decode64(data);
            console.log("Received: "+msg.msgContent);
            // Re-encode it and send it back
            conn.write(msg.encode64());
            console.log("Sent: "+msg.msgContent);
        } catch (err) {
            console.log("Processing failed:", err);
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
