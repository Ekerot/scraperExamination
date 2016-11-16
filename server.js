/**
 * Created by ekerot on 2016-11-16.
 */

var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('*', function(req, res){
    res.sendfile(__dirname + '/index.html');
});

app.listen(4000, function () {
    console.log('Example app listening on port 4000!')
});