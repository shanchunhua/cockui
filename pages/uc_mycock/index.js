// pages/adopt/index.js
var app = getApp()
var cockAdoptionOrderService = require('../../service/cockAdoptionOrder.js');
var cockTransferService = require('../../service/cockTransfer.js');
var shippingOrderService = require('../../service/shippingOrder.js');
var expiredRecordService = require('../../service/expiredRecord.js');
var moment = require('../../utils/we-moment-with-locales');
var statusMap = {
  'PROCESSING': '转让中',
  'COMPLETED': '已完成',
  'EXPIRED': '已逾期',
  'WAITFORPAY': '支付中'
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    currentTab: 0,
    none: false
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
      if (res.data.length <= 0) {
        self.setData({
          none: true,
          msg: '您尚未领养红公鸡'
        });
        return false;
      }

      res.data.forEach(function (item) {
        item.dateStr = moment(item.paidDate).format('YYYY-MM-DD');
      });
      self.setData({ none: false, orders: res.data });
    });
  },
  loadTransferOrder: function () {
    var self = this;
    cockTransferService.loadCustomerTransferOrders({ id: app.globalData.userInfo.id }).then(function (res) {
      if (res.data.length <= 0) {
        self.setData({
          none: true,
          msg: '您尚未转让红公鸡'
        });
        return false;
      }
      res.data.forEach(function (item) {
        item.dateStr = moment(item.createdTime).format('YYYY-MM-DD');
        if (item.status) {
          item.statusStr = statusMap[item.status];
        }
        else {
          item.statusStr = '转让中';
        }
      });
      self.setData({ none: false, orders: res.data });
    });
  },
  loadShippingOrder: function () {
    var self = this;
    shippingOrderService.loadCustomerShippingOrders({ id: app.globalData.userInfo.id }).then(function (res) {
      if (res.data.length <= 0) {
        self.setData({
          none: true,
          msg: '您尚未收回红公鸡'
        });
        return false;
      }
      res.data.forEach(function (item) {
        item.dateStr = moment(item.createdDate).format('YYYY-MM-DD');
      });
      self.setData({ none: false, orders: res.data });
    });
  },
  loadExpiredRecord: function () {
    var self=this;
    expiredRecordService.load(app.globalData.userInfo).then(function (res) {
       if (res.data.length <= 0) {
        self.setData({
          none: true,
          msg: '当前无逾期红公鸡\n* 领养结束超过15天未回收或转让成功 *'
        });
        return false;
      }
      res.data.forEach(function (item) {
        item.dateStr = moment(item.createdDate).format('YYYY-MM-DD');
      });
      self.setData({ none: false, orders: res.data });
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
        this.loadShippingOrder();
        break;
      case "3":
        this.loadExpiredRecord();
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