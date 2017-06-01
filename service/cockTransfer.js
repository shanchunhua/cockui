var wxe = require('../utils/wxe.js')
module.exports = {
    loadCustomerTransferOrders: function (customer) {
        console.log(customer);
        return wxe.requestP({
            url: 'cockTransfer/example',
            method: 'POST',
            data: {
                customer: customer,
                orderNo:null
            }
        });
    }
}