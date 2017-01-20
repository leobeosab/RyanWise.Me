var http = require("http");
var express = require("express");
var app = express();
var path = require("path");
var routes = require("./routes")(app);

app.use('/img',express.static(path.join(__dirname, 'www/img')));
app.use('/js',express.static(path.join(__dirname, 'www/js')));
app.use('/style',express.static(path.join(__dirname, 'www/style')));
app.use('/include', express.static(path.join(__dirname, 'www/include')));
app.use('/blog', express.static(path.join(__dirname, 'www/blog')));


require('letsencrypt-express').create({

  server: 'staging'

, email: 'ryan.wise@wiseweb-design.com'

, agreeTos: true

, approveDomains: [ 'wiseweb-design.com' ]

, app: app

}).listen(80, 443);

