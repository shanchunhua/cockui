// index.js
var app = getApp();
var henneryService = require('../../service/hennery.js');
var henneryImageService = require('../../service/henneryImage.js');
var customerService=require('../../service/customer.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    henneries: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    if(options.cid){
      customerService.connect(app.globalData.userInfo.id,options.cid).then(function(){
        console.log('connected');
      });
    }
    var self = this;
    henneryService.findAll().then(function (res) {
      res.data.forEach(function (item) {
        item.LIFE = [];
        item.ENVIRONMENT = [];
        item.AMINAL = [];
        item.images.forEach(function (image) {
          item[image.type].push(image.url);
        });
      });
      self.setData({ henneries: res.data });
      console.log(res);
    });
  },
  preview: function (e) {
    var type = e.currentTarget.dataset.type;
    var id = e.currentTarget.dataset.id;
    var hennery = this.data.henneries.find(function (item) {
      return item.id == id;
    });

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
    console.log('onShow');
    console.log(arguments);
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