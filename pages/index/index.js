var app = getApp();
Page({
  onLoad: function () {
    console.log(app.globalData.token); //全局变量值的获取
  },

  data: {
    array: [{
      mode: 'widthFix'
    }],
    src: 'https://www.goodb2b.cn/xdxd_file/head_top.jpg',
    imgUrls: [
      '../../images/discover_1.jpg',
      '../../images/discover_2.jpg',
      '../../images/discover_3.jpg'
    ],
    indicatorDots: false, //是否显示指示点
    vertical: false, //滑动方向是否为纵向
    autoplay: true, //是否自动切换
    circular: false, //是否采用衔接滑动
    interval: 2000, //自动切换时间间隔
    duration: 500, //滑动动画时长
    previousMargin: 0, //前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    nextMargin: 0 //后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
  }
})