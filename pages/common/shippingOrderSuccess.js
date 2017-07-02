// index.js
var app = getApp();
var shippingOrderService = require('../../service/shippingOrder.js');
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
    var self = this;
    shippingOrderService.getById(options.id).then(function (res) {
      var order = res.data;
      self.setData({
        order: order
      });
      var msg = "";
      if (order.collectionGoods) {
        msg = "您已经购买" + order.quantity + "个" + order.collectionGoods.name;
        if (order.items && order.items.length > 0) {
          order.items.forEach(function (item) {
            msg += "," + item.name + item.quantity + "份";
          });
          msg += "一并配送";
        }
        msg += "！";
      }
      if (order.cockTransfer) {
        msg = "您已经购买" + order.quantity + "只" + order.cockTransfer.customer.nickName + "转让的红公鸡";
      }
      if (order.goodsType == 'EGG') {
        msg = "您已成功购买鸡蛋" + order.quantity + "个";
      }
      console.log(msg);
      self.setData({
        msg: msg
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