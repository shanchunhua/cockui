var wxe = require('../utils/wxe.js');
module.exports = {
    load: function (customer) {
        console.log(customer);
        return wxe.requestP({
            url: 'expiredRecord/example',
            method: 'POST',
            data: {
                customer: { id: customer.id }
            }
        });
    }
};