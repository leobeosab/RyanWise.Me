var http = require("http");
var express = require("express");
var app = express();
var path = require("path");
var routes = require("./routes")(app);

app.use('/img',express.static(path.join(__dirname, 'www/img')));
app.use('/js',express.static(path.join(__dirname, 'www/js')));
app.use('/style',express.static(path.join(__dirname, 'www/style')));

http.createServer(app).listen(80, function() {
  console.log("Server started");
});
