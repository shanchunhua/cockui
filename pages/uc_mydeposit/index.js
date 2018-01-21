// pages/pledge/index.js
var app = getApp();
var henRentOrderService = require('../../service/henRentOrder.js');
var customerService = require('../../service/customer.js');
var moment = require('../../utils/we-moment-with-locales');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    customerService.loadCustomerProperty(app.globalData.userInfo.id).then(function (res) {
      self.setData({ customerProperty: res.data });
    });
    henRentOrderService.loadMyOrders(app.globalData.userInfo).then(function (res) {
      res.data.forEach(function (item) {
        item.dateStr = moment(item.createdTime).format('YYYY-MM-DD hh:ss');
      });
      self.setData({
        orders: res.data
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