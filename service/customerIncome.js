var wxe = require('../utils/wxe.js');
module.exports = {
    loadMyIncome: function (customer) {
        return wxe.requestP({
            url: 'customerIncome/example',
            method: 'POST',
            data: {
                customer: { id: customer.id }
            }
        });
    }
}