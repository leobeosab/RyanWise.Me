var http = require("http");
var express = require("express");
var connect = require("connect");
var app = express();
var path = require("path");
//var routes = require("./routes")(app);
var vhost = require("vhost");

function createVirtualHost(domain, dirPath) {
  return vhost(domain, express.static( dirPath ));
}


//Vhosts
var devHost = createVirtualHost("dev.ryanwise.me", "dev/www/");
var defaultHost = createVirtualHost("localhost", "www/");

app.use(devHost);
app.use(defaultHost);

app.listen(3000, function() {
  console.log("Now listening on port :80");
} );
