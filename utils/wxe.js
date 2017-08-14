var util = require('../utils/util.js');
//var baseUrl = 'https://www.huanlemujia.com/';
var baseUrl = 'https://wxapp.mujia.com/';

var request = function (config) {
    util.LoadMask.show();
    if (config.url.indexOf("://") < 0) {
        config.url = baseUrl + config.url;
    }
    var cid = wx.getStorageSync('cid');
    if (cid) {
        if (config.url.indexOf('?') < 0) {
            config.url += '?cid=' + cid;
        } else {
            config.url += '&cid=' + cid;
        }
    }
    var session_id = wx.getStorageSync('JSESSIONID');//本地取存储的sessionID  
    var header = {};
    if (session_id) {
        header = { 'Cookie': 'JSESSIONID=' + session_id };
    }
    if (!config.complete) {
        config.complete = function (res) {
            console.log(res);
            util.LoadMask.hide();
            var cookie = res.header['Set-Cookie'];
            if (cookie && cookie.length > 0) {
                var sessionID = new String(cookie).split(';', 1)[0].split('=')[1];
                console.log(sessionID);
                if (sessionID) {
                    wx.setStorageSync('JSESSIONID', sessionID);
                }
            }
        };
    }
    if (!config.fail) {
        config.fail = function (res) {
            console.error(res);
        };
    }
    config.header = header;
    return wx.request(config);
};
var requestP = function (config) {
    var promise = new Promise(function (resolve, reject) {
        config.success = function (res) {
            if (res.statusCode > 399) {
                reject(res);
            } else {
                resolve(res.data);
            }

        };
        config.error = function (err) {
            console.error(err);
            reject(err);
        };
        request(config);
    });
    return promise;
}
module.exports = {
    request: request,
    requestP: requestP,
    checkAddress: function (order) {
        if (!order.contact || !order.tel || !order.address) {
            wx.showModal({
                title: '信息不足',
                content: '请填写收货信息',
                showCancel: false
            });
            return false;
        }
        return true;
    }
};