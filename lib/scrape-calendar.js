'use strict';

/**
 * Created by ekerot on 2016-11-09.
 */

let cheerio = require('cheerio');
let rp = require('request-promise');
let confirmFreeDay = require('./checkFreeWeekendDay');

module.exports = function ($) {

            let weekend = {friday: '', saturday: '', sunday: ''};

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
                console.log(day)
                return day;
            }
            else {
                return null;
            }
};


