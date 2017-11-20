// pages/my_eggs2/index.js
var app = getApp();
var cockTransferService = require('../../service/cockTransfer.js');
var moment = require('../../utils/we-moment-with-locales');
var raisingRecordService = require('../../service/raisingRecord.js');
var weatherService = require('../../service/weather.js');
var customerService = require('../../service/customer.js');

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
    currentTab: 0,
    isSales: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var self = this;
    if (options.cid) {
      customerService.connect(app.globalData.userInfo.id, options.cid).then(function () {
        console.log('connected');
      });
    }
    cockTransferService.getById(id).then(function (res) {
      var cockTransfer = res.data;
      if (app.globalData.userInfo && app.globalData.userInfo.id == cockTransfer.customer.id) {
        self.setData({
          isOwner: true
        });
      }
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
    weatherService.get().then(function (data) {
      self.setData({
        weather: data
      });
    });
    customerService.isSales(app.globalData.userInfo.id).then(function (res) {
      if (res.data) {
        self.setData({ 'isSales': true });
        setTimeout(function(){self.hide();},2000);
      }
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

  },
  changeTab: function (event) {
    var tabid = event.currentTarget.dataset.tabid;
    this.setData({ currentTab: tabid });
  },

  onShareAppMessage: function (res) {
    return {
      title: '我的红公鸡',
      path: '/pages/mycock/transfer_detail?id=' + this.data.cockTransfer.id+ "&cid=" + app.globalData.userInfo.id
    };
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('xxxxx');
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

  }
});