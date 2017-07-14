// index.js
var app = getApp();
var cockAdoptionOrderService = require('../../service/cockAdoptionOrder.js');
var raisingRecordService = require('../../service/raisingRecord.js');
var moment = require('../../utils/we-moment-with-locales');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        background: ['green', 'red', 'yellow'],
        indicatorDots: true,
        vertical: false,
        autoplay: false,
        interval: 3000,
        duration: 1000,
        markers: [{
            id: 0,
            latitude: 23.099994,
            longitude: 113.324520,
            width: 20,
            height: 20,
            iconPath: '/img/s14.png'
        }]
    },

    changeIndicatorDots: function (e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        });
    },
    changeVertical: function (e) {
        this.setData({
            vertical: !this.data.vertical
        });
    },
    changeAutoplay: function (e) {
        this.setData({
            autoplay: !this.data.autoplay
        });
    },
    intervalChange: function (e) {
        this.setData({
            interval: e.detail.value
        });
    },
    durationChange: function (e) {
        this.setData({
            duration: e.detail.value
        });

    },
    changeOrder: function (e) {
        var current = e.detail.current;
        console.log(current);
        var order = this.data.orders[current];
        var markers = self.data.markers[0];
        markers.longitude = order.hennery.longitude;
        markers.latitude = order.hennery.latitude;
        this.setData({
            currentOrder: order,
            markers: [markers]
        });
        raisingRecordService.loadAdoptionRaisingRecords(self.data.currentOrder.id).then(function (res) {
            res.data.forEach(function (item) {
                item.dateStr = moment(item.paidDate).format('YYYY-MM-DD');
            });
            self.setData({
                raisingRecords: res.data
            });
        });
    },
    previewRaisingImage: function (e) {
        var id = e.currentTarget.dataset.id;
        var record = this.data.raisingRecords.find(function (item) {
            return item.id == id;
        });
        var urls = record.images.map(function (item) {
            return item.url;
        });
        wx.previewImage({
            urls: urls
        });
    },
    preview: function () {
        wx.previewImage({
            // current: 'String', // 当前显示图片的链接，不填则默认为 urls 的第一张
            urls: ['http://bbsatt.yineitong.com/forum/2011/03/25/110325164993a2105258f0d314.jpg',
                'http://img.sj33.cn/uploads/allimg/201302/1-130201105055.jpg'],
            success: function (res) {
                // success
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var self = this;
        cockAdoptionOrderService.getMyRaisingOrdersByHennery(options.id).then(function (res) {
            res.data.forEach(function (item) {
                item.dateStr = moment(item.paidDate).format('YYYY-MM-DD hh:mm');
            });
            var markers = self.data.markers[0];
            markers.longitude = res.data[0].hennery.longitude;
            markers.latitude = res.data[0].hennery.latitude;

            self.setData({
                henneryId: options.id,
                orders: res.data,
                currentOrder: res.data[0],
                markers: [markers]
            });
            raisingRecordService.loadAdoptionRaisingRecords(self.data.currentOrder.id).then(function (res) {
                res.data.forEach(function (item) {
                    item.dateStr = moment(item.paidDate).format('YYYY-MM-DD');
                });
                self.setData({
                    raisingRecords: res.data
                });
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
