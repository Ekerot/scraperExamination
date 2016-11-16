'use strict';

/**
 * Created by ekerot on 2016-11-09.
 */

let cheerio = require('cheerio');
let rp = require('request-promise');
let confirmFreeDay = require('./checkFreeWeekendDay');

module.exports = function (links) {

    return new Promise(function(resolve, reject) {

        let weekend = {friday: '', saturday: '', sunday: ''};

        links.forEach(function(link){

            var options = {
                uri: link,
                transform: function (body) {
                    return cheerio.load(body);
                }
            };

            rp(options).then(function($) {

                $('td').each(function (i) {
                    switch (i) {
                        case 0:
                            weekend.friday = $(this).html();
                            break;
                        case 1:
                            weekend.saturday = $(this).html();
                            break;
                        case 2:
                            weekend.sunday = $(this).html();
                            break;
                    }
                });

            let day = confirmFreeDay(weekend);

            if (day.length > 0) {
                resolve(day);
            }
            })

        });
        if(!links){
            reject('ERROR: No input into function! Please do a input!')
        }
    });
};


