// pages/my_eggs2/index.js
var app = getApp();
var cockTransferService = require('../../service/cockTransfer.js');
var moment = require('../../utils/we-moment-with-locales');
var raisingRecordService = require('../../service/raisingRecord.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 20,
      height: 20,
      iconPath: '/img/s14.png'
    }],
    isOwner: false,
    currentTab:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    console.log("*****" + id);
    var self = this;
    cockTransferService.getById(id).then(function (res) {
      var cockTransfer = res.data;
      console.log("********" + res.data.createdTime);
      if (app.globalData.userInfo && app.globalData.userInfo.id == cockTransfer.customer.id) {
        self.setData({
          isOwner: true
        });
      }
      console.log("********here");
      var markers = self.data.markers[0];
      markers.longitude = cockTransfer.cockAdoptionOrder.hennery.longitude;
      markers.latitude = cockTransfer.cockAdoptionOrder.hennery.latitude;
      var hennery = cockTransfer.cockAdoptionOrder.hennery;

      cockTransfer.dateStr = moment(cockTransfer.createdDate).format('YYYY-MM-DD hh:mm:ss');
      if (!hennery.LIFE) {
        hennery.LIFE = [];
        hennery.ENVIRONMENT = [];
        hennery.AMINAL = [];
        hennery.images.forEach(function (image) {
          hennery[image.type].push(image.url);
        });
      }
      raisingRecordService.loadAdoptionRaisingRecords(cockTransfer.cockAdoptionOrder.id).then(function (res) {
        res.data.forEach(function (item) {
          item.dateStr = moment(item.paidDate).format('YYYY-MM-DD');
        });
        self.setData({
          raisingRecords: res.data
        });
      });

      self.setData({
        cockTransfer: cockTransfer,
        markers: [markers],
        hennery: hennery
      });
    });
  },
  previewRaisingImage: function (e) {
    var id = e.currentTarget.dataset.id;
    var record = this.data.raisingRecords.find(function (item) {
      return item.id == id;
    });
    var urls = record.images.map(function (item) {
      return item.url;
    });
    wx.previewImage({
      urls: urls
    });
  },
  preview: function (e) {
    var type = e.currentTarget.dataset.type;
    var hennery = this.data.hennery;
    wx.previewImage({
      urls: hennery[type]
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

  },
  changeTab: function (event) {
    var tabid = event.currentTarget.dataset.tabid;
    this.setData({ currentTab: tabid });
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    console.log("*****" + this.data.cockTransfer.id);
    return {
      title: '我的红公鸡',
      path: '/pages/mycock/transfer_detail?id=' + this.data.cockTransfer.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
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