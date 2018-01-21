var wxe = require('../utils/wxe.js')
module.exports = {
    getGoodsForStealToday: function () {
        return wxe.requestP({
            url: 'goodsForSteal/today', method: 'GET'
        });
    }
};