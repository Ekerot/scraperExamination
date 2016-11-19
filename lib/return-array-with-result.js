'use strict';

/**
 * Created by ekerot on 2016-11-19.
 */

let result = [];

module.exports = function (validatedMovies){

    validatedMovies.forEach(function(movie) {

        let film = '';
        let day = '';

        if(movie.movie === '01') {
            film = "The Flying Deuces"
        }

        if(movie.movie === '02'){
            film = "Keep Your Seats, Please"
        }

        if(movie.movie === '03'){
            film = "A Day at the Races"
        }

        if(movie.day === '05'){
            day = 'friday'
        }

        if(movie.dayday === '06'){
            day = 'saturday'
        }

        if(movie.day === '07'){
            day = 'sunday'
        }

        result.push({movie: 'You guys can have your big day out on ' + day + ', you will see the movie ' + film + ' at '
            + movie.time + ' and your dinner starts at ' + (parseInt(movie.time) + 2) + ':00'})

    });
    return result;
};
