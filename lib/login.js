'use strict';

/**
 * Created by ekerot on 2016-11-13.
 */

let cheerio = require('cheerio');
var request = require("request");

/**
 * PRG-pattern function for retrieving authorization and login @/dinner/login/booking
 */


module.exports = function() {

    return new Promise(function(resolve, reject) {

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
                form: {username: 'zeke', password: 'coys'}
            },
            function (error, response, body) {
                if (error) {
                    reject(error);
                } else {

                    request({
                            method: 'GET',
                            url: 'http://vhost3.lnu.se:20080/dinner/' + response.headers.location,
                            jar: true,
                            headers: {
                                authorization: 'Basic emVrZTpjb3lz',
                                secure: 'HttpOnly'
                            },
                            form: {username: 'zeke', password: 'coys'}
                        },

                        function (error, response, html) {

                            if (error) {
                                reject(error);
                            }

                            let inputs = []

                            let $ = cheerio.load(html);
                            $('input').each(function (){
                                inputs.push($(this).attr('value'))
                            });
                            inputs.pop();
                            resolve(inputs)
                        })
                }
            })
    })
};









