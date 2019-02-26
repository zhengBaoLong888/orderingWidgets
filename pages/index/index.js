var app = getApp();
Page({
  data:{
    name:"123",
    ky:"222"
  },
  onLoad: function () {
    console.log(app.globalData.token); //全局变量值的获取
  }
})