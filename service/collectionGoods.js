var wxe = require('../utils/wxe.js')
module.exports = {

    //牧家货架-牧家精选
    loadCollectionGoods: function () {
        return wxe.requestP({
            url: 'collectionGoods/example',
            method: 'POST',
            data: {
                onSale: true
            }

        });
    },
    getById: function (id) {
        return wxe.requestP({
            url: 'collectionGoods/' + id, method: 'GET'
        });
    }
};