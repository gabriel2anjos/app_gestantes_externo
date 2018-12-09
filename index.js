var express = require('express');
var router = express.Router();
var app = express();
var db = require('./queries');


app.get('/api/gestantes', db.getAllGestantes);


var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })