var wxe = require('../utils/wxe.js');
module.exports = {
    create: function (reward) {
        return wxe.requestP({
            url: 'rewardHennery/', method: 'POST',
            data: reward
        });
    }
};