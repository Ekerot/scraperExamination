'use strict';

/**
 * Created by ekerot on 2016-11-08.
 */

let cheerio = require('cheerio');
let scrapecalendar = require('./scrape-calendar');
let availableMovies = require('./checkAvailableMovies');
let sortHTML= require('./html-promise');
let initialhtml = require('./initialhtml-promise');

fetchLinks('http://vhost3.lnu.se:20080/weekend');

function fetchLinks(link) {

    let promise1 = initialhtml(link)
        .then(function (links) {

            return sortHTML.htmlpromise(links)

        }).then(function (links) {

            return scrapecalendar(links)

        }).then(function (weekdays) {

            return availableMovies(weekdays, link);

        }).catch(function (err) {
            console.error(err)
        });

    let promise2 = initialhtml(link)
        .then(function (links) {
            promise1.then(function (weekdays) {
                return availableMovies(weekdays, links);
            })
        }).catch(function (err) {
            console.error(err)
        });


}

module.exports.initialScrape = fetchLinks;

