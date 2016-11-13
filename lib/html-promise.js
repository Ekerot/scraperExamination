let rp = require('request-promise');
let cheerio = require('cheerio');
let scrapecalendar = require('./scrape-calendar');

let promisecounter = 0;

module.exports.htmlpromise = function htmlpromise(links){
    return new Promise(function(resolve, reject){
            console.log(links)

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

                            });

                            if (hrefs < 3) {
                                htmlpromise(url)

                            }
                            else {
                                resolve(hrefs);
                            }

                        })
            }
    })
};
