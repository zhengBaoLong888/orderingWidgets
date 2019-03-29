const app = getApp()
Page({
  data: {
    productCategories: [],
    mode: 'widthFix',
    reply: true,
    // src: 'https://www.goodb2b.cn/xdxd_file/head_top.jpg',
    navigationIcon: '../../images/stores_5.png',
    proId: null,
    proType: null,
    product: [],
    swichet: [],
    //-----------分割线-----------
    //规格
    scales: null, //规格名称
    scalesId: null, //规格id
    //加料
    martArr: [], //加料渲染
    matsLength: 0,
    martsR: [], //购物车加料
    mats: {
      matsName: null, //加料名称
      proMatId: null, //加料id
    },
    //口味
    tastesLength: 0, //口味组长度
    tastArr: [], //购物车口味数组
    tastes: [], //渲染口味组
    //口味组1
    tastObj_1: {
      tastName: null,
      tasteId: null,
    },
    tastObj_2: {
      tastName: null,
      tasteId: null,
    },

    //口味组2

    // tastes: [],
    //-----------分割线-----------
    imgPath: null,
    name: null,
    price: null,
    ms: null,
    _num: null,
    _num2: 0,
    _num3: 0,
    typeNum: 0,
    styleClass: 'pitch',
    indicatorDots: false, //是否显示指示点
    vertical: false, //滑动方向是否为纵向
    autoplay: true, //是否自动切换
    circular: false, //是否采用衔接滑动
    interval: 2000, //自动切换时间间隔
    duration: 500, //滑动动画时长
    previousMargin: 0, //前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    nextMargin: 0, //后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
    preData: {
      shopID: null,
      enterpriseID: null,
      pinpaiID: null,
      discountType: 2,
      data: []
    },
  },
  onLoad: function () {
    let that = this;
    app.custom().then((res) => {
        wx.request({
            url: 'https://www.goodb2b.cn/robert/sale_inte/product/shopstype.action',
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded",
              "Authorization": res.Authorization
            },
            data: {
              shopID: res.shopID,
              enterpriseID: res.enterpriseID,
              pinpaiID: res.pinpaiId
            },
            success(result) {
              console.log(result)
              that.setData({
                productCategories: result.data.data,
                typeId: result.data.data[0].id
              })
            },
            fail(erro) {
              console.log(erro)
            }
          }),

          wx.request({
            url: 'https://www.goodb2b.cn/robert/sale_inte/product/offspring.action',
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded",
              "Authorization": res.Authorization
            },
            data: {
              shopID: res.shopID,
              enterpriseID: res.enterpriseID,
              pinpaiID: res.pinpaiId,
              idNode: 11
            },
            success(result) {
              that.setData({
                product: result.data.data,
              })

            },
            fail(erro) {
              console.log(erro)
            }
          }),
          wx.request({
            url: 'https://www.goodb2b.cn/robert/sale_inte/consumers/banner.action',
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded",
              "Authorization": res.Authorization
            },
            data: {
              pinpaiID: res.pinpaiId,
              fileType: 1
            },
            success(result) {
              that.setData({
                swichet: result.data.data,
              })
            },
            fail(erro) {
              console.log(erro)
            }
          })
      }),
      wx.createSelectorQuery().selectAll('.getHeight').boundingClientRect(function (rects) {
        // rects.forEach(function (rect) {
        //   rect.id // 节点的ID
        //   rect.height // 节点的高度
        // })
        let setHeightRect = rects[0].height - rects[1].height - rects[2].height - 10 + "px"
        that.setData({
          setHeight: setHeightRect
        })
      }).exec()

  },
  //渲染产品列表
  getptrList: function (e) {
    let that = this;
    wx.request({
      url: 'https://www.goodb2b.cn/robert/sale_inte/product/offspring.action',
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": app.globalData.Authorization
      },
      data: {
        shopID: app.globalData.shopID,
        enterpriseID: app.globalData.enterpriseID,
        pinpaiID: app.globalData.pinpaiId,
        idNode: e.target.dataset.id
      },
      success(result) {
        that.setData({
          typeNum: e.currentTarget.dataset.num,
          product: result.data.data
        })
      },
      fail(erro) {
        console.log(erro)
      }
    })
  },
  //口味等选择
  marks: function (e) {
    let that = this;
    wx.request({
      url: 'https://www.goodb2b.cn/robert/sale_inte/product/tasteChoose.action',
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": app.globalData.Authorization
      },
      data: {
        pinpaiID: 1,
        proId: e.currentTarget.dataset.proid,
        shopId:app.globalData.shopID
      },
      success(result) {
        that.setData({
          reply: false,
          imgPath: e.currentTarget.dataset.img,
          name: e.currentTarget.dataset.name,
          price: e.currentTarget.dataset.origionprice,
          ms: e.currentTarget.dataset.bg,
          proType: e.currentTarget.dataset.protype,
          proId: e.currentTarget.dataset.proid,
          scales: result.data.data.scales[0].scaName,
          scalesId: result.data.data.scales[0].scaleId,
          martArr: result.data.data.mats,
          matsLength: result.data.data.mats.length,
          tastes: result.data.data.tasteList,
          tastesLength: result.data.data.tasteList.length
        })
        if (result.data.data.tasteList.length == 0) {

        } else if (result.data.data.tasteList.length == 1) {
          that.setData({
            'tastObj_1.tastName': result.data.data.tasteList[0].tasteList[0].tasteName,
            'tastObj_1.tasteId': result.data.data.tasteList[0].tasteList[0].tasteId
          })
        } else if (result.data.data.tasteList.length == 2) {
          that.setData({
            'tastObj_1.tastName': result.data.data.tasteList[0].tasteList[0].tasteName,
            'tastObj_1.tasteId': result.data.data.tasteList[0].tasteList[0].tasteId,
            'tastObj_2.tastName': result.data.data.tasteList[1].tasteList[0].tasteName,
            'tastObj_2.tasteId': result.data.data.tasteList[1].tasteList[0].tasteId,
          })
        }
      },
      fail(erro) {
        console.log(erro)
      }
    })
  },
  //加料
  default: function () {
    this.setData({
      _num: null,
      styleClass: 'pitch',
      mats: {}
    })
  },
  tabSelect: function (e) {
    this.setData({
      _num: e.target.dataset.num,
      styleClass: '',
      'mats.matsName': e.target.dataset.matname,
      'mats.proMatId': e.target.dataset.promatid,
    })
  },
  //口味组1
  tabSelectTask: function (e) {
    this.setData({
      _num2: e.target.dataset.num,
      'tastObj_1.tastName': e.target.dataset.tastename,
      'tastObj_1.tasteId': e.target.dataset.tasteid,
    })
  },
  //口味组2
  tabSelectTask2: function (e) {
    this.setData({
      _num3: e.target.dataset.num,
      'tastObj_2.tastName': e.target.dataset.tastename,
      'tastObj_2.tasteId': e.target.dataset.tasteid,
    })
  },
  //取消
  cancel: function () {
    this.setData({
      reply: true
    })
  },
  load: function () {
    let that = this
    let numCount = 0
    wx.getStorageInfo({
      success(res) {
        for (var i = 0; i < res.keys.length; i++) {
          if (res.keys[i] == 'shopCatArr' || res.keys == []) {
            wx.getStorage({
              key: 'shopCatArr',
              success(res) {
                wx.request({
                  header: {
                    "content-type": "application/x-www-form-urlencoded",
                    "Authorization": app.globalData.Authorization
                  },
                  url: 'https://www.goodb2b.cn/robert/sale_inte/product/checkTrolleyPro.action',
                  method: 'POST',
                  data: {
                    'preData': JSON.stringify(res.data)
                  },
                  success(res) {
                    console.log(res)
                    that.setData({
                      hint: res.data.data.products,
                      totalPrice: res.data.data.totalPrice,
                    })
                    for (var i = 0; i < res.data.data.products.length; i++) {
                      numCount += res.data.data.products[i].num
                    }
                    wx.setTabBarBadge({
                      index: 2,
                      text: numCount.toString()
                    })
                  },
                  fail(erro) {
                    console.log(erro)
                  }
                })
              }
            })
            break
          } else {

          }
        }
      }
    })
  },

  //加入购物车
  addShopCat: function (e) {
    let that = this
    let mArr = []
    let mObj = this.data.mats
    let tArr = this.data.tastArr
    let tObj1 = this.data.tastObj_1
    let tObj2 = this.data.tastObj_2
    this.setData({
      martsR: [],
      tastArr: []
    })

    wx.getStorageInfo({
      success(res) {
        console.log(res)
        if (res.keys == undefined || res.keys.length == 0) {
          let arr = []
          console.log(arr)
          if (that.data.mats.proMatId == null) {
            that.data.martArr = []
          } else {
            mArr.push(mObj)
            that.setData({
              martsR: mArr
            })
          }
          if (that.data.tastesLength == 0) {
            that.setData({
              martsR: []
            })
          } else {
            for (var i = 0; i < that.data.tastesLength; i++) {
              if (i == 0) {
                tArr.push(tObj1);
              } else if (i == 1) {
                tArr.push(tObj2);
              }
              that.setData({
                tastArr: tArr
              })
            }
          }
          let obj = {
            proName: that.data.name,
            origionPrice: that.data.price,
            num: 1,
            proId: that.data.proId,
            proType: that.data.proType,
            mats: that.data.martsR,
            tastes: that.data.tastArr
          }
          arr.push(obj)
          that.setData({
            'preData.shopID': app.globalData.shopID,
            'preData.enterpriseID': app.globalData.enterpriseID,
            'preData.pinpaiID': app.globalData.pinpaiId,
            'preData.data': arr,
            reply: true
          })
          wx.setStorage({
            key: 'shopCatArr',
            data: that.data.preData
          })
        } else {
          wx.getStorage({
            key: 'shopCatArr',
            success(res) {
              console.log(res)
              let arr = res.data.data
              console.log(arr)
              if (that.data.mats.proMatId == null) {
                that.data.martArr = []
              } else {
                mArr.push(mObj)
                that.setData({
                  martsR: mArr
                })
              }
              if (that.data.tastesLength == 0) {
                that.setData({
                  martsR: []
                })
              } else {
                for (var i = 0; i < that.data.tastesLength; i++) {
                  if (i == 0) {
                    tArr.push(tObj1);
                  } else if (i == 1) {
                    tArr.push(tObj2);
                  }
                  that.setData({
                    tastArr: tArr
                  })
                }
              }
              let obj = {
                proName: that.data.name,
                origionPrice: that.data.price,
                num: 1,
                proId: that.data.proId,
                proType: that.data.proType,
                mats: that.data.martsR,
                tastes: that.data.tastArr
              }
              arr.push(obj)
              that.setData({
                'preData.shopID': app.globalData.shopID,
                'preData.enterpriseID': app.globalData.enterpriseID,
                'preData.pinpaiID': app.globalData.pinpaiId,
                'preData.data': arr,
                reply: true
              })
              wx.setStorage({
                key: 'shopCatArr',
                data: that.data.preData
              })
            }
          })
        }
        that.load()
      }
    })
  }

})