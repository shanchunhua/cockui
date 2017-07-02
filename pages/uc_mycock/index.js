// pages/adopt/index.js
var app = getApp()
var cockAdoptionOrderService = require('../../service/cockAdoptionOrder.js');
var cockTransferService = require('../../service/cockTransfer.js');
var shippingOrderService = require('../../service/shippingOrder.js');
var moment = require('../../utils/we-moment-with-locales');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    currentTab: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadAdoptionOrder();
  },
  //加载公鸡领养记录
  loadAdoptionOrder: function () {
    var self = this;
    cockAdoptionOrderService.loadCustomerAdoptionOrders({ id: app.globalData.userInfo.id }).then(function (res) {
      res.data.forEach(function (item) {
        item.dateStr = moment(item.paidDate).format('YYYY-MM-DD');
      });
      self.setData({ orders: res.data });
    });
  },
  loadTransferOrder: function () {
    var self = this;
    cockTransferService.loadCustomerTransferOrders({ id: app.globalData.userInfo.id }).then(function (res) {
      self.setData({ orders: res.data });
    });
  },
  loadShoppingOrder: function () {
    var self = this;
    shippingOrderService.loadCustomerShippingOrders({ id: app.globalData.userInfo.id }).then(function (res) {
      self.setData({ orders: res.data });
    });
  },
  changeTab: function (event) {
    var tabid = event.currentTarget.dataset.tabid;
    this.setData({ currentTab: tabid });
    switch (tabid) {
      case "0":
        this.loadAdoptionOrder();
        break;
      case "1":
        this.loadTransferOrder();
        break;
      case "2":
        //   this.loadShoppingOrder();
        break;
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