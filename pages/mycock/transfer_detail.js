// pages/my_eggs2/index.js
var app = getApp();
var cockTransferService = require('../../service/cockTransfer.js');
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
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var self = this;
    cockTransferService.getById(id).then(function (res) {
      var markers = self.data.markers[0];
      markers.longitude = cockTransfer.cockAdoptionOrder.hennery.longitude;
      markers.latitude = cockTransfer.cockAdoptionOrder.hennery.latitude;
      self.setData({
        cockTransfer: res.data,
        markers: [markers]
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