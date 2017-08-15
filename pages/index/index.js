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
    userInfo: {},
    mycockUrl: "/pages/mycock/index",
    myboxUrl: '/pages/mybox/index',
    marginTop: 0,
    animateCls: 'trans'
  },
  onLoad: function () {
    console.log('onLoad');
    var self = this;
    henneryService.getRecommended().then(function (res) {
      var recommendedHennery = res.data[0];
      self.setData({
        recommendedHennery: recommendedHennery
      });
    });
  },
  onShow: function () {
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
    self.marquee();
    self.refreshInterval = setInterval(self.marquee, 60000);
  },
  marquee: function () {
    var self=this;
    if (self.animateInterval) {
      clearInterval(self.animateInterval);
    }
    self.loadStealRecord().then(function (data) {
      var i = 0;
      var count = data.length;
      self.animateInterval = setInterval(function () {
        if (i > 0) {
          self.setData({
            animateCls: 'trans'
          });
        } else {
          self.setData({
            animateCls: ''
          });
        }
        self.setData({
          'marginTop': -i * 45
        });
        i++;
        if (i == count) {
          i = 0;
        }
      }, 5000);
    });
  },
  onHide: function () {
    var self = this;
    clearInterval(self.animateInterval);
    clearInterval(self.refreshInterval);

  },
  onUnload: function () {
    this.onHide();
  },
  loadStealRecord: function () {
    var self = this;
    return stealOrderService.loadStealingOrderToday().then(function (res) {
      var stealOrders = res.data;
      self.setData({
        stealOrders: stealOrders
      });
      return stealOrders;
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
});
