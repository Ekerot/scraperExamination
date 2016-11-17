'use strict';

/**
 * Created by ekerot on 2016-11-08.
 */
let test = require('./lib/scraper');

let button = document.querySelector('.button');
let url = document.querySelector('#url');

button.addEventListener('click', function () {

    test.fetchLinks(url.value)
    console.log(url.value);

    })




