// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 弹窗信息
    layer:{
      diningData: {
        show: false,
        total: [],
        current: 0,
        num: 0,
      },
      delTips:{
        show: false
      },
      remarks:{
        show: false
      },
      markInfo:null ,
      tips:{
        show: false,
        title: "下单成功",
        text: "点餐小票已传到厨房，请耐心等待~",
        btn:["确定"]
      }
    },
    orderDdata:{
      peopleNum: 0,
      foodsNum: 0,
      totalPrice: 0,
      tableNum: "A2",      
    },
    packages: [],
    foods: [],
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
    let packages = that.data.packages;
    let foods = that.data.foods;
    let carList = wx.getStorageSync("carList") ? JSON.parse(wx.getStorageSync("carList")) : [];
    let setData = {};
    for (let i = 0; i < carList.length; i++) {
      if (carList[i].packageData) {
        packages.push(carList[i]);
      }else{
        foods.push(carList[i]);
      }
    }
    setData["packages"] = packages;
    setData["foods"] = foods;
    console.log(setData);
    // wx.removeStorageSync("carList");
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
  diningAction(event){
    let that = this;
    let data = event.currentTarget.dataset;
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
  selectItem (event){
    let that = this;
    let data = event.currentTarget.dataset;
    let layer = that.data.layer;
    let setData = {};
    layer.diningData.current = data.num;
    setData["layer"] = layer;
    that.setData(setData);
  },
  //确定选择用餐人数
  confirmSelect(){
    let that = this;
    let layer = that.data.layer;
    let setData = {};
    layer.diningData.num = layer.diningData.current;
    layer.diningData.show = false;
    setData["layer"] = layer;
    that.setData(setData);
  },
  // 备注弹窗action
  remarkAction(event){
    let that = this;
    let data = event.currentTarget.dataset;
    let markInfo = data.markinfo;
    let layer = that.data.layer;
    let setData = {};
    layer.remarks.show = data.open;
    setData["layer"] = layer;
    setData["markInfo"] = markInfo;
    that.setData(setData);
  },
  // 备注确认
  remakConfirm(){
    let that = this;
    let layer = that.data.layer;
    let markInfo = that.data.markInfo;
    let setData = {};
    console.log(markInfo);
  },
  // 跳转点菜页面
  navigateIndex(){
    wx.navigateBack();
  }
})