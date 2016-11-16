'use strict';

/**
 * Created by ekerot on 2016-11-08.
 */

let scrapecalendar = require('./fetch-free-weekend-days');
let availableMovies = require('./checkAvailableMovies');
let sortHTML= require('./html-promise');
let initialhtml = require('./initialhtml-promise');
let loginAndFetchingHTML = require('./login')

fetchLinks('http://vhost3.lnu.se:20080/weekend');

function fetchLinks(link) {

    let promise1 = initialhtml(link)
        .then(function (links) {

            return sortHTML.htmlpromise(links)

        }).then(function (links) {

            return scrapecalendar(links)

        }).catch(function (err) {
            console.error(err)
        });

    let promise2 = availableMovies();

    let promise3 = loginAndFetchingHTML()

    Promise.all([promise1, promise2, promise3]).then(function(values){

    })

}

module.exports.initialScrape = fetchLinks;

