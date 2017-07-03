//index.js
//获取应用实例
var app = getApp();
var rewardHenneryService = require('../../service/rewardHennery.js');
var henneryService = require('../../service/hennery.js');
var paymentService = require('../../service/payment.js');
Page({
  data: {
    reward: {

    },
    options: [
      { price: 0.1, text: '初来乍到一点心意' },
      { price: 0.5, text: '小小心意不成敬意' },
      { price: 1.0, text: '牧家兄弟你辛苦啦' },
      { price: 10, text: '辽阔草原有你真好' },
      { price: 20, text: '牧家臻品不仅点赞' },
      { price: 100, text: '健康食品有你放心' }
    ]
  },

  onLoad: function (options) {
    var id = options.id;
    var self = this;
    henneryService.getById(id).then(function (res) {
      self.data.reward.hennery = res.data;
    });
  },
  create: function (event) {
    var price = event.currentTarget.dataset.price;
    var reward = this.data.reward;
    reward.amount = price;
    reward.customer = app.globalData.userInfo;
    var self = this;
    //订单已创建，直接支付
    rewardHenneryService.create(reward).then(function (res) {
      var order = res.data;
      paymentService.payOrder({
        order: order,
        type: 6,
        success: function (res) {
          wx.showToast({
            title: '打赏成功',
            icon: 'success',
            duration: 2000
          });
        }
      });
    });


  }
});
