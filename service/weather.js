var wxe = require('../utils/wxe.js');
module.exports = {
    get: function () {
        return wxe.requestP({
            url: 'http://static.huanlemujia.com/settings/weather.json',
            method: 'GET'
        });
    }
};