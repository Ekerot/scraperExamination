'use strict';

/**
 * Created by ekerot on 2016-11-08.
 */

let fetchWeekdays = require('./fetch-free-weekend-days');
let fetchMovies = require('./fetch-movies');
let fetchURL = require('./html-promises');
let fetchDinnerSchedule = require('./login-promise')

fetchLinks('http://vhost3.lnu.se:20080/weekend');

function fetchLinks(link) {

    let promise1 = fetchURL.fetchingURLDir(link)
        .then(function (links) {

            return fetchURL.fetchingDotHTMLURLS(links)

        }).then(function (links) {

            return fetchWeekdays(links)

        }).catch(function (err) {
            console.error(err)
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

        })

        movies.forEach(function(movie){
         if(movie.status){
             notFullyBooked.push(movie)
         }
        });

        let validatedMovies = []

        notFullyBooked.forEach(function(movie) {
            values[2].forEach(function (dinner) {
                switch (movie.day) {
                    case '05':
                        if(dinner.slice(0, 3) === 'fri' && dinner.slice(3,5) - 2 == movie.time.slice(0,2)){
                            validatedMovies.push(movie)
                        }
                        break;
                    case '06':
                        if(dinner.slice(0, 3) === 'sat' && dinner.slice(3,5) - 2 == movie.time.slice(0,2)){
                            validatedMovies.push(movie)
                        }
                        break;
                    case '07':
                        if(dinner.slice(0, 3) === 'sun' && dinner.slice(3,5) - 2 == movie.time.slice(0,2)){
                            validatedMovies.push(movie)
                        }
                        break;
                }

            })
        })
        return validatedMovies

    }).then(function(validatedMovies){

        validatedMovies.forEach(function(movie) {

            if(movie.movie === '01') {
                switch (movie.day) {
                    case '05':
                        console.log('You guys can have your big day out on friday, you will see the movie "The Flying Deuces" at '
                            + movie.time + ' and your dinner starts at ' + (parseInt(movie.time) + 2) + ':00')
                        break;
                    case '06':
                        console.log('You guys can have your big day out on saturday, you will see the movie "The Flying Deuces" at '
                            + movie.time + ' and your dinner starts at ' + (parseInt(movie.time) + 2) + ':00')
                        break;
                    case '07':
                        console.log('You guys can have your big day out on sunday, you will see the movie "The Flying Deuces" at '
                            + movie.time + ' and your dinner starts at ' + (parseInt(movie.time) + 2) + ':00')
                        break;
                }
            }
            if(movie.movie === '02') {
                switch (movie.day) {
                    case '05':
                        console.log('You guys can have your big day out on friday, you will see the movie "Keep Your Seats, Please" at '
                            + movie.time + ' and your dinner starts at ' + (parseInt(movie.time) + 2) + ':00')
                        break;
                    case '06':
                        console.log('You guys can have your big day out on saturday, you will see the movie "Keep Your Seats, Please" at '
                            + movie.time + ' and your dinner starts at ' + (parseInt(movie.time) + 2) + ':00')
                        break;
                    case '07':
                        console.log('You guys can have your big day out on sunday, you will see the movie "Keep Your Seats, Please" at '
                            + movie.time + ' and your dinner starts at ' + (parseInt(movie.time) + 2) + ':00')
                        break;
                }
            }
            if(movie.movie === '03') {
                switch (movie.day) {
                    case '05':
                        console.log('You guys can have your big day out on friday, you will see the movie "A Day at the Races" at '
                            + movie.time + ' and your dinner starts at ' + (parseInt(movie.time) + 2) + ':00')
                        break;
                    case '06':
                        console.log('You guys can have your big day out on saturday, you will see the movie "A Day at the Races" at '
                            + movie.time + ' and your dinner starts at ' + (parseInt(movie.time) + 2) + ':00')
                        break;
                    case '07':
                        console.log('You guys can have your big day out on sunday, you will see the movie "A Day at the Races" at '
                            + movie.time + ' and your dinner starts at ' + (parseInt(movie.time) + 2) + ':00')
                        break;
                }
            }

        })
    })
}

module.exports.fetchLinks = fetchLinks;

