var wxe = require('../utils/wxe.js')
module.exports = {
    findAll: function () {
        return wxe.requestP({
            url: 'hennery/', method: 'GET'
        });
    }
}