'use strict';

/**
 * Created by ekerot on 2016-11-09.
 */

let cheerio = require('cheerio');
let rp = require('request-promise');

/**
 * Crawls the web page(s), find and returns weekdays when all the three friends have free time.
 * Function is wrapped wih a promise.
 * @param links {Array.<string>}
 * @resolves {Promise.<string>}
 */

module.exports = function (links) {

    return new Promise(function(resolve, reject) {

        let weekend = {friday: '', saturday: '', sunday: ''};

        links.forEach(function(link){

            let options = {
                uri: link,
                transform: function (body) {
                    return cheerio.load(body);
                }
            };
            rp(options).then(function($) {

                $('td').each(function (i) {  // fetching the calender of each friend

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

                console.log(weekend)

                let days = confirmFreeDay(weekend);

                if (days.length > 0) {
                    resolve(days);
                }
            })

        });

        if(!links){
            reject('ERROR: No input into function! Please do a input!');
        }
    });
};


/**
 * Checking for days when all three friends have free time.
 * @param  schedules {Object}
 * @return daysThatWorks {Array.<string>}
 */

let array = [];

function confirmFreeDay(schedules){  //this function is quite self explaining

    let daysThatWorks = [];

    array.push(schedules);

    if (array.length === 3) {

        if (array[0].friday && array[1].friday && array[2].friday) {
            daysThatWorks.push('friday');
        }

        else if (array[0].saturday && array[1].saturday && array[2].saturday) {
            daysThatWorks.push('saturday');
        }

        else if (array[0].sunday && array[1].sunday && array[2].sunday) {
            daysThatWorks.push('sunday');

        }
    }

    return daysThatWorks;

};


