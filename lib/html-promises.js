'use strict';

let rp = require('request-promise');
let cheerio = require('cheerio');

/**
 * Crawls the web page(s), find and returns .html files containing the schedules for all the three friends.
 * Function is wrapped with a promise.
 * @param links {Array.<string>}
 * @resolves hrefs {Promise.<string>}
 */

module.exports.fetchingDotHTMLURLS = function (links){

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

                        hrefs[i] = links[0] + '/' + $(this).attr('href'); // saving the href values in an array

                    });
                    resolve(hrefs);
                })
        }
    })
};

/**
 * Crawls the web page, find and returns direction of next web page.
 * Function is wrapped with a promise.
 * @param link {String}
 * @resolves hrefs {Promise.<string>}
 */

module.exports.fetchingURLDir = function(link) {
    return new Promise(function(resolve, reject) {

        let options = {
            uri: link,
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        rp(options)
            .then(function ($) {

                let hrefs = [];

                $('a').each(function (i) {

                    hrefs[i] = link.split('0/')[0] + '0' + $(this).attr('href'); // saving href values(directions) in array

                });

                resolve(hrefs);

            });

        if(!link){
            reject('ERROR: No input url!')

        }

    })

};
