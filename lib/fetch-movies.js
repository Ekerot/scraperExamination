'use strict';

/**
 * Created by ekerot on 2016-11-12.
 */

let request = require('request');

/**
 * Requesting ajax call to fetch values for all the movies shown that week.
 * Function is wrapped wih a promise.
 * @resolves storingMovieObjects {Promise.<objects>}
 */

module.exports = function(){

    return new Promise(function(resolve, reject) {

        let movie = '';
        let day = '';
        let storingMovieObjects = [];

        for(let j = 5; j <= 7; j += 1) {

            day = '0' + j

            for (let i = 1; i <= 3; i += 1) {

                movie = '0' + i;

                request.get('http://vhost3.lnu.se:20080/cinema/check?day=' + day + '&movie=' + movie,

                    function (error, response, body) {

                        if (error)
                            reject('ERROR: ' + error);

                        storingMovieObjects.push({movies: JSON.parse(body)});

                        if (storingMovieObjects.length === 9)
                            resolve(storingMovieObjects);

                    })
            }
        }
    })
};