'use strict';
/**
 * Created by ekerot on 2016-11-12.
 */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = function (url) {

    return new Promise(function (resolve, reject) {

        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = function() {
            if (request.status === 200) {
                if(request.responseText === '[]'){

                }
                else {
                    resolve(request.responseText);
                }
            } else {
                reject(Error('Error code:' + request.statusCode));
            }
        };
        request.send();
    });
};

