var wxe = require('../utils/wxe.js');
module.exports = {
    create: function (rewardAnimal) {
        return wxe.requestP({
            url: 'rewardAnimal/', method: 'POST',
            data: rewardAnimal
        });
    }
};