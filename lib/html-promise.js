let rp = require('request-promise');
let cheerio = require('cheerio');

module.exports.htmlpromise = function (links){

    return new Promise(function(resolve, reject){

            if (!links) {
                reject('ERROR: No input into function!');
            }
            else {

                    let options = {
                        uri: links[0],
                        transform: function (body) {
                            return cheerio.load(body);
                        }
                    };

                    rp(options)
                        .then(function ($) {

                            let hrefs = [];

                            $('a').each(function (i) {

                                hrefs[i] = links[0] + '/' + $(this).attr('href');

                                resolve(hrefs);
                            });

                        })
            }
    })
};
