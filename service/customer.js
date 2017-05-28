var wxe = require('../utils/wxe.js')
module.exports = {
    loadCustomerProperty: function (id) {
        return wxe.requestP({
            url: 'customerProperty/'+id, method: 'GET'
        });
    }
}