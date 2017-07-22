var wxe = require('../utils/wxe.js')
module.exports = {
    loadCustomerBoxItems: function (customer) {
        console.log(customer);
        return wxe.requestP({
            url: 'customerBoxItem/example',
            method: 'POST',
            data: {
                customer: {id:customer.id}
            }
        });
    }
}