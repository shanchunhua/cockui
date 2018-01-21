var wxe = require('../utils/wxe.js');
module.exports = {
    pickHenneryToSteal: function (id) {
        return wxe.requestP({
            url: 'stealOrder/pick', method: 'GET'
        });
    },
    getById: function (id) {
        return wxe.requestP({
            url: 'stealOrder/' + id, method: 'GET'
        });
    },
    steal: function (id) {
        return wxe.requestP({
            url: 'stealOrder/steal/' + id
        });
    },
    unpaidOrder: function (id) {
        return wxe.requestP({
            url: 'stealOrder/unpaidOrder'
        });
    },
    loadStealingOrderToday: function () {
        return wxe.requestP({
            url: 'stealOrder/today',
            method: 'GET'
        });
    }
};