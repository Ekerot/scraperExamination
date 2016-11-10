'use strict';

/**
 * Created by ekerot on 2016-11-08.
 */

let cheerio = require('cheerio');
let rp = require('request-promise');
let calendarScrap = require('./scrape-calendar');

let url = 'http://vhost3.lnu.se:20080/weekend';

scrapingDOM(url);

function scrapingDOM(url) {

    var options = {
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(function ($) {

            var hrefs = [];

            $('a').each(function (i) {
                    hrefs[i] = url.split('/w')[0] + $(this).attr('href');

            });
            return hrefs
        })
        .then(function (hrefs) {

            hrefs.forEach(function(link){

               if(link.includes('calendar') ) {
                   if (link.includes('.html')) {
                       calendarScrap.scrap(link)
                   }
                   else {
                       scrapingDOM(link);
                   console.log(link)
                   }
               }
                if(link.includes('cinema')){

                }
                if(link.includes('dinner')){
                }
            });
        })
        .catch(function (err) {
            console.log('ERROR: ' + err);
        });
}
