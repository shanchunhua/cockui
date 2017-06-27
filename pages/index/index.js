//index.js
//获取应用实例
var customerService = require('../../service/customer.js');
var stealOrderService = require('../../service/stealOrder.js');
var goodsForStealService = require('../../service/goodsForSteal.js');

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
    console.log('onLoad');

    var self = this;
    app.globalData.loadUserPromise.then(function () {
      customerService.loadCustomerProperty(app.globalData.userInfo.id).then(function (res) {
        console.log(res);
        self.setData({ customerProperty: res.data });
        return res.data;
      }).then(function (property) {
        if (property.eligibleForSteal) {
          return stealOrderService.pickHenneryToSteal();
        }
      }).then(function (res) {
        self.setData({
          stealHennery: res.data
        });
        console.log(self.data);
      });
    });
    goodsForStealService.getGoodsForStealToday().then(function (res) {
      self.setData({
        goodsForSteal: res.data
      });
    });

  },
  steal: function () {
    var property = this.data.customerProperty;
    //如果有偷盗资格
    if (property.eligibleForSteal) {
      //今天没偷
      if (!property.stealToday) {
        stealOrderService.steal().then(function (res) {
          if (res.success) {
            wx.navigateTo({
              url: '/pages/index/stealsuccess?id='+res.data.id
            });
          } else {
            wx.navigateTo({
              url: '/pages/index/stealfailed?id=1'
            });
          }
        });
      }
    } else {//没有偷盗资格，去领养红公鸡

    }
  }
})
