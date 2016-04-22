var ProtoBuf = require("protobufjs");

// Initialize from .proto file
var builder = ProtoBuf.loadProtoFile(path.join(__dirname,"../www","chat.proto"));
module["exports"] = builder;