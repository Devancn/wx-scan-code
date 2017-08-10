Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 弹窗相关控制 
    layer: {
      norm: {
        show: false,
        data: { "id": 2, "name": "刷卡机老师第六课老师", "price": "120.00", "style": [{ "name": "温度", "value": ["常温", "冰镇", "加热"], "chkIndex": 0 }, { "name": "份量", "value": ["小份", "中份", "大份"], "chkIndex": 0 }, { "name": "辣度", "value": ["微辣", "中辣", "麻辣"], "chkIndex": 0 }, { "name": "规格", "value": ["小杯", "中杯", "大杯"], "chkIndex": 0 }], "curIndex": 1 }
      }
    },
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
    wx.setNavigationBarTitle({
      title: "宁波研发园店",
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let curItem = JSON.parse(wx.getStorageSync("curItem"));
    console.log(curItem)
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
  openStyle(){
    this.setData({ "layer.norm.show": true });
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
    let tmpNorm = [];
    //筛选出当前选择的规格商品
    norm.data.style.forEach((item, index) => {
      tmpNorm.push(item.value[item.chkIndex]);
    })
    console.log(tmpNorm);
  },
  // 关闭规格弹窗
  closeStyle() {
    this.setData({ "layer.norm.show": false });
  },
})