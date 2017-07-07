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
    stealOrderService.unpaidOrder().then(function (res) {
      if (!res.data) {
        wx.showModal({
          title: '订单无效',
          content: '订单不存在或者已失效',
          showCancel: false,
          success: function () {
            wx.redirectTo({
              url: '/pages/index/index'
            });
          }
        });
        return false;
      }
      self.setData({
        order: res.data
      });
      self.interval = setInterval(function () {
        self.countDown();
      }, 1000);

    });
  },
  countDown: function () {
    var self = this;
    if (self.data.order) {
      var createdTime = self.data.order.createdTime;
      var now = (new Date()).getTime();
      var left = parseInt((createdTime + 30 * 60 * 1000 - now) / 1000);
      if (left <= 0) {
        wx.redirectTo({
          url: '/pages/index/index'
        });
        return false;
      }
      var countDown = {
        minutes: parseInt(left / 60),
        seconds: left % 60
      };
      self.setData({
        countDown: countDown
      });
    }
  },
  pay: function () {
    var self = this;
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
      wx.redirectTo({
        url: '/pages/index/index'
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
    clearInterval(self.interval);
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