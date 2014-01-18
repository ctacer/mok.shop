var Utils = function() {

    /**
     * Gets current date and time and returns in format:
     * YYYY-DD-MM HH:MM:SS '2013-02-27 15:25:03'
     * @returns {string}
     */
    var getDateTime = function(date) {

        var hour = date.getHours();
        hour = (hour < 10 ? '0' : '') + hour;

        var min  = date.getMinutes();
        min = (min < 10 ? '0' : '') + min;

        var sec  = date.getSeconds();
        sec = (sec < 10 ? '0' : '') + sec;

        var year = date.getFullYear();

        var month = date.getMonth() + 1;
        month = (month < 10 ? '0' : '') + month;

        var day  = date.getDate();
        day = (day < 10 ? '0' : '') + day;

        return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;

    };

    var getCurrentDateTime = function(){
        return getDateTime(new Date());
    }

    var utils = {
        'getDateTime': getDateTime,
        'getCurrentDateTime': getCurrentDateTime
    };

    return utils;

}

module.exports = new Utils();
