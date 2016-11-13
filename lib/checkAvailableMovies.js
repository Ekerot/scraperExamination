'use strict';

/**
 * Created by ekerot on 2016-11-12.
 */

let xhrpromise = require('./ajax-promise');

module.exports = function(weekdays){

    return new Promise(function(resolve, reject) {
        console.log(weekdays)
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
                xhrpromise('http://vhost3.lnu.se:20080/cinema/check?day=' + day + '&movie=' + movie)
                    .then(function (response) {
                        storingMovieobjects.push(response);
                        if(i === 3)
                        resolve(storingMovieobjects);
                    })
            }

            if(!weekdays){
                console.log('ERROR: Weekday is not defined!')
            }

        })
    })
}