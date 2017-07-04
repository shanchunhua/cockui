var wxe = require('utils/wxe.js');
//app.js
App({
  onLaunch: function () {
    this.globalData.loadUserPromise = this.getUserInfo();
  },
  onShow: function (options) {
    var path = options.path;
    //退出再返回，返回首页
    if (path != '/pages/index/index') {
      wx.reLaunch({
        url: '/pages/index/index'
      });
    }
  },
  checkSetting: function (setting) {
    var self = this;
    if (!setting['scope.userInfo']) {
      wx.openSetting({
        success: function (res) {
          var setting = res.authSetting;
          self.checkSetting(setting);
        },
        fail: function () {
          self.checkSetting(setting);
        }
      });
    }
  },
  wxLogin: function () {
    var wxLoginPromise = new Promise(function (resolve, reject) {
      console.log('wxLogin');
      wx.login({
        success: function (res) {
          console.log(res);
          resolve(res.code);
        },
        fail: function (err) {
          reject(err);
        }
      });
    });
    return wxLoginPromise;
  },
  wxUserInfo: function () {
    console.log('wxUserInfo');
    var promise = new Promise(function (resolve, reject) {
      wx.getUserInfo({
        withCredentials: true,
        success: function (res) {
          console.log(res);
          resolve(res);
        },
        fail: function (err) {
          reject(err);
        }
      });
    });
    return promise;
  },
  getUserInfo: function (cb) {
    var self = this;
    return self.wxLogin().then(function (code) {
      console.log('get session key');
      return wxe.requestP({
        url: 'wxapp/sessionkey/' + code
      });
    }).then(function () {
      return self.wxUserInfo();
    }).then(function (res) {
      console.log('load customer');
      return wxe.requestP({
        url: 'customer/load',
        data: { encryptedData: res.encryptedData, iv: res.iv },
        method: 'POST'
      });
    }).then(function (res) {
      self.globalData.userInfo = res.data;
      return res;
    });


  },
  globalData: {
    userInfo: null,
    baseUrl: 'https://www.huanlemujia.com/'
  }
})