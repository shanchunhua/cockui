// pages/wallet/index.js
var app = getApp();
var customerService = require('../../service/customer.js');
var withdrawRecordService = require('../../service/withdrawRecord.js');
var customerIncomeService = require('../../service/customerIncome.js');
var moment = require('../../utils/we-moment-with-locales');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadWithdrawRecords();
    this.loadCustomerProperty();
  },
  loadCustomerProperty: function () {
    var self = this;
    customerService.loadCustomerProperty(app.globalData.userInfo.id).then(function (res) {
      self.setData({ customerProperty: res.data });
    });
  },
  loadWithdrawRecords: function () {
    var self = this;
    withdrawRecordService.loadMyWithdrawRecord(app.globalData.userInfo).then(function (res) {
      res.data.forEach(function (item) {
        item.createdTime = moment(item.createdTime).format('YYYY-MM-DD HH:mm:ss');
      });
      self.setData({
        withdrawRecords: res.data
      });
    });
  },
  inputAmount: function () {
    this.setData({
      hidden: false
    });
  },
  loadCustomerIncomes: function () {
    var self = this;
    customerIncomeService.loadMyIncome(app.globalData.userInfo).then(function (res) {
      res.data.forEach(function (item) {
        item.createdTime = moment(item.createdTime).format('YYYY-MM-DD HH:mm:ss');
        var type = item.type;
        switch (type) {
          case 'RETURN':
            item.type = '借鸡生蛋押金';
            break;
          case 'TRANSFER':
            item.type = '转让红公鸡';
            break;
          case 'REWARD':
            item.type = '用户打赏';
            break;
          case 'SALES':
            item.type = "【10%】"+item.orderCustomer.nickName+'消费了'+item.amount*10+'元';
            break;
          case 'PARTNER':
            item.type = "【3%】"+item.orderCustomer.nickName+'消费了'+item.amount/0.03+'元';
            break;
        }
      });
      self.setData({
        incomes: res.data
      });
    });
  },
  confirm: function () {
    if (this.data.amount < 49 || this.data.amount > this.data.customerProperty.balance) {
      return false;
    }
    var self = this;
    console.log(this.data.amount);
    var r = {
      amount: this.data.amount,
      customer: app.globalData.userInfo
    };
    withdrawRecordService.create(r).then(function (res) {
      self.loadWithdrawRecords();
      self.loadCustomerProperty();
      self.setData({
        hidden: true
      });
    });
  },
  bindinput: function (e) {
    this.setData({
      amount: e.detail.value
    });
  },
  changeTab: function (event) {
    var tabid = event.currentTarget.dataset.tabid;
    this.setData({ currentTab: tabid });
    switch (tabid) {
      case "0":
        this.loadWithdrawRecords();
        break;
      case "1":
        this.loadCustomerIncomes();
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
  cancel: function () {
    this.setData({ hidden: true });
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