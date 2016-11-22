'use strict';

let rp = require('request-promise');
let cheerio = require('cheerio');

/**
 * Crawls the web page(s), find and returns .html files containing the schedules for all the three friends.
 * Function is wrapped with a request-promise.
 * @param links {Array.<string>}
 * @resolves hrefs {Promise.<string>}
 */

module.exports.fetchingDotHTMLURLS = function (links){


    let options = {
        uri: links[0],
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    return rp(options)
        .then(function ($) {

            let hrefs = [];

            $('a').each(function (i) {

                hrefs[i] = links[0] + '/' + $(this).attr('href'); // saving the href values in an array

            });
            return hrefs;
        })
    if(!link){
        console.log('ERROR: No or invalid input url!');

    }
};

/**
 * Crawls the web page, find and returns direction of next web page.
 * Function is wrapped with a request-promise.
 * @param link {String}
 * @return hrefs {Promise.<string>}
 */

module.exports.fetchingURLDir = function(link) {

    let options = {
        uri: link,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    return rp(options)
        .then(function ($) {

            let hrefs = [];

            $('a').each(function (i) {
                hrefs[i] = link.split('0/')[0] + '0' + $(this).attr('href'); // saving href values(directions) in array

            });

            return hrefs;

        });

    if(!link){
        console.log('ERROR: No or invalid input url!');

    }
};
