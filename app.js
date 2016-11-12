'use strict';

let scraper = require('./lib/scraper');
let test = require('./lib/checkFreeWeekendDay')

/**
 * Created by ekerot on 2016-11-08.
 */

let initialLinks = scraper.initialScrape('http://vhost3.lnu.se:20080/weekend');


