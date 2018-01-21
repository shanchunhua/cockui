var wxe = require('../utils/wxe.js')
module.exports = {
    loadCustomerProperty: function (id) {
        return wxe.requestP({
            url: 'customerProperty/' + id, method: 'GET'
        });
    },
    loadCockAdoptionOrderSummary: function () {
        return wxe.requestP({
            url: 'cockAdoptionOrder/index'
        });
    },
    connect: function (id, pid) {
        return wxe.requestP({
            url: 'customer/connect',
            data: {
                id: id,
                pid: pid
            }
        });
    },
    isSales: function (id) {
        return wxe.requestP({
            url: 'sales/eligible/' + id
        });
    },
    isPartner: function (id) {
        return wxe.requestP({
            url: 'partner/eligible/' + id
        });
    },
    friends: function () {
        return wxe.requestP({
            url: 'sales/friend',
            method:'POST'
        });
    },
    sales: function () {
        return wxe.requestP({
            url: 'partner/sales',
            method:'POST'
        });
    }
};