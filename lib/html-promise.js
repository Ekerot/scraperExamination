let rp = require('request-promise');
let cheerio = require('cheerio');
let scrapecalendar = require('./scrape-calendar');

let promisecounter = 0;

module.exports.htmlpromise = function (links){
    return new Promise(function(resolve, reject){

            if (!links) {
                reject('ERROR: No input into function!');
            }
            else {

                    var options = {
                        uri: links[0],
                        transform: function (body) {
                            return cheerio.load(body);
                        }
                    };

                    rp(options)
                        .then(function fetch($) {

                            var hrefs = [];

                            $('a').each(function (i) {

                                hrefs[i] = links[0] + '/' + $(this).attr('href');

                                resolve(hrefs);
                            });

                        })
            }
    })
};
