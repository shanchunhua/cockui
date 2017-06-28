var wxe = require('utils/wxe.js');
//app.js
App({
  onLaunch: function () {
    this.globalData.loadUserPromise=this.getUserInfo();
  },
  getUserInfo: function (cb) {
    var that = this;
     var promise = new Promise(function (resolve, reject) {
      //调用登录接口
      wx.login({
        success: function (res) {
          console.log(res)
          wxe.request({
            url: that.globalData.baseUrl + 'wxapp/sessionkey/' + res.code,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              wx.getUserInfo({
                withCredentials: true,
                success: function (res) {
                  console.log(res)
                  wxe.requestP({
                    url: 'customer/load',
                    data: { encryptedData: res.encryptedData, iv: res.iv },
                    method: 'POST' // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    // header: {}, // 设置请求的 header

                  }).then(function (res) {
                    that.globalData.userInfo = res.data;
                    console.error(that.globalData.userInfo);
                    resolve(res.data);
                  },function(error){
                    console.error(error);
                    reject(error);
                  });
                },
                fail: function (err) {
                  reject(error);
                }
              });
            }
          });
        }
      });
    });
    return promise;

  
  },
  globalData: {
    userInfo: null,
    baseUrl: 'https://www.huanlemujia.com/'
  }
})