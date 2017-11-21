// pages/understand/index.js
var app = getApp();
var customerService = require('../../service/customer.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSales: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    app.globalData.loadUserPromise.then(function () {
      if (options.cid) {
        customerService.connect(app.globalData.userInfo.id, options.cid).then(function () {
          console.log('connected');
        });
      }
      customerService.isSales(app.globalData.userInfo.id).then(function (res) {
        if (res.data) {
          self.setData({ 'isSales': true });
          setTimeout(function () {
            self.hide();
          }, 6000);
        }
      });
    });
  },
  hide: function () {
    this.setData({ 'isSales': false });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.updateShareMenu({
      withShareTicket: true
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    this.hide();
    return {
      path: "/pages/understand/index?&cid=" + app.globalData.userInfo.id
    };
  }
});