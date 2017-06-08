var wxe = require('../utils/wxe.js')
module.exports = {
    pickHenneryToSteal: function (id) {
        return wxe.requestP({
            url: 'stealOrder/pick', method: 'GET'
        });
    },
    steal: function () {
        return wxe.requestP({
            url: 'stealOrder/steal'
        });
    }
}