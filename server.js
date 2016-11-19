/**
 * Created by ekerot on 2016-11-16.
 */

let express = require('express');
let startScraping = require('./lib/scraper');
let app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index')
})

app.get('/process_get', function (req, res) {

    response = {
        url:req.query.url
    };

    if(response) {
        console.log(startScraping(response));
    }

});

app.listen(4000, function () {
    console.log('There is magic going on on port 4000!')
});