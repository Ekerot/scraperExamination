'use strict';

/**
 * Created by ekerot on 2016-11-12.
 */

let request = require('request');

module.exports = function(){

    return new Promise(function(resolve, reject) {

        let movie = '';
        let day = '';
        let storingMovieobjects = [];

        for(let j = 5; j <= 7; j += 1) {

            day = '0' + j

            for (let i = 1; i <= 3; i += 1) {

                movie = '0' + i;

                request.get('http://vhost3.lnu.se:20080/cinema/check?day=' + day + '&movie=' + movie,
                    function (error, response, body) {
                        if (error)
                            reject('ERROR: ' + error);
                        storingMovieobjects.push({movies: JSON.parse(body)});
                        if (storingMovieobjects.length === 9)
                            resolve(storingMovieobjects);
                    })
            }
        }
        })
};