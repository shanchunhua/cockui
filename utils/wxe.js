var baseUrl = 'https://www.huanlemujia.com/';
var request = function (config) {
    wx.showLoading({
        title: '加载中',
        mask: true
    });
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
    console.log(config.url);
    console.log(session_id);
    var header = {};
    if (session_id) {
        header = { 'Cookie': 'JSESSIONID=' + session_id }
    }
    if (!config.complete) {
        config.complete = function (res) {
            console.log(res);
            wx.hideLoading();
            var cookie = res.header['Set-Cookie'];
            if (cookie && cookie.length > 0) {
                var sessionID = new String(cookie).split(';', 1)[0].split('=')[1];
                console.log(sessionID);
                if (sessionID) {
                    wx.setStorageSync('JSESSIONID', sessionID);
                }
            }
            wx.hideLoading();
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