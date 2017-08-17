// pages/suborder2/index.js
var app = getApp();
var cockAdoptionOrderService = require('../../service/cockAdoptionOrder.js');
var customerBoxService = require('../../service/customerBox.js');
var paymentService = require('../../service/payment.js');
var shippingOrderService = require('../../service/shippingOrder.js');
var wxe = require('../../utils/wxe.js');
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
    },
    disabled: false
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
    customerBoxService.loadCustomerBoxItems({ id: app.globalData.userInfo.id }).then(function (res) {
      var list = res.data;
      self.setData({ goods: list.filter(function (item) { return item.quantity > 0; }) });
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
  invokePay: function () {
    var self = this;
    paymentService.payOrder({
      order: self.data.order,
      type: 4
    }).then(function (res) {
      console.log('success');
      wx.redirectTo({
         url: '/pages/common/shippingOrderSuccess?id=' + self.data.order.id
      });
    }).catch(function () {
      self.setData({
        disabled: false
      });
    });
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
    checkboxChange: function (e) {
    this.checked = e.detail.value;
  },
  create: function () {
    var self = this;
    if (!wxe.checkAddress(this.data.order)) {
      return false;
    }
    self.setData({
      disabled: true
    });
    this.data.goods.forEach(function (item) {
      if (self.checked&&self.checked.includes(item.id+"")) {
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
        self.invokePay();
      });
    } else {
      invokePay();
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
})