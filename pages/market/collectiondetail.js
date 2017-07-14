// pages/suborder2/index.js
var app = getApp();
var collectionGoodsService = require('../../service/collectionGoods.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionGoods: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var self = this;

    collectionGoodsService.getById(id).then(function (res) {
      res.data.description='<image src="http://static.huanlemujia.com/static/a1.jpg" class="a1"></image>';
      self.setData({
        collectionGoods: res.data
      });
    });
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
});