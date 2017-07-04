// pages/eggs/index.js
var app = getApp()
var customerService = require('../../service/customer.js');
var customerBoxService = require('../../service/customerBox.js');
var paymentService = require('../../service/payment.js');
var shippingOrderService = require('../../service/shippingOrder.js');
var wxe = require('../../utils/wxe.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerProperty: {},
    order: {
      quantity: 0,
      goodsType: 'EGG',
      price: 2.5
    },
    eggs: {
      stealEgg: 0,
      laidEgg: 0
    },
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    self.data.order.customer = app.globalData.userInfo;
    customerService.loadCustomerProperty(app.globalData.userInfo.id).then(function (res) {
      self.setData({ customerProperty: res.data });
      console.log(self.data);
      self.calculate();
    });
    customerBoxService.loadCustomerBoxItems().then(function (res) {
      var list = res.data;
      self.setData({ goods: list.filter(function (item) { return item.quantity > 0; }) });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  calculate: function () {
    //取偷蛋的订单需要的蛋的数量的小值
    var min = this.data.order.quantity < this.data.customerProperty.stolenEggCount ? this.data.order.quantity : this.data.customerProperty.stolenEggCount;
    var laidEgg = 0;
    var price = 2.5;
    if (this.data.order.quantity > min) {
      laidEgg = this.data.order.quantity - min;
      var order = this.data.order;
      order.total = price * laidEgg;
      this.setData({
        order: order
      });
    }
    this.setData({
      eggs: {
        stealEgg: min,
        laidEgg: laidEgg
      }
    });
  },
  plus: function () {
    if (this.data.order.quantity + 30 > this.data.customerProperty.leftEggCount) {
      wx.showModal({
        title: '提示',
        content: '您鸡篮中数量不足，可租更多的母鸡或到牧家精选中购',
        showCancel: false,
        success: function (res) {

        }
      });
      return false;
    }
    this.data.order.quantity = this.data.order.quantity + 30;
    this.setData({
      order: this.data.order
    });
    this.calculate();
  },
  minus: function () {
    //  if (this.data.order.quantity > 30) {
    this.data.order.quantity = this.data.order.quantity - 30;
    this.setData({
      order: this.data.order
    });
    this.calculate();
    //    }

  },
  invokePay: function () {
    var self = this;
    paymentService.payOrder({
      order: self.data.order,
      type: 4
    }).then(function () {
      wx.redirectTo({
        url: '/pages/common/shippingOrderSuccess?id=' + self.data.order.id
      });
    }).catch(function () {
      self.setData({
        disabled: false
      });
    });
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
        self.invokePay();
      });
    } else {
      self.invokePay();
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.stopReLaunch = false;
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