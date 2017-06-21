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
    },
    loadMyOrders: function (customer) {
        return wxe.requestP({
            url: 'henRentOrder/example',
            method: 'POST',
            data: {
                customer: { id: customer.id }
            }
        });
    }
};