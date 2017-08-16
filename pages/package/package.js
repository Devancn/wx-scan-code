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
      },
      know: {
        show: false,
        text: ""
      }
    },
    // 商品信息
    curItem: {},
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
  openStyle(event) {
    let that = this;
    let curItem = that.data.curItem;
    let layer = that.data.layer;
    let dataset = event.currentTarget.dataset;
    let index;
    let layerNorm;
    let groupIndex;
    let listIndex;
    let setData = {};
    if (curItem.packageData.combination) {
      // 组合销售弹窗规格信息
      groupIndex = dataset.groupindex;
      listIndex = dataset.listindex;
      let chkNum = curItem.packageData.groupItem[groupIndex].checkNum;
      let checked = curItem.packageData.groupItem[groupIndex].list[listIndex].checked;
      //过滤掉没有相中的项
      let filter = curItem.packageData.groupItem[groupIndex].list.filter((item)=>{
        return item.checked;
      });
      //判断当前选中的项是否已经超过了应选项并且当前项是选中状态
      if (filter.length >= chkNum[1] && !checked) {
        layer.know.text ="该组商品已选满";
        layer.know.show = true;
        setData["layer"] = layer;
        that.setData(setData);
        return;
      }
      layerNorm = {
        name: curItem.packageData.groupItem[groupIndex].list[listIndex].itemName,
        style: curItem.packageData.groupItem[groupIndex].list[listIndex].norm,
        groupIndex: groupIndex,
        listIndex: listIndex
      }
    }else{
      // 整单销售弹窗规格信息
      index = dataset.index;
      layerNorm = {
        name: curItem.packageData.list[index].itemName,
        style: curItem.packageData.list[index].norm,
        curIndex: index
      }
    }
    layer.norm.data = layerNorm;
    layer.norm.show = true;
    setData["layer"] = layer;
    that.setData(setData);
  },
  groupNorm(){

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
    let curIndex;
    let curItem = that.data.curItem;
    let tmpNorm = [];
    let setData = {};
    let groupIndex = norm.data.groupIndex;
    let listIndex = norm.data.listIndex;
    //筛选出当前选择的规格商品
    norm.data.style.forEach((item, index) => {
      tmpNorm.push(item.value[item.chkIndex]);
    })
    //组合套餐
    if (curItem.packageData.combination) {
      curItem.packageData.groupItem[groupIndex].list[listIndex].checked = true;
      curItem.packageData.groupItem[groupIndex].list[listIndex].checkNorm = tmpNorm;
      curItem.packageData.groupItem[groupIndex].list[listIndex].normText = tmpNorm.join("；");
    }else{
      curIndex = norm.data.curIndex
      curItem.packageData.list[curIndex].checkNorm = tmpNorm;
      curItem.packageData.list[curIndex].normText = tmpNorm.join("；");
    }
    setData["curItem"] = curItem;
    setData["layer.norm.show"] = false;
    that.setData(setData);

    //设置规格
  },
  // 关闭规格弹窗
  closeStyle() {
    this.setData({ "layer.norm.show": false });
  },
  // 套餐选择完毕
  packageOk() {
    let that = this;
    let curItem = that.data.curItem;
    let setData = {};
    let chkNum = 0;
    let groupItem;
    let itemLength = 0;
    let list;
    let isChecked = false;//所有商品是否都全部选择了
    let checkFlag = false;//有选择商品但没有全部选择
    let checkItem = [];
    let checkNum = 0;
    let filterItem = [];
    let checkCount = 0;
    let layer = that.data.layer;
    // 是否是组合套餐
    if (curItem.packageData.combination) {
      groupItem = curItem.packageData.groupItem;
      itemLength = groupItem.length;
      for (let i = 0; i < itemLength; i++) {
        list = groupItem[i].list;
        checkNum = groupItem[i].checkNum[1];
        filterItem = list.filter((item) => {
          return item.checked;
        });
        if (filterItem.length !== 0) {
          if (filterItem.length === checkNum) {
            checkCount++;
            checkFlag = true;
          }else {
            isChecked = false;
            checkFlag = true;
          }
        }else {
          isChecked = false;
        }
      }
      if (checkCount != itemLength) {
        if (checkFlag) {
          layer.know.text = "还没有选够哟~";
          layer.know.show = true;
          setData["layer"] = layer;
        }else {
          layer.know.text = "您还没有选择商品";
          layer.know.show = true;
          setData["layer"] = layer;
        }
        that.setData(setData);
        return;
      }
    }
    curItem.num += 1;
    // 把当前选择的套餐保存在本地
    setData["curItem"] = curItem;
    wx.setStorageSync("curItem", JSON.stringify(curItem));
    wx.navigateBack()
  },
  //控制展开收缩分组
  controlOPen(event) {
    let that = this;
    let curItem = that.data.curItem;
    let dataset = event.currentTarget.dataset;
    let index = dataset.index;
    let open = curItem.packageData.groupItem[index].open;
    let setData = {};
    curItem.packageData.groupItem[index].open = !open;
    setData["curItem"] = curItem;
    that.setData(setData);
  },
  // 重新选择
  resetSelct(event) {
    let that = this;
    let curItem = that.data.curItem;
    let dataset = event.currentTarget.dataset;
    let groupIndex = dataset.index;
    let setData = {};
    curItem["packageData"].groupItem[groupIndex].list.map((item, index)=> {
      item.checked = false;
    });
    setData["curItem"] = curItem;
    that.setData(setData);
  },
  //选择商品
  checkItem(event) {
    let that = this;
    let curItem = that.data.curItem;
    let dataset = event.currentTarget.dataset;
    let groupIndex = dataset.groupindex;
    let listIndex = dataset.listindex;
    let layer = that.data.layer;
    let setData = {};
    let chkNum = curItem.packageData.groupItem[groupIndex].checkNum;
    let checked = curItem.packageData.groupItem[groupIndex].list[listIndex].checked;
    let layerNorm;
    //过滤掉没有相中的项
    let filter = curItem.packageData.groupItem[groupIndex].list.filter((item)=>{
      return item.checked;
    });
    //选中的项大于规定项
    if (filter.length >= chkNum[1] && !checked) {
      layer.know.text = "该组商品已选满";
      layer.know.show = true;
      setData["layer"] = layer;
    }else {
      // 是否为规格商品
      if (curItem.packageData.groupItem[groupIndex].list[listIndex].norm && !checked) {
        // 规格弹窗
        layerNorm = {
          name: curItem.packageData.groupItem[groupIndex].list[listIndex].itemName,
          style: curItem.packageData.groupItem[groupIndex].list[listIndex].norm,
          groupIndex: groupIndex,
          listIndex: listIndex
        }
        layer.norm.data = layerNorm;
        layer.norm.show = true;
        setData["layer"] = layer;
      } else {
        curItem.packageData.groupItem[groupIndex].list[listIndex].checked = !checked;
        setData["curItem"] = curItem;
      }
    }
    that.setData(setData);
  },
  // 知道了弹窗
  knowHandle(){
    let that = this;
    let layer = that.data.layer;
    let setData = {};
    layer.know.text = "";
    layer.know.show = false;
    setData["layer"] = layer;
    that.setData(setData);
  }
})