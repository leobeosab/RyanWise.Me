var http = require("http");
var express = require("express");
var app = express();
var path = require("path");

app.use(express.static("www/blog/"))

app.listen(80, function() {
  console.log("Now listening on port :80");
} );
