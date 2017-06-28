// pages/rew/index.js
var app = getApp();
var rewardAnimalService = require('../../service/rewardAnimal.js');
var paymentService = require('../../service/payment.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: [
      { price: 0.1, text: '初来乍到一点心意' },
      { price: 0.5, text: '初来乍到一点心意' },
      { price: 1.0, text: '初来乍到一点心意' },
      { price: 5.0, text: '初来乍到一点心意' },
      { price: 10.0, text: '初来乍到一点心意' },
      { price: 20.0, text: '初来乍到一点心意' }
    ]
  },

  create: function (event) {
    var price = event.currentTarget.dataset.price;
    var rewardAnimal = {
      type: 'DOG',
      amount: price,
      customer: app.globalData.userInfo
    };
    var self = this;
    //订单已创建，直接支付
    rewardAnimalService.create(rewardAnimal).then(function (res) {
      var order = res.data;
      paymentService.payOrder({
        order: order,
        type: 5,
        success: function (res) {
          console.log('success');
          wx.navigateTo({
            url: '/pages/choosehennery/success?id=' + self.data.order.id
          });
        }
      });
    });


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