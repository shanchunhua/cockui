var app = getApp();
var customerService = require('../../service/customer.js');
var templateMessageFormIdService = require('../../service/templateMessageFormId.js');
// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    isSales:false,
    isPartner:false
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
    app.globalData.stopReLaunch = false;
    app.globalData.userInfo.id=this.prefixInteger(app.globalData.userInfo.id, 9);
    this.setData({
      userInfo: app.globalData.userInfo
    });
    var self = this;
    customerService.loadCustomerProperty(this.data.userInfo.id).then(function (res) {
      self.setData({ customerProperty: res.data });
    });
    customerService.isSales(app.globalData.userInfo.id).then(function (res) {
      if (res.data) {
        self.setData({ 'isSales': true });
      }
    });
    customerService.isPartner(app.globalData.userInfo.id).then(function (res) {
      if (res.data) {
        self.setData({ 'isPartner': true });
      }
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
  prefixInteger: function (num, length) {
    return (Array(length).join('0') + num).slice(-length);
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

  },
  test: function () {
    console.log("test");
  },
  addressManagement: function () {
    app.globalData.stopReLaunch = true;
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          console.log(JSON.stringify(res))
        },
        fail: function (err) {
          console.log(JSON.stringify(err))
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  }
})