function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var LoadMask = {
  counter: 0,
  isShow: false,
  show: function () {
    this.counter++;
    var self = this;
    console.log(this.counter+"/"+this.isShow);
    if (!this.isShow && this.counter > 0) {

      console.log('show>');
      wx.showLoading({
        title: '加载中',
        mask: true,
        success: function () {
          console.log('show success');
          self.isShow = true;
        },
        fail: function () {
           console.log('show error');
          console.error(arguments);
        },
        complete: function () {
          console.log('show complete');
        }
      });

    }
  },
  hide: function () {
    this.counter--;
    console.log(this.counter+"/"+this.isShow);
 //   if (this.isShow && this.counter === 0) {
      console.log('hide>');
      wx.hideLoading();
      this.isShow = false;
//    }
  }
};
module.exports = {
  formatTime: formatTime,
  LoadMask: LoadMask
}
