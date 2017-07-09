//index.js
//获取应用实例
var customerService = require('../../service/customer.js');
var stealOrderService = require('../../service/stealOrder.js');
var goodsForStealService = require('../../service/goodsForSteal.js');
var henneryService = require('../../service/hennery.js');
var app = getApp();
Page({
  data: {
    customerProperty: {},
    userInfo: {}
  },
  onLoad: function () {
    console.log('onLoad');

    var self = this;
    app.globalData.loadUserPromise.then(function () {
      console.log('load property');
      customerService.loadCustomerProperty(app.globalData.userInfo.id).then(function (res) {
        console.log(res);
        self.setData({ customerProperty: res.data });
        return res.data;
      }).then(function (property) {
        if (property.eligibleForSteal) {
          if (property.stealToday) {
            stealOrderService.unpaidOrder().then(function (res) {
              if (res.data) {
                self.setData({
                  stealOrder: res.data,
                  chance: 4//有订单未支付
                });
              } else {
                self.setData({
                  chance: 3//已偷过
                });
              }
            });
          } else {
            self.setData({
              chance: 2//还没偷
            });
            stealOrderService.pickHenneryToSteal().then(function (res) {
              app.globalData.stealHennery = res.data;
              self.setData({
                stealHennery: res.data
              });
              goodsForStealService.getGoodsForStealToday().then(function (res) {
                self.setData({
                  goodsForSteal: res.data
                });
              });
            });
          }
        } else {
          self.setData({
            chance: 1//没资格
          });
        }
      });
    });

    henneryService.getRecommended().then(function (res) {
      var recommendedHennery = res.data[0];
      self.setData({
        recommendedHennery: recommendedHennery
      });
    });
  },
  onShow: function () {
    var self = this;
    if (app.globalData.userInfo) {
      customerService.loadCustomerProperty(app.globalData.userInfo.id).then(function (res) {
        self.setData({ customerProperty: res.data });
        return res.data;
      });
    }
    self.marquee();
    var i = 1;
    self.interval = setInterval(function () {
      self.marquee();
      i = 0;
    }, 60000);
    var animation = wx.createAnimation({
      duration: 1000
    });

    self.interval2 = setInterval(function () {
      console.log('animate');
      if (i == 0) {
        animation.timingFunction = 'step-start';
      }
      animation.translateX(-i * 10).step();
      i++;
      self.setData({
        animationData: animation.export()
      });
    }, 1000);

  },
  onHide: function () {
    console.log('hide');
    var self = this;
    clearInterval(self.interval);
    clearInterval(self.interval2);

  },
  onUnload: function () {
    console.log('unload');
    this.onHide();
  },
  marquee: function () {
    var self = this;
    stealOrderService.loadStealingOrderToday().then(function (res) {
      var stealOrders = res.data;
      self.setData({
        stealOrders: stealOrders
      });
    });
  },
  steal: function () {
    if (this.data.stealOrder) {
      wx.navigateTo({
        url: '/pages/index/stealsuccess?id=' + this.data.stealOrder.id
      });
    }
    var property = this.data.customerProperty;
    //如果有偷盗资格
    if (property.eligibleForSteal) {
      //今天没偷
      if (!property.stealToday) {
        stealOrderService.steal(this.data.stealHennery.id).then(function (res) {
          if (res.success) {
            wx.navigateTo({
              url: '/pages/index/stealsuccess?id=' + res.data.id
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
