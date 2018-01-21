var wxe = require('../utils/wxe.js')
module.exports = {

    //用户中心-公鸡订单-转让
    loadCustomerTransferOrders: function (customer) {
        console.log(customer);
        return wxe.requestP({
            url: 'cockTransfer/example',
            method: 'POST',
            data: {
                customer: { id: customer.id },
                orderNo: null
            }
        });
    },
    //牧家货架-牧家早市
    loadOngoingTransferOrders: function () {
        return wxe.requestP({
            url: 'cockTransfer/genericQuery',
            method: 'POST',
            data: {
                example: {
                    status: 'PROCESSING',
                    transferNo: null
                },
                pageRequest: {
                    page: 0,
                    size: 10,
                    sorts: [{
                        direction: 'DESC',
                        property: 'createdTime'
                    }]
                }

            }
        });
    },
    //创建转让订单
    create: function (order) {
        return wxe.requestP({
            url: 'cockTransfer',
            method: 'POST',
            data: order
        });
    },
    releaseCockTransfer: function (id) {
        return wxe.requestP({
            url: 'cockTransfer/release/' + id, method: 'GET'
        });
    },
    getById: function (id) {
        return wxe.requestP({
            url: 'cockTransfer/' + id, method: 'GET'
        });
    }
};