chat-server :在线客服聊天服务端
========================

To run this application, first install dependencies:

    npm install

And run a server:

    node server.js


That will spawn an http server at http://127.0.0.1:9999/ which will
serve both html (served from the current directory) and also SockJS
server (under the [/chatServer](http://127.0.0.1:9999/chatServer) path).
