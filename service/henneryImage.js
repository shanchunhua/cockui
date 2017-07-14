var wxe = require('../utils/wxe.js');
module.exports = {
    findByHennery: function (id) {
        return wxe.requestP({
            url: 'henneryImage/example', method: 'POST',
            data: {
                hennery: { id: id }
            }
        });
    }
};