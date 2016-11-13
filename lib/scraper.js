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

    initialhtml(link)
        .then(function (links) {

            return sortHTML.htmlpromise(links)

        }).then(function (links) {

            return scrapecalendar(links)

        }).then(function (weekdays) {

            let promise1 =  availableMovies(weekdays, link);



        }).catch(function (err) {
            console.error(err)
    });

}


module.exports.initialScrape = fetchLinks;

