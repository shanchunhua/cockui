// pages/leather2/index.js
var app = getApp();
var shippingOrderItemService = require('../../service/shippingOrderItem.js');
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
    shippingOrderItemService.getBoxOrders().then(function (res) {
      if (res.data.length <= 0) {
        wx.redirectTo({
          url: '/pages/usercenter/none'
        });
        return false;
      }
      res.data.forEach(function (item) {
        item.dateStr = moment(item.order.createdTime).format('YYYY-MM-DD hh:mm:ss');
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