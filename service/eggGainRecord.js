var wxe = require('../utils/wxe.js')
module.exports = {
    loadCustomerEggGainRecords: function (customer) {
        console.log(customer);
        return wxe.requestP({
            url: 'eggGainRecord/example',
            method: 'POST',
            data: {
                customer: {id:customer.id}
            }
        });
    }
}