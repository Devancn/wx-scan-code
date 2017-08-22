Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 弹窗相关控制 
    layer: {
      norm: {
        show: false,
      },
      know: {
        show: false,
        text: ""
      }
    },
    // 当前商品信息
    curGoodsItem: {},
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
    let curGoodsItem = wx.getStorageSync("curGoodsItem") ? JSON.parse(wx.getStorageSync("curGoodsItem")) : {};
    let carList = wx.getStorageSync("carList") ? JSON.parse(wx.getStorageSync("carList")) : [];
    let setData = {};
    setData["curGoodsItem"] = curGoodsItem;
    setData["carList"] = carList;
    console.log(setData);
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
    let curGoodsItem = that.data.curGoodsItem;
    let layer = that.data.layer;
    let data = event.currentTarget.dataset;
    let curListIndex = [];
    let setData = {};
    if (curGoodsItem.packageData.combination) {
      // 组合销售弹窗规格信息
      curListIndex.push(data.customdata[0]);
      curListIndex.push(data.customdata[1]);
      let chkNum = curGoodsItem.packageData.groupItem[curListIndex[0]].checkNum;
      let checked = curGoodsItem.packageData.groupItem[curListIndex[0]].list[curListIndex[1]].checked;
      //过滤掉没有相中的项
      let filter = curGoodsItem.packageData.groupItem[curListIndex[0]].list.filter((item) => {
        return item.checked;
      });
      //判断当前选中的项是否已经超过了应选项并且当前项是选中状态
      if (filter.length >= chkNum[1] && !checked) {
        layer.know.text = "该组商品已选满";
        layer.know.show = true;
        setData["layer"] = layer;
        that.setData(setData);
        return;
      }
      layer.curGoodsItem = {
        itemName: curGoodsItem.packageData.groupItem[curListIndex[0]].list[curListIndex[1]].itemName,
        norm: curGoodsItem.packageData.groupItem[curListIndex[0]].list[curListIndex[1]].norm,
        curListIndex: curListIndex
      };
    } else {
      curListIndex.push(data.customdata[0]);
      layer.curGoodsItem = {
        itemName: curGoodsItem.packageData.list[curListIndex[0]].itemName,
        norm: curGoodsItem.packageData.list[curListIndex[0]].norm,
        curListIndex: curListIndex
      };
    }
    layer.norm.show = true;
    layer.norm.curListIndex = curListIndex;
    setData["layer"] = layer;
    that.setData(setData);
  },
  // 购物车规格事件
  tapItem(event) {
    let that = this;
    let data = event.target.dataset;
    let curGroupIndex = data.customdata[0];
    let cirItemIndex = data.customdata[1];
    let layer = that.data.layer;
    let setData = {};
    layer.curGoodsItem.norm[curGroupIndex].chkIndex = cirItemIndex;
    setData["layer"] = layer;
    this.setData(setData);
  },
  // 商品规格选择好了
  selectOk() {
    let that = this;
    let curGoodsItem = that.data.curGoodsItem;
    let layer = that.data.layer;
    let norm = layer.curGoodsItem.norm;
    let curListIndex = layer.curGoodsItem.curListIndex;
    let tmpNorm = [];
    let setData = {};
    //筛选出当前选择的规格商品
    norm.forEach((item, index) => {
      tmpNorm.push(item.value[item.chkIndex]);
    })
    //组合套餐
    if (curListIndex.length === 2) {
      curGoodsItem.packageData.groupItem[curListIndex[0]].list[curListIndex[1]].checked = true;
      curGoodsItem.packageData.groupItem[curListIndex[0]].list[curListIndex[1]].checkNorm = tmpNorm;
      curGoodsItem.packageData.groupItem[curListIndex[0]].list[curListIndex[1]].normText = tmpNorm.join("；");
    } else {
      curGoodsItem.packageData.list[curListIndex[0]].checkNorm = tmpNorm;
      curGoodsItem.packageData.list[curListIndex[0]].normText = tmpNorm.join("；");
    }
    setData["curGoodsItem"] = curGoodsItem;
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
    let curGoodsItem = that.data.curGoodsItem;
    let carList = that.data.carList;
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
    let fineItem;
    let setData = {};
    // 是否是组合套餐
    if (curGoodsItem.packageData.combination) {
      groupItem = curGoodsItem.packageData.groupItem;
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
          } else {
            isChecked = false;
            checkFlag = true;
          }
        } else {
          isChecked = false;
        }
      }
      if (checkCount != itemLength) {
        if (checkFlag) {
          layer.know.text = "还没有选够哟~";
          layer.know.show = true;
          setData["layer"] = layer;
        } else {
          layer.know.text = "您还没有选择商品";
          layer.know.show = true;
          setData["layer"] = layer;
        }
       return that.setData(setData);
      }
    }
    curGoodsItem.num = 1;
    // 把当前选择的套餐保存在本地
    fineItem = carList.find((item) => {
      return item.id === curGoodsItem.id && JSON.stringify(item.packageData) === JSON.stringify(curGoodsItem.packageData);
    })
    if (fineItem) {
      carList.map((item) => {
        if (item.id === curGoodsItem.id && JSON.stringify(item.packageData) === JSON.stringify(curGoodsItem.packageData)) {
          item.num += 1;
        }
      })
    } else {
      carList.unshift(curGoodsItem)
    }
    wx.setStorageSync("curGoodsItem", JSON.stringify(curGoodsItem));
    wx.setStorageSync("carList", JSON.stringify(carList));
    wx.navigateBack()
  },
  //控制展开收缩分组
  controlOPen(event) {
    let that = this;
    let curGoodsItem = that.data.curGoodsItem;
    let data = event.currentTarget.dataset;
    let curListIndex = data.customdata;
    let open = curGoodsItem.packageData.groupItem[curListIndex[0]].open;
    let setData = {};
    curGoodsItem.packageData.groupItem[curListIndex[0]].open = !open;
    setData["curGoodsItem"] = curGoodsItem;
    that.setData(setData);
  },
  // 重新选择
  resetSelct(event) {
    let that = this;
    let curGoodsItem = that.data.curGoodsItem;
    let data = event.currentTarget.dataset;
    let curListIndex = data.customdata;
    let setData = {};
    curGoodsItem["packageData"].groupItem[curListIndex[0]].list.map((item, index) => {
      item.checked = false;
    });
    setData["curGoodsItem"] = curGoodsItem;
    that.setData(setData);
  },
  //选择商品
  checkItem(event) {
    let that = this;
    let curGoodsItem = that.data.curGoodsItem;
    let data = event.currentTarget.dataset;
    let curListIndex = data.customdata;
    let layer = that.data.layer;
    let chkNum = curGoodsItem.packageData.groupItem[curListIndex[0]].checkNum;
    let checked = curGoodsItem.packageData.groupItem[curListIndex[0]].list[curListIndex[1]].checked;
    let setData = {};

    //过滤掉没有相中的项
    let filter = curGoodsItem.packageData.groupItem[curListIndex[0]].list.filter((item) => {
      return item.checked;
    });
    //选中的项大于规定项
    if (chkNum[1] === 1 && !checked) {
      curGoodsItem.packageData.groupItem[curListIndex[0]].list.map((item) => {
        item.checked = false;
      })
      curGoodsItem.packageData.groupItem[curListIndex[0]].list[curListIndex[1]].checked = !checked;
      setData["curGoodsItem"] = curGoodsItem;
    } else if (filter.length >= chkNum[1] && !checked) {
      layer.know.text = "该组商品已选满";
      layer.know.show = true;
      setData["layer"] = layer;
    } else {
      // 是否有规格选择
      if (curGoodsItem.packageData.groupItem[curListIndex[0]].list[curListIndex[1]].norm && !checked) {
        layer.curGoodsItem = {
          itemName: curGoodsItem.packageData.groupItem[curListIndex[0]].list[curListIndex[1]].itemName,
          norm: curGoodsItem.packageData.groupItem[curListIndex[0]].list[curListIndex[1]].norm,
          curListIndex: curListIndex
        };
        layer.norm.show = true;
        setData["layer"] = layer;
      } else {
        curGoodsItem.packageData.groupItem[curListIndex[0]].list[curListIndex[1]].checked = !checked;
        setData["curGoodsItem"] = curGoodsItem;
      }
    }
    that.setData(setData);
  },
  // 知道了弹窗
  knowHandle() {
    let that = this;
    let layer = that.data.layer;
    let setData = {};
    layer.know.text = "";
    layer.know.show = false;
    setData["layer"] = layer;
    that.setData(setData);
  }
})