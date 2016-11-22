'use strict';

/**
 * Created by ekerot on 2016-11-19.
 */

let result = [];
let rp = require('request-promise');
let cheerio = require('cheerio');

/**
 * Returning a nice presentation of the result
 * Function is wrapped wih a request-promise.
 * @param validatedMovies {Array.<objects>}
 * @return {Promise.<string>}
 */

module.exports = function (validatedMovies){

    let options = {
        uri: 'http://vhost3.lnu.se:20080/cinema/',
        transform: function (body) {
            return cheerio.load(body);
        }
    };


    return rp(options).then(function ($) {

        validatedMovies.forEach(function (movie) {  //present the results in a nice way.
                                                    //movie titles needs to be dynamic

            let film = '';
            let day = '';

            if (movie.movie === '01') {
                film = $('option')[5].childNodes[0].data
            }

            if (movie.movie === '02') {
                film = $('option')[6].childNodes[0].data
            }

            if (movie.movie === '03') {
                film = $('option')[7].childNodes[0].data
            }

            if (movie.day === '05') {
                day = 'friday'
            }

            if (movie.dayday === '06') {
                day = 'saturday'
            }

            if (movie.day === '07') {
                day = 'sunday'
            }

            result.push({    //push each into an array
                movie: 'You guys can have your big day out on ' + day + ', you will see the movie ' + film + ' at '
                + movie.time + ' and your dinner starts at ' + (parseInt(movie.time) + 2) + ':00'
            })

        });

        return result;
    });
};
