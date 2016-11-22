'use strict';

/**
 * Created by ekerot on 2016-11-13.
 */

let cheerio = require('cheerio');
let request = require("request");

/**
 * Login in to the booking dinner url.
 * Function is wrapped wih a promise.
 * @resolves inputs{Promise.<string>}
 */


module.exports = function() {

    return new Promise(function(resolve, reject) {

        request({
                method: 'POST',  // post the request
                url: 'http://vhost3.lnu.se:20080/dinner/login',
                followRedirect: true,
                jar: true,   //important to remember cookies
                headers: {
                    'cache-control': 'no-cache',
                    authorization: 'Basic emVrZTpjb3lz',
                    'content-type': 'application/x-www-form-urlencoded',
                },
                form: {username: 'zeke', password: 'coys'}
            },
            function (error, response) {
                if (error) {
                    reject(error);
                } else {

                    request({   // request for booking site
                            method: 'GET',
                            url: 'http://vhost3.lnu.se:20080/dinner/' + response.headers.location, //location fetched from the header
                            jar: true,    //important to remember cookies
                            headers: {
                                authorization: 'Basic emVrZTpjb3lz',
                                secure: 'HttpOnly'
                            },
                            form: {username: 'zeke', password: 'coys'}
                        },

                        function (error, response, html) {  //fetch the value of the inputs

                            if (error) {
                                reject(error);
                            }

                            let inputs = []

                            let $ = cheerio.load(html);
                            $('input').each(function (){
                                inputs.push($(this).attr('value')) //fetching the values from input
                            });
                            inputs.pop();
                            resolve(inputs)
                        })
                }

                if(error){
                    reject(error);
                }
            })
    })
};









