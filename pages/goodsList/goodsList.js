Component({
  properties: {
    ListData: {
      type: Array,
      value: [{
        name: "奶茶",
        price: "10元",
        dis: "描述描述描述"
      }],
      observer: function (newData, oldData) {}
    }
  },
  data: {
  },
  lifetimes: {
    attached: function () {
      console.log(this.properties);
      console.log(this.data);
    }
  }
})