var app = getApp();
Page({
  onLoad: function () {
    console.log(app.globalData.token); //全局变量值的获取
  }
})