Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 弹窗相关控制 
    layer: {
      norm: {
        show: false,
        data: { 
          "id": 2, 
          "name": "刷卡机老师第六课老师", 
          "price": "120.00", 
          "style": [
              { "name": "温度", "value": ["常温", "冰镇", "加热"], "chkIndex": 0 }, 
              { "name": "份量", "value": ["小份", "中份", "大份"], "chkIndex": 0 }, 
              { "name": "辣度", "value": ["微辣", "中辣", "麻辣"], "chkIndex": 0 }, 
              { "name": "规格", "value": ["小杯", "中杯", "大杯"], "chkIndex": 0 }
            ], 
          "curIndex": 1 
        }
      }
    },
    // 商品信息
    curItem:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "宁波研发园店",
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    let storeItem = JSON.parse(wx.getStorageSync("curItem"));
    let setData = {};
    setData["curItem"] = storeItem;
    that.setData(setData);
    console.log(storeItem);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  // 开启规格弹窗
  openStyle(event){
    let that = this;
    let index = event.currentTarget.dataset.index;
    let curItem = that.data.curItem;
    let setData = {};
    // 弹窗规格信息
    let layerNorm = {
      name: curItem.packageData.list[index].itemName,
      style: curItem.packageData.list[index].norm,
      curIndex: index
    }
    console.log(layerNorm);
    setData["layer.norm.data"] = layerNorm;
    setData["layer.norm.show"] = true;
    that.setData(setData);
  },
  // 购物车规格事件
  tapItem(event) {
    let index = event.target.dataset.index;
    let groupindex = event.target.dataset.gouropindex;
    let chkObj = {};
    chkObj["layer.norm.data.style[" + groupindex + "].chkIndex"] = index;
    this.setData(chkObj);
  },
  // 商品规格选择好了
  selectOk() {
    let that = this;
    let norm = that.data.layer.norm;
    let curIndex = norm.data.curIndex;
    let curItem = that.data.curItem;
    let tmpNorm = [];
    let setData = {};
    //筛选出当前选择的规格商品
    norm.data.style.forEach((item, index) => {
      tmpNorm.push(item.value[item.chkIndex]);
    })
    //设置规格
  },
  // 关闭规格弹窗
  closeStyle() {
    this.setData({ "layer.norm.show": false });
  },
})