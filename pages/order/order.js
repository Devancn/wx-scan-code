// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 弹窗信息
    layer: {
      diningData: {
        show: false,
        total: [],
        current: 0,
        num: 0,
      },
      removeGood:{
        show: false,
        text: ""
      },
      remarks: {
        show: false
      },
      customdata: null,
      tips: {
        show: false,
        title: "下单成功",
        text: "点餐小票已传到厨房，请耐心等待~"
      },
      repeatTips: {
        show: false
      },
      tmpMarkTxt: ""
    },
    carList: [],
    categoryMenu: [],
    orderDdata: {
      peopleNum: 0,
      goodsNum: 0,
      totalPrice: 0,
      tableNum: "A2",
    },
    curId:0,//当前操作的商品id
    orderState: 0,//0:未下单; 1未买单:
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    let carList = wx.getStorageSync("carList") ? JSON.parse(wx.getStorageSync("carList")) : [];
    let categoryMenu = wx.getStorageSync("categoryMenu") ? JSON.parse(wx.getStorageSync("categoryMenu")) : [];
    let tmpCategory = [];
    let setData = {};
    for (let i = 0; i < carList.length; i++) {
      for (let j = 0; j < categoryMenu.length; j++) {
        if (carList[i].cid === categoryMenu[j].id ) {
          tmpCategory.push(categoryMenu[j]);
        }
      }
    }
    categoryMenu = tmpCategory = Array.from(new Set(tmpCategory));
    setData["carList"] = carList;
    setData["categoryMenu"] = categoryMenu;
    console.log(JSON.stringify(setData));
    wx.removeStorageSync("carList");
    wx.removeStorageSync("categoryMenu");
    that.setData(setData);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 选择用餐人数Action
  diningAction(event) {
    let that = this;
    let data =  event ? event.currentTarget.dataset : {open: true};
    let layer = that.data.layer;
    let setData = {};
    if (layer.diningData.total.length === 0) {
      for (let i = 1; i <= 15; i++) {
        layer.diningData.total.push(i)
      }
    }
    layer.diningData.show = data.open;
    layer.diningData.current = layer.diningData.num ? layer.diningData.num : 0;
    setData["layer"] = layer;
    that.setData(setData);
  },
  //选择用餐人数
  selectItem(event) {
    let that = this;
    let data = event.currentTarget.dataset;
    let layer = that.data.layer;
    let setData = {};
    layer.diningData.current = data.num;
    setData["layer"] = layer;
    that.setData(setData);
  },
  //确定选择用餐人数
  confirmSelect() {
    let that = this;
    let layer = that.data.layer;
    let setData = {};
    layer.diningData.num = layer.diningData.current;
    layer.diningData.show = false;
    setData["layer"] = layer;
    that.setData(setData);
  },
  // 备注弹窗action
  remarkAction(event) {
    let that = this;
    let layer = that.data.layer;
    let carList = that.data.carList;
    let tmpMarkTxt = that.data.tmpMarkTxt;
    let data = event.currentTarget.dataset;
    let open = data.open
    let customdata;
    let tpId;//0普通商品类型；1: 套餐商品
    let gId ;//商品的id
    let deeepItem;
    let findItem;
    let setData = {};
    if (open) {
      customdata = data.customdata;
      tpId = customdata[0];
      gId = customdata[1][0];
      switch (tpId) {
        case 0:
          carList.find((item) => {
             if(item.id === gId){
               tmpMarkTxt = item.remarks;
             }
          });
          break;
        case 1:
          findItem = carList.find((item) => {
            return item.id === gId
          });
          //组合套餐
          if (findItem.packageData.combination) {
            findItem.packageData.groupItem.map((item, index) => {
              if (index === customdata[1][1]) {
                deeepItem = item.list.map((item1, index1) => {
                  if (index1 === customdata[1][2]) {
                    tmpMarkTxt = item1.remarks;
                  }
                })
              }
            })
          } else {
            findItem.packageData.list.map((item, index) => {
              if (index === customdata[1][1]) {
                tmpMarkTxt = item.remarks;
              }
            });
          }
          break;
      }
      setData["customdata"] = customdata;
      setData["tmpMarkTxt"] = tmpMarkTxt;
    }
    layer.remarks.show = open;
    setData["layer"] = layer;
    that.setData(setData);
  },
  //备注信息输入
  remarkInpput(event) {
    let that = this;
    let setData = {};
    let tmpMarkTxt = that.data.tmpMarkTxt;
    tmpMarkTxt = event.detail.value;
    setData["tmpMarkTxt"] = tmpMarkTxt;
    that.setData(setData);
  },
  // 备注确认
  remakConfirm() {
    let that = this;
    let layer = that.data.layer;
    let carList = that.data.carList;
    let tmpMarkTxt = that.data.tmpMarkTxt;
    let customdata = that.data.customdata;
    let tpId = customdata[0];//0普通商品类型；1: 套餐商品
    let gId = customdata[1][0];//商品的id
    let deeepItem;
    let findItem;
    let setData = {};
    switch (tpId) {
      case 0:
        carList.map((item) => {
          if (item.id === customdata[1][0]) {
            item.remarks = tmpMarkTxt;
          }
        });
        break;
      case 1:
        //组合套餐
        findItem = carList.find((item) => {
          return item.id === gId
        });
        if (findItem.packageData.combination) {
          findItem.packageData.groupItem.map((item, index) => {
            if (index === customdata[1][1]) {
              deeepItem = item.list.map((item1, index1) => {
                if (index1 === customdata[1][2]) {
                  item1.remarks = tmpMarkTxt;
                }
              })
            }
          })

        } else {
          findItem.packageData.list.map((item, index) => {
            if (index === customdata[1][1]) {
              item.remarks = tmpMarkTxt;
            }
          });
        }
        break;
    }
    layer.remarks.show = false;
    setData["carList"] = carList;
    setData["layer"] = layer;
    that.setData(setData);
  },
  // 跳转点菜页面
  navigateIndex() {
    let that = this;
    let carList = that.data.carList;
    wx.setStorageSync("carList", JSON.stringify(carList));
    wx.navigateBack();
  },
  //多人点重取消订单
  cancelOrder(){
    let that = this;
    let layer = that.data.layer;
    let setData = {};
    layer.repeatTips.show = false;
    setData["layer"] = layer;
    that.setData(setData);
  },
  asyncOrder(callback){

    callback();
  },
  //确认下单
  confirmOrder(){

  },
  //下单
  submitOrder(){
    let that = this;
    let layer = that.data.layer;
    let setData= {};
    if (!layer.diningData.num) {
      that.diningAction();
      return;
    }
    // 模拟下单成功
    layer.tips.show = true;
    setData["layer"] = layer;
    that.setData(setData);
  },
  // 下单成功
  successOrder(){
    let that = this;
    let layer = that.data.layer;
    let orderState = that.data.orderState;
    let setData = {};
    orderState=1;//设置下单成功状态
    layer.tips.show = false;
    setData["orderState"] = orderState;
    setData["layer"] = layer;
    that.setData(setData);
  },
  //取消删除商品
  cancelRemove(){
    let that = this;
    let layer = that.data.layer;
    let setData = {};
    layer.removeGood.show = false;
    setData["layer"] = layer;
    that.setData(setData);
  },
  // 确认删除商品
  confirmRemove(){
    let that = this;
    let layer = that.data.layer;
    let curId = that.data.curId;
    let carList = that.data.carList;
    let cartIndex;
    let tmpIndex;
    let setData = {};
    if (curId) {
      cartIndex = carList.findIndex((item)=>{
        return item.id === curId;
      })
      carList.splice(cartIndex, 1)
      setData["carList"] = carList;
      layer.removeGood.show = false;
      setData["layer"] = layer;
      that.setData(setData);
    }
  },
  // 商品列表按钮控制器
  goodsHandle(event){
    let that = this;
    let data = event.currentTarget.dataset;
    let customdata = data.customdata;
    let carList = that.data.carList;
    let control = customdata[0];//"add" 或者 "red"
    let curId = customdata[1];//商品id
    let layer = that.data.layer;
    let curCartIndex;
    let setData = {};
    //判断当前商品是否为1 
    //增加还是减少
    curCartIndex = carList.findIndex((item)=>{
      return item.id === curId;
    })
    if (control === 'add') {
      carList[curCartIndex].num +=1; 
    } else if (control === 'red') {
      if (carList[curCartIndex].num === 1) {
        layer.removeGood.text = `确定删除${carList[curCartIndex].goodsName}?`;
        layer.removeGood.show = true;
        setData["layer"] = layer;
        setData["curId"] = curId;
        that.setData(setData);
        return;
      }
      carList[curCartIndex].num -= 1; 
    }
    carList.map((item) => {
      if (item.id === curId) {
        item.itemPrice = (item.num * Number(item.price)).toFixed(2)
      }
    })
    setData["carList"] = carList;
    that.setData(setData);
  }
})