var wxe = require('../utils/wxe.js');
module.exports = {
    loadMyWithdrawRecord: function (customer) {
        return wxe.requestP({
            url: 'withdrawRecord/example',
            method: 'POST',
            data: {
                customer: { id: customer.id }
            }
        });
    }, create: function (record) {
        return wxe.requestP({
            url: 'withdrawRecord',
            method: 'POST',
            data: record
        });
    }
};