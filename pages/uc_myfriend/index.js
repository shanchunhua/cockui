// pages/my_friend/index.js
var app = getApp();
var customerService = require('../../service/customer.js');
var moment = require('../../utils/we-moment-with-locales');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this;
    customerService.friends().then(function(res){
      var totalCount=0;
      var totalAmount=0;
      res.data.forEach(e => {
        if(e.total==null){
          e.total=0;
        }
        totalCount++;
        totalAmount+=e.total;
        e.orderTotal=(e.total*10).toFixed(2);
      });
      self.setData({"result":res.data,"totalAmount":totalAmount,"totalCount":totalCount});
      console.log(self.data.result);
    })
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