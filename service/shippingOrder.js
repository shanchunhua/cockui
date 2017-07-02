var wxe = require('../utils/wxe.js')
module.exports = {
    loadCustomerShippingOrders: function (customer) {
        console.log(customer);
        return wxe.requestP({
            url: 'shippingOrder/example',
            method: 'POST',
            data: {
                customer: customer,
                orderNo: null
            }
        });
    },
    loadCollectionOrder: function (customer) {
        return wxe.requestP({
            url: 'shippingOrder/example',
            method: 'POST',
            data: {
                customer: customer,
                goodsType: 'SELECTION',
                paid:true
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
                orderNo: null
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
                orderNo: null
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