/**
 * Created by ekerot on 2016-11-16.
 */

let express = require('express');
let app = express();

app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
    res.send('Got a POST request')
})

app.listen(4000, function () {
    console.log('There is magic going on on port 4000!')
})