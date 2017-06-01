var wxe = require('../utils/wxe.js')
module.exports = {
    loadCustomerShippingOrders: function (customer) {
        console.log(customer);
        return wxe.requestP({
            url: 'shippingOrder/example',
            method: 'POST',
            data: {
                customer: customer,
                orderNo:null
            }
        });
    }
}