var wxe = require('../utils/wxe.js');
module.exports = {
    loadAdoptionRaisingRecords: function (id) {
        return wxe.requestP({
            url: 'raisingRecord/adoption/' + id, method: 'GET'
        });
    }
};