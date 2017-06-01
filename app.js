var wxe=require('utils/wxe.js');
//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getUserInfo()
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
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
                  wxe.request({
                    url: that.globalData.baseUrl+'customer/load',
                    data: {encryptedData:res.encryptedData,iv:res.iv},
                    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    // header: {}, // 设置请求的 header
                    success: function(res){
                      that.globalData.userInfo=res.data.data
                     console.log(res);
                    }
                  })
                },
                fail:function(err){
                  console.error(err);
                }
              })
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    baseUrl: 'https://wxapp.mujia.com/'
  }
})