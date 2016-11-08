var http = require
var express = require("express");
var app = express();
var routes = require("./routes")(app);

http.createServer(app).listen(80, function() {
  console.log("Server started");
});
