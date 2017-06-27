// pages/suborder2/index.js
var app = getApp();
var cockAdoptionOrderService = require('../../service/cockAdoptionOrder.js');
var customerBoxService = require('../../service/customerBox.js');
var paymentService = require('../../service/payment.js');
var shippingOrderService = require('../../service/shippingOrder.js');
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
      goodsType: 'COCK'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    console.log(id);
    var self = this;
    self.data.order.customer = app.globalData.userInfo;
    cockAdoptionOrderService.getById(id).then(function (res) {
      self.data.order.quantity = res.data.availableQuantity;
      self.data.order.total = self.data.order.quantity * self.data.order.price;
      self.data.order.adoptionOrder = res.data;

      self.setData({
        adoptionOrder: res.data,
        order: self.data.order
      });
    });
    customerBoxService.loadCustomerBoxItems().then(function (res) {
      var list = res.data;
      self.setData({ goods: list.filter(function (item) { return item.quantity > 0; }) });
    });
  },
  plus: function () {
    if (this.data.order.quantity < this.data.adoptionOrder.quantity) {
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
    var self = this;
    this.data.goods.forEach(function (item) {
      if (item.checked) {
        self.data.order.items.push({
          goods: item.goods,
          quantity: item.quantity,
          name: item.goods.name
        });
      }
    });
    //订单已创建，直接支付
    if (!this.data.order.id) {
      shippingOrderService.create(this.data.order).then(function (res) {
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