var wxe = require('../utils/wxe.js');
module.exports = {
    save: function (templateMessageFormId) {
        return wxe.requestP({
            url: 'templateMessageFormId',
            method: 'POST',
            data: templateMessageFormId
        });
    }
};