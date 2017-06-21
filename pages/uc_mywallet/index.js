// pages/wallet/index.js
var app = getApp();
var withdrawRecordService = require('../../service/withdrawRecord.js');
var customerIncomeService = require('../../service/customerIncome.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadWithdrawRecords();
  },
  loadWithdrawRecords: function () {
    var self = this;
    withdrawRecordService.loadMyWithdrawRecord(app.globalData.userInfo).then(function (res) {
      res.data.forEach(function (item) {
        item.createdTime = new Date(item.createdTime);
      });
      self.setData({
        withdrawRecords: res.data
      });
    });
  },
  loadCustomerIncomes: function () {
    var self = this;
    customerIncomeService.loadMyIncome(app.globalData.userInfo).then(function (res) {
      res.data.forEach(function (item) {
        item.createdTime = new Date(item.createdTime);
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
        }
      });
      self.setData({
        incomes: res.data
      });
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