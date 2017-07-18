// pages/leather/index.js
var app = getApp()
var customerBoxService = require('../../service/customerBox.js');
var moment = require('../../utils/we-moment-with-locales');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    customerBoxService.loadCustomerBoxItems({ id: app.globalData.userInfo.id }).then(function (res) {
      if (res.data.length <= 0) {
        self.setData({
          none: true
        });
        return false;
      }
      res.data.forEach(function (item) {
        item.lastStealTime = moment(item.lastStealTime).format('YYYY-MM-DD');
      });
      self.setData({
        none: false,
        list: res.data
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})