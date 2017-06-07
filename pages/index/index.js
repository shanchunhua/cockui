//index.js
//获取应用实例
var customerService = require('../../service/customer.js');
var stealOrderService = require('../../service/stealOrder.js');
var app = getApp();
Page({
  data: {
    customerProperty: {},
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')

    var self = this;
    customerService.loadCustomerProperty(2).then(function (res) {
      console.log(res);
      self.setData({ customerProperty: res.data });
      return res.data;
    }).then(function(property){
      if(property.eligibleForSteal){
       return stealOrderService.pickHenneryToSteal()
      }
    }).then(function(res){
      self.setData({
        stealHennery:res.data
      });
      console.log(self.data);
    });

    /*
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })*/
  }
})
