'use strict';

/**
 * Created by ekerot on 2016-11-13.
 */

let cheerio = require('cheerio');
let rp = require('request-promise');

module.exports = function(link) {
    return new Promise(function(resolve, reject) {

        var options = {
            uri: link,
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        rp(options)
            .then(function ($) {

                var hrefs = [];

                $('a').each(function (i) {

                    hrefs[i] = link.split('0/')[0] + '0' + $(this).attr('href');
                });
                resolve(hrefs);
            })

        if(!link){
            reject('ERROR: No input url!')
        }

    })

};
