// pages/payment/index.js
var app = getApp()
var cockTransferService = require('../../service/cockTransfer.js');
var moment = require('../../utils/we-moment-with-locales');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      quantity: 1,
      price: 209,
      total: 209,
      items: [],
      goodsType: 'MORNING_MARKET'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var id = options.id;
    self.data.order.customer = app.globalData.userInfo;
    cockTransferService.getById(id).then(function (res) {
      var data = res.data;
      data.dateStr = moment(data.createdTime).format('YYYY-MM-DD');
      self.setData({
        'cockTransfer': data
      });
      this.data.order.cockTransfer = data;
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  create: function () {
    var self = this;
    //订单已创建，直接支付
    if (!this.data.order.id) {
      shippingOrder.create(this.data.order).then(function (res) {
        var order = res.data;
        self.setData({ order: order });
        paymentService.payOrder({
          order: order,
          type: 1,
          success: function (res) {
            console.log('success');
            wx.navigateTo({
              url: '/pages/choosehennery/success?id=' + self.data.order.id
            });
          }
        });
      });
    } else {
      paymentService.payOrder({
        order: this.data.order,
        type: 1,
        success: function (res) {
          console.log('success');
          wx.navigateTo({
            url: '/pages/choosehennery/success?id=' + self.data.order.id
          });
        }
      });
    }

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