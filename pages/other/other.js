const app = getApp()
Page({
  data: {
    otherList: null
  },
  onTabItemTap: function () {
    let that = this
    wx.request({
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": app.globalData.Authorization
      },
      url: 'https://www.goodb2b.cn/robert/sale_inte/order/orderList.action',
      method: 'POST',
      data: {
        shopID: app.globalData.shopID,
        enterpriseID: app.globalData.enterpriseID,
        pinpaiID: app.globalData.pinpaiId,
        ordSource:1
      },
      success(res) {
        console.log(res)
        that.setData({
          otherList:res.data.data.rows
        })
      },
      fail(erro) {
        console.log(erro)
      }
    })
  }

});