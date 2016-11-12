/**
 * Created by ekerot on 2016-11-11.
 */

let option = {
    uri: link,
    transform: function (body) {
        return cheerio.load(body);
    }
}

    .then(function ($) {
        let weekend = {friday: '', saturday: '', sunday: ''};

        $('td').each(function (i) {
            switch (i) {
                case 0:
                    weekend.friday = $(this).html();
                    break;
                case 1:
                    weekend.saturday = $(this).html();
                    break;
                case 2:
                    weekend.sunday = $(this).html();
                    break;
            }
        });

        let day = confirmFreeDay(weekend);

        if (day.length > 0) {
            console.log(day)
            return day;
        }
        else {
            console.log(day)
            return null;
        }
    }).catch(function (err) {
    console.error(err)
})

module.exports.scraper = sc
