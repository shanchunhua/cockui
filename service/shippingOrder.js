var wxe = require('../utils/wxe.js')
module.exports = {
    loadCustomerShippingOrders: function (customer) {
        console.log(customer);
        return wxe.requestP({
            url: 'shippingOrder/example',
            method: 'POST',
            data: {
                customer: {id:customer.id},
                goodsType: 'COCK',
                paid: true
            }
        });
    },
    loadCollectionOrder: function (customer) {
        return wxe.requestP({
            url: 'shippingOrder/example',
            method: 'POST',
            data: {
                customer: {id:customer.id},
                goodsType: 'SELECTION',
                paid: true
            }
        });
    },
    loadMarketOrder: function (customer) {
        return wxe.requestP({
            url: 'shippingOrder/example',
            method: 'POST',
            data: {
                customer: { id: customer.id },
                goodsType: 'MORNING_MARKET',
                paid: true
            }
        });
    },
    loadEggOrder: function (customer) {
        return wxe.requestP({
            url: 'shippingOrder/example',
            method: 'POST',
            data: {
                customer: { id: customer.id },
                goodsType: 'EGG',
                paid: true
            }
        });
    },
    create: function (order) {
        return wxe.requestP({
            url: 'shippingOrder',
            method: 'POST',
            data: order
        });
    },
    getById: function (id) {
        return wxe.requestP({
            url: 'shippingOrder/' + id, method: 'GET'
        });
    },
    getLastOrder: function () {
        return wxe.requestP({
            url: 'shippingOrder/lastOrder', method: 'GET'
        });
    }
};