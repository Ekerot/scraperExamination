'use strict';

/**
 * Created by ekerot on 2016-11-13.
 */

var request = require("request");

request({
    method: 'POST',
    url: 'http://vhost3.lnu.se:20080/dinner/login',
    followRedirect: true,
    jar: true,
    headers: {
        'cache-control': 'no-cache',
        authorization: 'Basic emVrZTpjb3lz',
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {username: 'zeke', password: 'coys'}},
    function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log(body, response.statusCode);
            request({
                method: 'GET',
                url: 'http://vhost3.lnu.se:20080/dinner/' + response.headers.location,
                    headers:
                    { 'cache-control': 'no-cache',
                        authorization: 'Basic emVrZTpjb3lz' },
                    form: { username: 'zeke', password: 'coys', '': '' }},

                function (error, response, html) {
                console.log(html, response.statusCode);

        })
    }
})








