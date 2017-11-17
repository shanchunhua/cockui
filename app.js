var wxe = require('utils/wxe.js');
//app.js
App({
  onLaunch: function () {
    wx.clearStorageSync();
    this.globalData.loadUserPromise = this.getUserInfo();
  },
  onShow: function (options) {
    console.log(options);
    /*
    console.log(options);
    var path = options.path;
    var scene=options.scene;
    //退出再返回，返回首页
    console.log(this.globalData.stopReLaunch);
    if (path != '/pages/index/index'&&!this.globalData.stopReLaunch) {
      wx.reLaunch({
        url: '/pages/index/index'
      });
    }*/
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
          wx.showModal({
            title: 'Login Failed'
          })
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
           wx.showModal({
            title: 'Get Userinfo failed'
          })
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
    }).then(function (res) {
      self.sessionKey=res.data;
      console.log("sessionKey:"+self.sessionKey);
      return self.wxUserInfo();
    }).then(function (res) {
      console.log('load customer');
      return wxe.requestP({
        url: 'customer/load',
        data: {encryptedData: res.encryptedData, iv: res.iv,sessionKey:self.sessionKey },
        method: 'POST'
      });
    }).then(function (res) {
      self.globalData.userInfo = res.data;
      wx.setStorage({
        key: 'cid',
        data: res.data.id
      });
      return res;
    });


  },
  globalData: {
    userInfo: null,
    stopReLaunch: false,
    settings: {

    }
  }
})