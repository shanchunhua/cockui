var wxe = require('../utils/wxe.js');
module.exports = {
    loadHenneryBatch: function (id) {
        return wxe.requestP({
            url: 'henneryRaisingBatch/hennery/'+id, method: 'GET'
        });
    }
    
};