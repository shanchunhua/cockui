var wxe = require('../utils/wxe.js');
module.exports = {
    prepareForPay: function (id, type) {
        return wxe.requestP({
            url: '/wechat/payment/unifiedorder?id=' + id + '&type=' + type, method: 'GET'
        });
    },
    payOrder: function (options) {
        var order=options.order;
        var type=options.type;
        var success=options.success;
        this.prepareForPay(order.id, type).then(function (res) {
            var params = res;
            params.timeStamp = params.timestamp;
            params.success = success;
            params.fail = function (res) {
                console.log('fail');
                console.error(res);
                wx.showModal({
                    title: '支付失败',
                    content: '支付失败,请重新支付.错误信息：' + res.errMsg,
                    showCancel: false,
                    success: function () {

                    }
                });
            };
            wx.requestPayment(params);
        });
    },
};