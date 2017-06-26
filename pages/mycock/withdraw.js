// pages/suborder2/index.js
var app = getApp();
var cockAdoptionOrderService = require('../../service/cockAdoptionOrder.js');
var customerBoxService = require('../../service/customerBox.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    withdrawOrder: {
      quantity: 1,
      price: 209,
      total: 209,
      items:[]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    console.log(id);
    var self = this;
   
    cockAdoptionOrderService.getById(id).then(function (res) {
      self.data.withdrawOrder.quantity = res.data.availableQuantity;
      self.data.withdrawOrder.adoptionOrder=res.data;

      self.setData({
        order: res.data,
        withdrawOrder: self.data.withdrawOrder
      });
    });
    customerBoxService.loadCustomerBoxItems().then(function (res) {
      var list = res.data;
      self.setData({ goods: list.filter(function (item) { return item.quantity > 0; }) });
    });
  },
  plus: function () {
    if (this.data.withdrawOrder.quantity < this.data.order.quantity) {
      this.data.withdrawOrder.quantity = this.data.withdrawOrder.quantity + 1;
      this.data.withdrawOrder.total = this.data.withdrawOrder.quantity * this.data.withdrawOrder.price;
      this.setData({
        withdrawOrder: this.data.withdrawOrder
      });
    }

  },
  minus: function () {
    if (this.data.withdrawOrder.quantity > 1) {
      this.data.withdrawOrder.quantity = this.data.withdrawOrder.quantity - 1;
      this.data.withdrawOrder.total = this.data.withdrawOrder.quantity * this.data.withdrawOrder.price;
      this.setData({
        withdrawOrder: this.data.withdrawOrder
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