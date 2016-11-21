/**
 * Created by ekerot on 2016-11-16.
 */

/**
 * Server listening to port 4000. Middlewear connecting to pug-files and the model.
 */

let express = require('express');
let startScraping = require('./lib/scraper');
let app = express();
let favicon = require('serve-favicon');

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

//render html page

app.get('/', function (req, res) {
    res.render('index')
});

//getting and sending response and result to the .pug-file.

app.get('/process_get', function (req, res) {

    response = {
        url:req.query.url
    };
        startScraping(response).then(function (result) {
            res.render('index', {result})
        }).catch(function (error) {
            res.render('index', {error});
        })
});

//listens to port 4000

app.listen(4000, function () {
    console.log('There is magic going on on port 4000!')
});