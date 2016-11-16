'use strict';

/**
 * Created by ekerot on 2016-11-12.
 */

let xhrpromise = require('./ajax-promise');

module.exports = function(weekdays, link){

    console.log(link[1])

    return new Promise(function(resolve, reject) {

        let movie = '';
        let day = '';
        let storingMovieobjects = [];

        weekdays.forEach(function(day){

            switch(day){
                case 'friday':
                    day = '05'
                    break;
                case 'saturday':
                    day = '06';
                    break;
                case 'sunday':
                    day = '07';
                    break;
            }
            for(let i = 0; i <= 3; i += 1) {
                movie = '0' + i;
                xhrpromise( link[1] + '/check?day=' + day + '&movie=' + movie)
                    .then(function (response) {
                        storingMovieobjects.push(response);
                        if(i === 3)
                            console.log(storingMovieobjects)
                        resolve(storingMovieobjects);
                    })
            }

            if(!weekdays){
                reject('ERROR: Weekday is not defined!')
            }

        })
    })
};