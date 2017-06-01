var wxe = require('../utils/wxe.js')
module.exports = {
    loadCustomerAdoptionOrders: function (customer) {
        console.log(customer);
        return wxe.requestP({
            url: 'cockAdoptionOrder/example',
            method: 'POST',
            data: {
                customer: customer,
                orderNo:null
            }
        });
    }
}