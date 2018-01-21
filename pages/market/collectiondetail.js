// pages/suborder2/index.js
var app = getApp();
var collectionGoodsService = require('../../service/collectionGoods.js');
var customerService = require('../../service/customer.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionGoods: null,
    id: null,
    isSales: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    app.globalData.loadUserPromise.then(function(){
      console.log(options);
      var id = options.id;
      if (options.cid) {
        customerService.connect(app.globalData.userInfo.id, options.cid).then(function () {
          console.log('connected');
        });
      }
      self.data.id = id;
      collectionGoodsService.getById(id).then(function (res) {
        self.setData({
          collectionGoods: res.data
        });
      });
      customerService.isSales(app.globalData.userInfo.id).then(function (res) {
        if (res.data) {
          self.setData({ 'isSales': true });
        }
      });
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.updateShareMenu({
      withShareTicket: true
    });
  },
  hide: function () {
    this.setData({ 'isSales': false });
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
    
    return {
      imageUrl:this.data.collectionGoods.description,
      path: "/pages/market/collectiondetail?id=" + this.data.id + "&cid=" + app.globalData.userInfo.id
    };
  }
});