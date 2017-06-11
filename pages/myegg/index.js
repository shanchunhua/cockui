// pages/eggs/index.js
var app = getApp()
var customerService = require('../../service/customer.js');
var customerBoxService = require('../../service/customerBox.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerProperty: {},
    order: {
      quantity: 30
    },
    eggs: {
      stealEgg: 0,
      laidEgg: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
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
      order.total = price * laidEgg
      this.setData({
        order: order
      })
    }
    this.setData({
      eggs: {
        stealEgg: min,
        laidEgg: laidEgg
      }
    });
  },
  plus: function () {
    this.data.order.quantity = this.data.order.quantity + 30;
    this.setData({
      order: this.data.order
    });
    this.calculate();
  },
  minus: function () {
    if (this.data.order.quantity > 30) {
      this.data.order.quantity = this.data.order.quantity - 30;
      this.setData({
        order: this.data.order
      });
      this.calculate();
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