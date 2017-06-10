var wxe = require('../utils/wxe.js')
module.exports = {
    loadCustomerAdoptionOrders: function (customer) {
        console.log(customer);
        return wxe.requestP({
            url: 'cockAdoptionOrder/example',
            method: 'POST',
            data: {
                customer: customer,
                orderNo: null
            }
        });
    },
    create: function (order) {
        return wxe.requestP({
            url: 'cockAdoptionOrder',
            method: 'POST',
            data: order
        });
    },
    getById: function (id) {
        return wxe.requestP({
            url: 'cockAdoptionOrder/' + id, method: 'GET'
        });
    },
    getMyRaisingOrdersByHennery: function (id) {
        return wxe.requestP({
            url: 'cockAdoptionOrder/hennery/' + id, method: 'GET'
        });
    }
};