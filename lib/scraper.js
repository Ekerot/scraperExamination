'use strict';

/**
 * Created by ekerot on 2016-11-08.
 */

let cheerio = require('cheerio');
let rp = require('request-promise');
let confirmFreeDay = require('./checkFreeWeekendDay');
let co = require('co');
let xhrpromise = require('./ajax-promise');
let scrapecalendar = require('./scrape-calendar')

fetchLinks('http://vhost3.lnu.se:20080/weekend');

function fetchLinks(link) {

    var options = {
        uri: link,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(function fetch($) {

            var hrefs = [];

            $('a').each(function (i) {

                if ($(this).attr('href').includes('.html')) {

                    hrefs[i] = link + '/' + $(this).attr('href');
                }
                else {
                    hrefs[i] = link.split('0/')[0] + '0' + $(this).attr('href');
                }
            });
            return hrefs;
        })
        .then(function (hrefs) {
                hrefs.forEach(function (link) {

                    if (link.includes('calendar')) {
                        if (link.includes('.html')) {

                            var options = {
                                uri: link,
                                transform: function (body) {
                                    return cheerio.load(body);
                                }
                            };

                            rp(options)
                                .then(function ($) {
                                        scrapecalendar($)
                                });
                        }else {
                            fetchLinks(link)
                        }
                    }

                    if (link.includes('cinema')) {
                        xhrpromise(link + '/check?day=05&movie=02')
                            .then(function(response){

                            })


                    }
                    if (link.includes('dinner')) {

                    }

            })
            }).catch(function (err) {
        console.error(err)
        });
}

module.exports.initialScrape = fetchLinks;

