var wxe = require('../utils/wxe.js');
module.exports = {
    prepareForPay: function (id, type) {
        return wxe.requestP({
            url: '/wechat/payment/unifiedorder?id=' + id + '&type=' + type, method: 'GET'
        });
    },
    wxPay: function (params) {
        var promise = new Promise(function (resolve, reject) {
            params.success = function (res) {
                resolve(res);
            };
            params.fail = function (res) {
                console.error(res);
                wx.showModal({
                    title: '支付失败',
                    content: '支付失败,请重新支付.错误信息：' + res.errMsg,
                    showCancel: false
                });
                reject(res);
            };
            wx.requestPayment(params);
        });
        return promise;
    },
    payOrder: function (options) {
        var self = this;
        var order = options.order;
        var type = options.type;
        if (!order.params) {
            return this.prepareForPay(order.id, type).then(function (res) {
                var params = res;
                params.timeStamp = params.timestamp;
                order.params = params;
                return self.wxPay(params);
            });
        } else {
            return self.wxPay(order.params);
        }
    }
};