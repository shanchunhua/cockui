var wxe = require('../utils/wxe.js')
module.exports = {
    save: function (order) {
        return wxe.requestP({
            url: 'henRentOrder/', method: 'POST',
            data: order
        });
    },
    loadCockAdoptionOrderSummary: function () {
        return wxe.requestP({
            url: 'henRentOrder/index'
        });
    }
}