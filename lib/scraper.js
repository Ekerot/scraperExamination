'use strict';

/**
 * Created by ekerot on 2016-11-08.
 */

let fetchWeekdays = require('./fetch-free-weekend-days');
let fetchMovies = require('./fetch-movies');
let fetchURL = require('./html-promises');
let fetchDinnerSchedule = require('./login-promise')
let returnArrayWithResult = require('./return-array-with-result')

module.exports = function (link) {

    if(!link.url.includes('http://')){
        link.url = 'http://' + link.url;
    }

    return new Promise(function(resolve, reject){

        if(!link){
            reject('ERROR: No input to function!')
        }

    let promise1 = fetchURL.fetchingURLDir(link.url)
        .then(function (links) {

            return fetchURL.fetchingDotHTMLURLS(links);

        }).then(function (links) {

            return fetchWeekdays(links);

        }).catch(function (err) {
            console.error(err);
        });

    let promise2 = fetchMovies();

    let promise3 = fetchDinnerSchedule();

    Promise.all([promise1, promise2, promise3]).then(function(values){

        let movies = [];
        let notFullyBooked = [];

        values[0].forEach(function(weekday) {

            switch (weekday) {
                case 'friday':
                    values[1].forEach(function(movie){
                        for(let i = 0; i < 3; i+=1)
                        if(movie.movies[i].day === '05')

                        movies.push(movie.movies[i])
                    });
                    break;
                case 'saturday':
                    values[1].forEach(function(movie){
                        for(let j = 0; j < 3; j+=1)
                            if(movie.movies[j].day === '06')

                        movies.push(movie.movies[j])
                    });
                    break;
                case 'sunday':
                    values[1].forEach(function(movie){
                        for(let k = 0; k < 3; k+=1)
                            if(movie.movies[k].day === '07')

                        movies.push(movie.movies[k])
                    });
                    break;
            }
        });

        movies.forEach(function(movie){
         if(movie.status){
             notFullyBooked.push(movie)
         }
        });

        let validatedMovies = [];

        notFullyBooked.forEach(function(movie) {
            values[2].forEach(function (dinner) {
                switch (movie.day) {
                    case '05':
                        if(dinner.slice(0, 3) === 'fri' && dinner.slice(3,5) - 2 == movie.time.slice(0,2)){
                            validatedMovies.push(movie);
                        }
                        break;
                    case '06':
                        if(dinner.slice(0, 3) === 'sat' && dinner.slice(3,5) - 2 == movie.time.slice(0,2)){
                            validatedMovies.push(movie);
                        }
                        break;
                    case '07':
                        if(dinner.slice(0, 3) === 'sun' && dinner.slice(3,5) - 2 == movie.time.slice(0,2)){
                            validatedMovies.push(movie);
                        }
                        break;
                }

            })
        });
        return validatedMovies

    }).then(function(validatedMovies){

            resolve(returnArrayWithResult(validatedMovies));

        });
    }).catch(function(error){
        console.error('ERROR: ', error);
    })
};


