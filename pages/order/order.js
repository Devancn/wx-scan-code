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
      markInfo: null,
      tips: {
        show: false,
        title: "下单成功",
        text: "点餐小票已传到厨房，请耐心等待~",
        btn: ["确定"]
      },
      carList: [],
      tmpMarkTxt: ""
    },
    orderDdata: {
      peopleNum: 0,
      foodsNum: 0,
      totalPrice: 0,
      tableNum: "A2",
    },
    curId:0,//当前操作的商品id
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
      carList[i].total = carList[i].price;
      if (carList[i].packageData) {
        packages.push(carList[i]);
      } else {
        foods.push(carList[i]);
      }
    }
    setData["carList"] = carList;
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
    let packages = that.data.packages;
    let foods = that.data.foods;
    let tmpMarkTxt = that.data.tmpMarkTxt;
    let data = event.currentTarget.dataset;
    let open = data.open
    let markInfo;
    let tpId;//0普通商品类型；1: 套餐商品
    let gId ;//商品的id
    let deeepItem;
    let findItem;
    let setData = {};

    if (open) {
      markInfo = data.markinfo;
      console.log(markInfo)
      tpId = markInfo[0];
      gId = markInfo[1][0];
      switch (tpId) {
        case 0:
          foods.find((item) => {
             if(item.id === gId){
               tmpMarkTxt = item.remarks;
             }
          });
          break;
        case 1:
          findItem = packages.find((item) => {
            return item.id === gId
          });
          //组合套餐
          if (findItem.packageData.combination) {
            findItem.packageData.groupItem.map((item, index) => {
              if (index === markInfo[1][1]) {
                deeepItem = item.list.map((item1, index1) => {
                  if (index1 === markInfo[1][2]) {
                    tmpMarkTxt = item1.remarks;
                  }
                })
              }
            })
          } else {
            findItem.packageData.list.map((item, index) => {
              if (index === markInfo[1][1]) {
                tmpMarkTxt = item.remarks;
              }
            });
          }
          break;
      }
      setData["markInfo"] = markInfo;
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
    let packages = that.data.packages;
    let foods = that.data.foods;
    let tmpMarkTxt = that.data.tmpMarkTxt;
    let markInfo = that.data.markInfo;
    let tpId = markInfo[0];//0普通商品类型；1: 套餐商品
    let gId = markInfo[1][0];//商品的id
    let deeepItem;
    let findItem;
    let setData = {};
    switch (tpId) {
      case 0:
        foods.map((item) => {
          if (item.id === markInfo[1][0]) {
            item.remarks = tmpMarkTxt;
          }
        });
        setData["foods"] = foods;
        break;
      case 1:
        //组合套餐
        findItem = packages.find((item) => {
          return item.id === gId
        });
        if (findItem.packageData.combination) {
          findItem.packageData.groupItem.map((item, index) => {
            if (index === markInfo[1][1]) {
              deeepItem = item.list.map((item1, index1) => {
                if (index1 === markInfo[1][2]) {
                  item1.remarks = tmpMarkTxt;
                }
              })
            }
          })

        } else {
          findItem.packageData.list.map((item, index) => {
            if (index === markInfo[1][1]) {
              item.remarks = tmpMarkTxt;
            }
          });
        }
        setData["packages"] = packages;
        break;
    }

    layer.remarks.show = false;
    setData["layer"] = layer;
    that.setData(setData);
  },
  // 跳转点菜页面
  navigateIndex() {
    wx.navigateBack();
  },
  //下单
  submitOrder(){
    let that = this;
    let layer = that.data.layer;
    if (!layer.diningData.num) {
      that.diningAction();
      return;
    }
    console.log(123456)
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
    let packages = that.data.packages;
    let foods = that.data.foods;
    let carList = that.data.carList;
    let tpid;
    let cartIndex;
    let tmpIndex;
    let setData = {};
    if (curId) {
      cartIndex = carList.findIndex((item)=>{
        tpid = item.packageData ? 1 : 0;
        return item.id === curId;
      })
      if(tpid === 1) {
        tmpIndex = packages.findIndex((item) => {
          return item.id === curId;
        })
        packages.splice(tmpIndex, 1);
        setData["packages"] = packages;
      }else{
        tmpIndex = foods.findIndex((item) => {
          return item.id === curId;
        })
        foods.splice(tmpIndex, 1);
        setData["foods"] = foods;
      }
    }
    carList.splice(cartIndex,1)
    setData["carList"] = carList;
    layer.removeGood.show = false;
    setData["layer"] = layer;
    that.setData(setData);
    console.log(foods);
  },
  // 商品列表按钮控制器
  goodsHandle(event){
    let that = this;
    let data = event.currentTarget.dataset;
    let goodsInfo = data.goodsinfo;
    let packages = that.data.packages;
    let foods = that.data.foods;
    let tpid = goodsInfo[0];//0:主食；1:整单出售套餐，2：组合出售套餐
    let gid = goodsInfo[2];//商品id
    let layer = that.data.layer;
    let carList = that.data.carList;
    let curId = that.data.curId;
    let curTmp;
    let setData = {};
    curId = gid;
    //判断当前商品是否为1 
    //增加还是减少
    if (goodsInfo[1] === 'add') {
      carList.map((item) => {
        if (item.id === gid) {
          item.num += 1;
        }
      });
      // 主食
      if (tpid === 0) {
        foods.map((item) => {
          if (item.id === gid) {
            item.num += 1;
            item.total = (Number(item.total) + Number(item.price)).toFixed(2);
          }
        });
      //套餐
      } else {
        packages.map((item) => {
          if (item.id === gid) {
            item.num += 1;
          }
        });
      }
    } else if (goodsInfo[1] === 'red') {
      curTmp = carList.find((item) => {
        return item.id === gid
      });
      if (curTmp.num === 1) {
        layer.removeGood.text = `确定删除${curTmp.name}?`;
        layer.removeGood.show = true;
        setData["layer"] = layer;
        setData["curId"] = curId;
        that.setData(setData);
        return;
      }
      carList.map((item) => {
        if (item.id === gid) {
          item.num -= 1;
        }
      });
      // 主食
      if (tpid === 0) {
        foods.map((item) => {
          if (item.id === gid) {
            item.num -= 1;
            item.total = (Number(item.total) - Number(item.price)).toFixed(2);
          }
        });
        //套餐
      } else if (tpid === 1) {
        packages.map((item) => {
          if (item.id === gid) {
            item.num -= 1;
          }
        });
      }
    }
    setData["carList"] = carList;
    setData["foods"] = foods;
    setData["packages"] = packages;
    that.setData(setData);
  }
})