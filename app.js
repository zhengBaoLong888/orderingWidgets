//app.js
App({
  custom: function () {
    let that = this
    return new Promise((resolve, reject) => {
      wx.login({
        success: function (res) {
          var code = res.code;
          if (code) {
            console.log("code:  " + code)
            wx.request({
              url: 'https://www.goodb2b.cn/robert/sale_inte/wxMiniLogin.action',
              method: 'GET',
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              data: {
                code: code,
                state: that.globalData.pinpaiId
              },
              success(retule) {
                console.log(retule)
                that.globalData.Authorization = "Bearer " + retule.data.data
                resolve(that.globalData);
              },
              fail(erro) {
                console.log(erro)
              }
            })
          } else {
            console.log('获取用户登录态失败：' + res.errMsg);
          }
        }
      })
    })
  },
  onLaunch: function (options) {
    let numCount = 0;
    wx.getStorageInfo({
      success(res) {
        console.log(res)
        if (res.keys[0] == undefined) {
          wx.setTabBarBadge({
            index: 2,
            text: '0'
          })
        } else {
          for (var i = 0; i < res.keys.length; i++) {
            if (res.keys[i] == 'shopCatArr') {
              wx.getStorage({
                key: 'shopCatArr',
                success(res) {
                  console.log(res)
                  for(var i=0;i<res.data.data.length;i++){
                    numCount +=res.data.data[i].num
                  }
                  console.log(numCount)
                  wx.setTabBarBadge({
                    index: 2,
                    text: numCount.toString()
                  })
                }
              })
            } else {

            }
          }
        }
      }
    })
  },


  globalData: {
    pinpaiId: 1,
    enterpriseID: 5,
    shopID: 5,
    Authorization: null,
    base: "https://www.goodb2b.cn/robert/"
  }
})