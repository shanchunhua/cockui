var wxe = require('../utils/wxe.js');
module.exports = {
    load: function () {
        return wxe.requestP({
            url: 'systemSetting', method: 'GET'
        });
    }
}