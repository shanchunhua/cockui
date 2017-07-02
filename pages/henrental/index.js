// pages/rawegg/index.js
var henRentOrderService = require('../../service/henRentOrder.js');
var paymentService = require('../../service/payment.js');
var customerService = require('../../service/customer.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      quantity: 1,
      price: 39,
      total: 39,
      customer: app.globalData.userInfo
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this;
    console.log(app.globalData.userInfo);
    this.data.order.customer = app.globalData.userInfo;
    customerService.loadCustomerProperty(app.globalData.userInfo.id).then(function (res) {
      self.setData({ customerProperty: res.data });
    });
    henRentOrderService.loadMyOrders(this.data.order.customer).then(function(res){
      self.setData({
        rentOrders:res.data
      });
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

  pay: function () {

    var self = this;
    //订单已创建，直接支付
    if (!this.data.order.id) {
      henRentOrderService.save(this.data.order).then(function (res) {
        var order = res.data;
        self.setData({ order: order });
        paymentService.payOrder({
          order: order,
          type: 2,
          success: function (res) {
            wx.redirectTo({
              url: '/pages/henrental/success?count=' + self.data.order.quantity
            });
          }
        });
      });
    } else {
      paymentService.payOrder({
        order: this.data.order,
        type: 2,
        success: function (res) {
          wx.redirectTo({
            url: '/pages/henrental/success?count=' + self.data.order.quantity
          });
        }
      });
    }
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