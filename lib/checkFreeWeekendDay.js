'use strict';

/**
 * Created by ekerot on 2016-11-10.
 */

let array = [];

module.exports = function(weekend){

            let daysThatWorks = [];

                array.push(weekend);

                if (array.length === 3) {
                    if (array[0].friday && array[1].friday && array[2].friday) {
                        daysThatWorks.push('friday')
                    }
                    else if (array[0].saturday && array[1].saturday && array[2].saturday) {
                        daysThatWorks.push('saturday')
                    }
                    else if (array[0].sunday && array[1].sunday && array[2].sunday) {
                        daysThatWorks.push('sunday')
                    }
                }

                return daysThatWorks
};