// pages/goods/index.js
var app = getApp()
var cockTransferService = require('../../service/cockTransfer.js');
var collectionGoodsService = require('../../service/collectionGoods.js');
var moment = require('../../utils/we-moment-with-locales');
var templateMessageFormIdService = require('../../service/templateMessageFormId.js');
var slogan=['来看看', '老板好', '优惠啦','超好吃','来来来','见过吗','快点买','就一只','别走啊'];
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var self = this;
    cockTransferService.loadOngoingTransferOrders().then(function (res) {
      var data = res.data.content;
      data.forEach(function (item) {
        item.dateStr = moment(item.createdTime).format('YYYY-MM-DD');
        item.firstCharOfName=item.customer.nickName.charAt(0);
        var idx=Math.floor(Math.random()*slogan.length);
        if(idx==slogan.length){idx--;}
        item.slogan=slogan[idx];
      });
      self.setData({
        transferCocks: data
      });
    });
    collectionGoodsService.loadCollectionGoods().then(function (res) {
      self.setData({
        collectionGoods: res.data
      });
    });
  },
  createFormId:function(e){
    console.log(e.detail);
    templateMessageFormIdService.save({
      customer:app.globalData.userInfo,
      formId: e.detail.formId,
      type: 'FORM_ID'
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