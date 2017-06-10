// pages/payment/index.js
var app = getApp()
var henneryService = require('../../service/hennery.js');
var cockAdoptionOrderService = require('../../service/cockAdoptionOrder.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      quantity: 1,
      price: 29,
      total: 29
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.order.customer = app.globalData.userInfo;
    var id = options.id;
    var self = this;
    henneryService.getById(id).then(function (res) {
      self.setData({
        hennery: res.data
      });
      self.data.order.hennery = res.data;
    });
  },
  plus: function () {
    this.data.order.quantity = this.data.order.quantity + 1;
    this.data.order.total = this.data.order.quantity * this.data.order.price;
    this.setData({
      order: this.data.order
    });
  },
  minus: function () {
    if (this.data.order.quantity > 1) {
      this.data.order.quantity = this.data.order.quantity - 1;
      this.data.order.total = this.data.order.quantity * this.data.order.price;
      this.setData({
        order: this.data.order
      });
    }

  },
  create: function () {
    cockAdoptionOrderService.create(this.data.order).then(function (res) {
      wx.navigateTo({
        url: '/pages/choosehennery/success?id='+res.data.id
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