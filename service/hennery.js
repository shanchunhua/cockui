var wxe = require('../utils/wxe.js')
module.exports = {
    findAll: function () {
        return wxe.requestP({
            url: 'hennery/', method: 'GET'
        });
    },
    getById: function (id) {
        return wxe.requestP({
            url: 'hennery/' + id, method: 'GET'
        });
    }
};