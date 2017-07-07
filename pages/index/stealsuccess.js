// pages/success2/index.js
var stealOrderService = require('../../service/stealOrder.js');
var paymentService = require('../../service/payment.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: null,
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var id = options.id;
    var self = this;
    stealOrderService.getById(id).then(function (res) {
      self.setData({
        order: res.data
      });
    });
  },
  pay: function () {
    self.setData({
      disabled: true
    });
    paymentService.payOrder({
      order: this.data.order,
      type: 3
    }).then(function (res) {
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000
      });
    }).catch(function (err) {
      console.error(err);
      self.setData({
        disabled: false
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