// pages/wallet/index.js
var app = getApp();
var eggGainRecordService = require('../../service/eggGainRecord.js');
var shippingOrderService = require('../../service/shippingOrder.js');
var moment = require('../../utils/we-moment-with-locales');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    order: {
      quantity: 30
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadEggGainRecords();
  },
  loadEggGainRecords: function () {
    var self = this;
    eggGainRecordService.loadCustomerEggGainRecords(app.globalData.userInfo).then(function (res) {
      var data = res.data;
      data.forEach(function (item) {
        switch (item.type) {
          case 'STEAL':
            item.typeMsg = '偷蛋';
            item.detailMsg = '牧家：' + item.hennery.ownerName;
            break;
          case 'COMPLIMENT':
            item.typeMsg = '预送';
            item.detailMsg = '借鸡生蛋';
            break;
          case 'LAID':
            item.typeMsg = '生蛋';
            item.detailMsg = '借鸡生蛋';
            break;
        }
        item.dateStr = moment(item.createdTime).format('YYYY-MM-DD hh:ss');
      });
      self.setData({
        eggGainRecords: data
      });
    });
    shippingOrderService.loadEggOrder(app.globalData.userInfo).then(function (res) {
      self.setData({
        orders: res.data
      });
    });
  },
  changeTab: function (event) {
    var tabid = event.currentTarget.dataset.tabid;
    this.setData({ currentTab: tabid });
    switch (tabid) {
      case "0":
        this.loadEggGainRecords();
        break;
      case "1":
        this.loadEggGainRecords();
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