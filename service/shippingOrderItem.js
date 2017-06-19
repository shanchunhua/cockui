var wxe = require('../utils/wxe.js')
module.exports = {
    getBoxOrders: function () {
        return wxe.requestP({
            url: 'shippingOrderItem', method: 'GET'
        });
    }
}