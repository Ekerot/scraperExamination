'use strict';

/**
 * Created by ekerot on 2016-11-12.
 */

let request = require('request');

module.exports = function(){

    return new Promise(function(resolve, reject) {

        let movie = '';
        let day = '';
        let storingMovieobjects;

            for(let i = 1; i <= 3; i += 1) {
                storingMovieobjects = [];
                movie = '0' + i;
                day = '0' + (i + 4);
                request.get('http://vhost3.lnu.se:20080/cinema/check?day=' + day + '&movie=' + movie,
                    function (error, response, body) {
                        if(error)
                            reject('ERROR: ' + error)
                        storingMovieobjects.push(body);
                        if(i === 3)
                        resolve(storingMovieobjects);
                    })
            }
        })
};