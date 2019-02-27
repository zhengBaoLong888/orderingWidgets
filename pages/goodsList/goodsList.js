Component({
  properties: {
    ListData: {
      type: Array,
      value: [],
    }
  },
  data: {
    naicha: [{
        url: "../../images/evaluate_5.png",
        name: "珍珠奶茶",
        price: "10元",
        dis: "描述描述描述"
      },
      {
        url: "../../images/evaluate_5.png",
        name: "奶茶2",
        price: "20元",
        dis: "描述描述描述2"
      }
    ],
    type: [{
        name: "奶茶"
      },
      {
        name: "咖啡"
      },
      {
        name: "果汁"
      }
    ],
    setHeight:"31vh"
  },
  lifetimes: {
    attached: function () { //组件生命周期函数，在组件实例进入页面节点树时执行
      console.log(this.properties);
      console.log(this.data);
    }
  },
  methods: {
    currentTab: function (e) {
      console.log(e.target.dataset.index);
      if (e.target.dataset.index == 0) {
        this.setData({
          naicha: [{
              url: "../../images/evaluate_5.png",
              name: "珍珠奶茶",
              price: "10元",
              dis: "描述描述描述"
            },
            {
              url: "../../images/evaluate_5.png",
              name: "奶茶2",
              price: "20元",
              dis: "描述描述描述2"
            }
          ],
        })
      } else if (e.target.dataset.index == 1) {
        this.setData({
          naicha: [{
              url: "../../images/evaluate_5.png",
              name: "咖啡1",
              price: "10元",
              dis: "描述描述描述"
            },
            {
              url: "../../images/evaluate_5.png",
              name: "卡布奇诺",
              price: "20元",
              dis: "描述描述描述2"
            }
          ],
        })
      } else if (e.target.dataset.index == 2) {
        this.setData({
          naicha: [{
              url: "../../images/evaluate_5.png",
              name: "果汁1",
              price: "10元",
              dis: "描述描述描述"
            },
            {
              url: "../../images/evaluate_5.png",
              name: "果汁2",
              price: "20元",
              dis: "描述描述描述2"
            }
          ],
        })
      }
    }
  }
})