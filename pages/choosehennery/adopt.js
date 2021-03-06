// pages/payment/index.js
var app = getApp();
var henneryService = require('../../service/hennery.js');
var cockAdoptionOrderService = require('../../service/cockAdoptionOrder.js');
var paymentService = require('../../service/payment.js');
var henneryRaisingBatchService = require('../../service/henneryRaisingBatch.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      quantity: 0,
      price: 0,
      total: 0
    },
    batch: { duration: 0,leftQuantity:0 },
    disabled: false
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
    henneryRaisingBatchService.loadHenneryBatch(id).then(function (res) {
      if (res.data) {
        self.data.order.batch = res.data.batch;
        self.setData({
          batch: res.data.batch,
          btnText: '立即支付',
          'order.price': res.data.batch.price,
          'order.quantity': 1,
          'order.total': res.data.batch.price
        });
      } else {
        self.setData({
          btnText: '正在育雏',
          disabled: true
        });
      }
    });
  },
  plus: function () {
    if (this.data.order.quantity < this.data.batch.leftQuantity) {
      this.data.order.quantity = this.data.order.quantity + 1;
      this.data.order.total = this.data.order.quantity * this.data.order.price;
      this.setData({
        order: this.data.order
      });
    }

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
    if(!this.data.order.tel){
      wx.showModal({
        title:'提示',
        content:'请输入手机号码',
        showCancel:false
      });
    return false;
    }
    var self = this;
    //订单已创建，直接支付
    self.setData({
      disabled: true
    });
    if (!this.data.order.id) {
      cockAdoptionOrderService.create(this.data.order).then(function (res) {
        var order = res.data;
        self.setData({ order: order });
        paymentService.payOrder({
          order: self.data.order,
          type: 1
        }).then(function (res) {
          wx.redirectTo({
            url: '/pages/choosehennery/success?id=' + self.data.order.id
          });
        }).catch(function (err) {
          console.error(err);
          self.setData({
            disabled: false
          });
        });
      }, function (res) {
        wx.showModal({
          title: '创建订单失败',
          content: res.data.message,
          showCancel: false,
          success: function () {
            wx.redirectTo({
              url: '/pages/choosehennery/index'
            });
          }
        });
      });
    } else {
      paymentService.payOrder({
        order: this.data.order,
        type: 1
      }).then(function (res) {
        wx.redirectTo({
          url: '/pages/choosehennery/success?id=' + self.data.order.id
        });
      }).catch(function (err) {
        console.error(err);
        self.setData({
          disabled: false
        });
      });
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindinput: function (e) {
    this.setData({
      'order.tel': e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(arguments);
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