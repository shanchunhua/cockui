// pages/payment/index.js
var app = getApp()
var cockTransferService = require('../../service/cockTransfer.js');
var shippingOrderService = require('../../service/shippingOrder.js');
var paymentService = require('../../service/payment.js');
var moment = require('../../utils/we-moment-with-locales');
var wxe = require('../../utils/wxe.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      quantity: 1,
      price: 238,
      total: 238,
      items: [],
      goodsType: 'MORNING_MARKET'
    },
    disabled: false
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
      self.data.order.cockTransfer = data;
    });
     shippingOrderService.getLastOrder().then(function (res) {
      if (res.data) {
        self.data.order.contact = res.data.contact;
        self.data.order.tel = res.data.tel;
        self.data.order.address = res.data.address;
        self.setData({
          order: self.data.order
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  invokePay: function () {
    var self = this;
    paymentService.payOrder({
      order: self.data.order,
      type: 4
    }).then(function (res) {
      console.log('success');
      wx.redirectTo({
        url: '/pages/market/success?id=' + self.data.order.id
      });
    },function(res){
      console.error('pay error');
      cockTransferService.releaseCockTransfer(self.data.cockTransfer.id);
      self.setData({
        disabled: false
      });
    }).catch(function () {
      self.setData({
        disabled: false
      });
    });
  },
  create: function () {
    if (!wxe.checkAddress(this.data.order)) {
      return false;
    }
    var self = this;
    self.setData({
      disabled: true
    });
    //订单已创建，直接支付
    if (!this.data.order.id) {
      shippingOrderService.create(this.data.order).then(function (res) {
        var order = res.data;
        self.setData({ order: order });
        self.invokePay();
      }).catch(function(err){
          wx.showModal({
          title: '订单无效',
          content: '您手慢了该产品已被人抢走，请重新抢购',
          showCancel: false,
          success: function () {
            wx.redirectTo({
              url: '/pages/market/index'
            });
          }
        });
      });
    } else {
      self.invokePay();
    }

  },

  changeAddress: function () {
    var self = this;
    app.globalData.stopReLaunch = true;
    wx.chooseAddress({
      success: function (res) {
        var order = self.data.order;
        order.contact = res.userName;
        order.tel = res.telNumber;
        order.address = res.provinceName + res.cityName + res.detailInfo;
        self.setData({
          order: order
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 app.globalData.stopReLaunch = false;
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
});