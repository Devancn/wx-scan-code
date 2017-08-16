let app = getApp();
import untils from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 滚动到某个位置
    toView: "",
    // 当前分类
    curCategory: {
      index: 0,
      name: '',
      num: 0,
      translate: ''
    },
    // 底部信息
    footerInfo:{
      state: 0,//0：查看订单，1：选好了
      text: "查看订单"
    },
    // 多规格删除提示
    forbidTip: {
      show: false,
      offsetTop: 0,
    },
    // 弹窗相关控制 
    layer: {
      actionSheet: false,
      confirm: false,
      norm: {
        show: false,
        data: {}
      }
    },
    // 购物车统计
    cartStatistisc: {
      amount: 0,
      price: "0.00"
    },
    // 分类菜单
    categoryMenu: [
      {
        id: 1,
        name: '套餐',
        translate: 'packageData',
        num: 3
      },
      {
        id: 2,
        name: '创意甜品',
        translate: 'Dessert',
        num: 3
      },
      {
        id: 3,
        name: '美味汉堡',
        translate: 'Hamburgers',
        num: 3
      },
      {
        id: 4,
        name: '川味烤鱼',
        translate: 'Grilled fish',
        num: 3
      },
      {
        id: 5,
        name: '意大利面',
        translate: 'Spaghetti',
        num: 3
      },
      {
        id: 6,
        name: '重庆小面',
        translate: 'Noodles',
        num: 3
      },
      {
        id: 7,
        name: '麻辣龙虾',
        translate: 'Lobster',
        num: 3
      },
      {
        id: 8,
        name: '冰淇淋',
        translate: 'Ice cream',
        num: 3
      },
      {
        id: 9,
        name: '进口牛排',
        translate: 'Steak',
        num: 3
      },
      {
        id: 10,
        name: '新鲜水果',
        translate: 'Fruits',
        num: 3
      },
      {
        id: 11,
        name: '主食',
        translate: '',
        num: 3
      },
      {
        id: 12,
        name: '小吃',
        translate: '',
        num: 3
      }
    ],
    // 分类详情
    categoryDetail: [
      {
        id: 1,
        cid: 1,//分类id
        goodsName: '法式鹅肝酿果d木牛小扒220g',
        // goodsImg: '/images/img1.jpg',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683750&di=4f95ed3299d6b62fa90415410cf76cb7&imgtype=0&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fd4%2F1509%2Ff1%2F22710e549b52b.png',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: true,
        spicy: 2,
        price: "121.00",
        num: 0
      },
      {
        id: 2,
        cid: 1,
        goodsName: '刷卡机老师第六课老师',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683750&di=f7881907335b2ad535a7da8dadfbfb19&imgtype=0&src=http%3A%2F%2Fpic5.photophoto.cn%2F20071221%2F0042040377755194_b.jpg',
        goodsDesc: '胜多负少是就分类看手机离开是解放路口谁离开房间是了肯德基离开家上课了 ',
        isGood: true,
        spicy: 0,
        price: "120.00",
        num: 0,
        norm: [
          {
            name: "温度",
            value: ["常温", "冰镇", "加热"],
            chkIndex: 0
          },
          {
            name: "份量",
            value: ["小份", "中份", "大份"],
            chkIndex: 0
          },
          {
            name: "辣度",
            value: ["微辣", "中辣", "中辣"],
            chkIndex: 0
          },
          {
            name: "规格",
            value: ["小杯", "中杯", "大杯"],
            chkIndex: 0
          }
        ]
      },
      {
        id: 3,
        cid: 1,
        goodsName: '新品推荐-南美风情肉香荟比萨',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683750&di=01cecf6dd6e7ab1dedd60b70d62c75e5&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Ddfbdb4451a38534398c28f62fb7ada0b%2Ffaf2b2119313b07e2017172106d7912397dd8c75.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: false,
        spicy: 3,
        price: "106.00",
        num: 0,
        packageData: {
          combination: false,
          packageName: "整单销售",
          list: [
            { itemName: "盐烤原味新西兰青口贝" },
            { itemName: "照烧黄共鱼", norm: [{ name: "铁板做法", value: ["铁板", "盐烧"], chkIndex: 0 }, { name: "温度", value: ["常温", "冰镇", "加热"],  chkIndex: 0}], checkNorm: ["铁板", "常温"], normText:"铁板；常温"}
          ]
        }
      },
      {
        id: 4,
        cid: 2,
        goodsName: '法式鹅肝酿果木牛小扒220g',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683749&di=c2709dd76dc5c1211d554d86c5f56ff0&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D3c2d751122381f308a1485eac168267d%2Fe824b899a9014c08cc046f8c007b02087bf4f4d8.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: true,
        spicy: 2,
        price: "121.00",
        num: 0
      },
      {
        id: 5,
        cid: 2,
        goodsName: '刷卡机老师第六课老师',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683749&di=f9c0574a6f3db4af5ffa044906c42806&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D850313fbfa1f3a294ec5dd8df14cd644%2F2cf5e0fe9925bc315537b3bd54df8db1cb1370a8.jpg',
        goodsDesc: '胜多负少是就分类看手机离开是解放路口谁离开房间是了肯德基离开家上课了 ',
        isGood: true,
        spicy: 0,
        price: "120.00",
        num: 0,
        norm: [
          {
            name: "温度",
            value: ["常温", "冰镇", "加热"],
            chkIndex: 0
          },
          {
            name: "份量",
            value: ["小份", "中份", "大份"],
            chkIndex: 0
          },
          {
            name: "辣度",
            value: ["微辣", "中辣", "中辣"],
            chkIndex: 0
          },
          {
            name: "规格",
            value: ["小杯", "中杯", "大杯"],
            chkIndex: 0
          }
        ]
      },
      {
        id: 6,
        cid: 2,
        goodsName: '新品推荐-南美风情肉香荟比萨',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683749&di=f60e65d58145f92045379afc58e84711&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120528%2F188952-12052Q25F491.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: false,
        spicy: 3,
        price: "106.00",
        num: 0,
        packageData: {
          combination: true,
          packageDataName: "喷火龙霸王骨",
          groupItem: [
            {
              checkName: "小吃",
              checkNum: [2,1],//2选1
              open: true,//是否展开
              list: [
                { itemName: "够粗的美式薯条 (原味、麻辣)", checked: false },
                { itemName: "美味薯丸", checked: false }
              ]
            },
            {
              checkName: "烤肉",
              checkNum: [4, 2],//4选2
              open: true,//是否展开
              list: [
                { itemName: "招牌过木架烤三角肥牛2000g", norm: [{ name: "牛扒食法", value: ["3成熟", "5成熟", "7成熟", "9成熟", "全熟"], chkIndex: 0 },], checked: false, checkNorm: ["3成熟"], normText: "3成熟"},
                { itemName: "果木烤金蒜牛扒", norm: [{ name: "牛扒食法", value: ["3成熟", "5成熟", "7成熟", "9成熟", "全熟"], chkIndex: 0 },], checked: false, checkNorm: ["3成熟"], normText: "3成熟" },
                { itemName: "招牌过木架烤三角肥牛", norm: [{ name: "牛扒食法", value: ["3成熟", "5成熟", "7成熟", "9成熟", "全熟"], chkIndex: 0 },], checked: false, checkNorm: ["3成熟"], normText: "3成熟" },
                { itemName: "招牌过木架烤三角肥牛1000g", norm: [{ name: "牛扒食法", value: ["3成熟", "5成熟", "7成熟", "9成熟", "全熟"], chkIndex: 0 },], checked: false, checkNorm: ["3成熟"], normText: "3成熟"}
              ]
            },
            {
              checkName: "酒水",
              checkNum: [3, 2],//3选2
              open: true,//是否展开
              list: [
                { itemName: "青岛啤酒", checked: false },
                { itemName: "莫拉利白葡萄酒", checked: false },
                { itemName: "喜力啤酒", checked: false }
              ]
            },
            {
              checkName: "奇葩表情",
              checkNum: [3, 2],//3选2
              open: true,//是否展开
              list: [
                { itemName: "哈哈哈", norm: [{ name: "类型", value: ["哈", "哈哈", "哈哈哈", "哈哈哈哈"], chkIndex: 0 },], checked: false, checkNorm: ["哈"], normText: "铁板" },
                { itemName: "呵呵呵", checked: false },
                { itemName: "嘎嘎嘎", checked: false }
              ]
            }
          ]
        }
      },
      {
        id: 7,
        cid: 3,
        goodsName: '法式鹅肝酿果木牛小扒220g',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683748&di=0a73703343c5c4f06e23601cddada14d&imgtype=0&src=http%3A%2F%2Fpic41.nipic.com%2F20140510%2F9899750_121559231000_2.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: true,
        spicy: 2,
        price: "121.00",
        num: 0
      },
      {
        id: 8,
        cid: 3,
        goodsName: '刷卡机老师第六课老师',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683748&di=90fd77c8dac79af1b4a8ca23646f73ff&imgtype=0&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fd4%2F1604%2F23%2F18aa421e6240daf7.jpg_r_650x433x95_9e92532d.jpg',
        goodsDesc: '胜多负少是就分类看手机离开是解放路口谁离开房间是了肯德基离开家上课了 ',
        isGood: true,
        spicy: 0,
        price: "120.00",
        num: 0,
        norm: [
          {
            name: "温度",
            value: ["常温", "冰镇", "加热"],
            chkIndex: 0
          },
          {
            name: "份量",
            value: ["小份", "中份", "大份"],
            chkIndex: 0
          },
          {
            name: "辣度",
            value: ["微辣", "中辣", "中辣"],
            chkIndex: 0
          },
          {
            name: "规格",
            value: ["小杯", "中杯", "大杯"],
            chkIndex: 0
          }
        ]
      },
      {
        id: 9,
        cid: 3,
        goodsName: '新品推荐-南美风情肉香荟比萨',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683748&di=0470f964977a00005df538e05807389c&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F121019%2F240425-12101Z05J388.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: false,
        spicy: 3,
        price: "106.00",
        num: 0,
        packageData: true
      },
      {
        id: 10,
        cid: 4,
        goodsName: '法式鹅肝酿果木牛小扒220g',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683747&di=b0d6b463ef72b161a4d71a3f017dd7df&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F128%2Fd%2F217.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: true,
        spicy: 2,
        price: "121.00",
        num: 0
      },
      {
        id: 11,
        cid: 4,
        goodsName: '刷卡机老师第六课老师',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683747&di=bc56270e2cbb08608c063c4c319fc517&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F121020%2F240425-12102020142155.jpg',
        goodsDesc: '胜多负少是就分类看手机离开是解放路口谁离开房间是了肯德基离开家上课了 ',
        isGood: true,
        spicy: 0,
        price: "120.00",
        num: 0,
        norm: [
          {
            name: "温度",
            value: ["常温", "冰镇", "加热"],
            chkIndex: 0
          },
          {
            name: "份量",
            value: ["小份", "中份", "大份"],
            chkIndex: 0
          },
          {
            name: "辣度",
            value: ["微辣", "中辣", "中辣"],
            chkIndex: 0
          },
          {
            name: "规格",
            value: ["小杯", "中杯", "大杯"],
            chkIndex: 0
          }
        ]
      },
      {
        id: 12,
        cid: 4,
        goodsName: '新品推荐-南美风情肉香荟比萨',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683747&di=1e71bcc2bd8c110ef7446e1a2279dd6c&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F130322%2F240370-1303220PH031.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: false,
        spicy: 3,
        price: "106.00",
        num: 0,
        packageData: true
      },
      {
        id: 13,
        cid: 5,
        goodsName: '法式鹅肝酿果木牛小扒220g',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683747&di=8b3a3692bb8551782ab0ea49dd29e329&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F19%2F20%2F21%2F5684847e347a6_1024.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: true,
        spicy: 2,
        price: "121.00",
        num: 0
      },
      {
        id: 14,
        cid: 5,
        goodsName: '刷卡机老师第六课老师',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683746&di=1f0952af503c16c69f1a796e8cd9f731&imgtype=0&src=http%3A%2F%2Fpic6.nipic.com%2F20100409%2F3489957_234450061069_2.jpg',
        goodsDesc: '胜多负少是就分类看手机离开是解放路口谁离开房间是了肯德基离开家上课了 ',
        isGood: true,
        spicy: 0,
        price: "120.00",
        num: 0,
        norm: [
          {
            name: "温度",
            value: ["常温", "冰镇", "加热"],
            chkIndex: 0
          },
          {
            name: "份量",
            value: ["小份", "中份", "大份"],
            chkIndex: 0
          },
          {
            name: "辣度",
            value: ["微辣", "中辣", "中辣"],
            chkIndex: 0
          },
          {
            name: "规格",
            value: ["小杯", "中杯", "大杯"],
            chkIndex: 0
          }
        ]
      },
      {
        id: 15,
        cid: 5,
        goodsName: '新品推荐-南美风情肉香荟比萨',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683746&di=f5d972bfc0f96ae955453f851a2fab64&imgtype=0&src=http%3A%2F%2Fwww.taopic.com%2Fuploads%2Fallimg%2F121229%2F235059-12122920554049.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: false,
        spicy: 3,
        price: "106.00",
        num: 0,
        packageData: true
      },
      {
        id: 16,
        cid: 6,
        goodsName: '法式鹅肝酿果木牛小扒220g',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683745&di=f6cd6a0abf34ad488186aa9ab348b032&imgtype=0&src=http%3A%2F%2Fimg.warting.com%2Fallimg%2F2016%2F0129%2Fxslbup2kz4x-271.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: true,
        spicy: 2,
        price: "121.00",
        num: 0
      },
      {
        id: 17,
        cid: 6,
        goodsName: '刷卡机老师第六课老师',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683745&di=8d822e707b7d0373abba8dc932b51183&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F148%2Fd%2F116.jpg',
        goodsDesc: '胜多负少是就分类看手机离开是解放路口谁离开房间是了肯德基离开家上课了 ',
        isGood: true,
        spicy: 0,
        price: "120.00",
        num: 0,
        norm: [
          {
            name: "温度",
            value: ["常温", "冰镇", "加热"],
            chkIndex: 0
          },
          {
            name: "份量",
            value: ["小份", "中份", "大份"],
            chkIndex: 0
          },
          {
            name: "辣度",
            value: ["微辣", "中辣", "中辣"],
            chkIndex: 0
          },
          {
            name: "规格",
            value: ["小杯", "中杯", "大杯"],
            chkIndex: 0
          }
        ]
      },
      {
        id: 18,
        cid: 6,
        goodsName: '新品推荐-南美风情肉香荟比萨',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683745&di=431c5406a495a2d47126c12ea3c845b1&imgtype=0&src=http%3A%2F%2Fimg.warting.com%2Fallimg%2F2016%2F0129%2Fho3il3wn3ja-326.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: false,
        spicy: 3,
        price: "106.00",
        num: 0,
        packageData: true
      },
      {
        id: 19,
        cid: 7,
        goodsName: '法式鹅肝酿果木牛小扒220g',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683745&di=cde1b5357a13f8b0ab43297441897b0c&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads%2Fsc%2Fjpgs%2F05%2Fxpic6826_sc115.com.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: true,
        spicy: 7,
        price: "121.00",
        num: 0
      },
      {
        id: 20,
        cid: 7,
        goodsName: '刷卡机老师第六课老师',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683744&di=46586e0967bff3171e4ce54810166614&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F130828%2F240425-130RPQ94762.jpg',
        goodsDesc: '胜多负少是就分类看手机离开是解放路口谁离开房间是了肯德基离开家上课了 ',
        isGood: true,
        spicy: 0,
        price: "120.00",
        num: 0,
        norm: [
          {
            name: "温度",
            value: ["常温", "冰镇", "加热"],
            chkIndex: 0
          },
          {
            name: "份量",
            value: ["小份", "中份", "大份"],
            chkIndex: 0
          },
          {
            name: "辣度",
            value: ["微辣", "中辣", "中辣"],
            chkIndex: 0
          },
          {
            name: "规格",
            value: ["小杯", "中杯", "大杯"],
            chkIndex: 0
          }
        ]
      },
      {
        id: 21,
        cid: 7,
        goodsName: '新品推荐-南美风情肉香荟比萨',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683744&di=a34630722fcaab35946a540111be68e0&imgtype=0&src=http%3A%2F%2Fwww.pp3.cn%2Fuploads%2F201701%2F2017010902.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: false,
        spicy: 3,
        price: "106.00",
        num: 0,
        packageData: true
      },
      {
        id: 22,
        cid: 8,
        goodsName: '法式鹅肝酿果木牛小扒220g',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825683743&di=f2bea31428057aa2dee2cb64cea07450&imgtype=0&src=http%3A%2F%2Fpic2.ooopic.com%2F13%2F42%2F28%2F45bOOOPIC42_1024.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: true,
        spicy: 2,
        price: "121.00",
        num: 0
      },
      {
        id: 23,
        cid: 8,
        goodsName: '刷卡机老师第六课老师',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825883633&di=085d2a8985ba86506041baf939b0f0b8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201607%2F14%2F20160714163555_JSY5c.gif',
        goodsDesc: '胜多负少是就分类看手机离开是解放路口谁离开房间是了肯德基离开家上课了 ',
        isGood: true,
        spicy: 0,
        price: "120.00",
        num: 0,
        norm: [
          {
            name: "温度",
            value: ["常温", "冰镇", "加热"],
            chkIndex: 0
          },
          {
            name: "份量",
            value: ["小份", "中份", "大份"],
            chkIndex: 0
          },
          {
            name: "辣度",
            value: ["微辣", "中辣", "中辣"],
            chkIndex: 0
          },
          {
            name: "规格",
            value: ["小杯", "中杯", "大杯"],
            chkIndex: 0
          }
        ]
      },
      {
        id: 24,
        cid: 8,
        goodsName: '新品推荐-南美风情肉香荟比萨',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825883633&di=a1242fea10085f7fc15ce2d7262afddc&imgtype=0&src=http%3A%2F%2Fimg3.3lian.com%2F2013%2Fc2%2F74%2Fd%2F90.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: false,
        spicy: 3,
        price: "106.00",
        num: 0,
        packageData: true
      },
      {
        id: 25,
        cid: 9,
        goodsName: '法式鹅肝酿果木牛小扒220g',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825883633&di=b2fc7f37aebd6731116cf92799a822af&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F140811%2F235049-140Q10P34758.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: true,
        spicy: 2,
        price: "121.00",
        num: 0
      },
      {
        id: 26,
        cid: 9,
        goodsName: '刷卡机老师第六课老师',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825883633&di=514db7117d9b5c940b5e5abfe7795315&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20160530%2Ftooopen_sy_163678236126.jpg',
        goodsDesc: '胜多负少是就分类看手机离开是解放路口谁离开房间是了肯德基离开家上课了 ',
        isGood: true,
        spicy: 0,
        price: "120.00",
        num: 0,
        norm: [
          {
            name: "温度",
            value: ["常温", "冰镇", "加热"],
            chkIndex: 0
          },
          {
            name: "份量",
            value: ["小份", "中份", "大份"],
            chkIndex: 0
          },
          {
            name: "辣度",
            value: ["微辣", "中辣", "中辣"],
            chkIndex: 0
          },
          {
            name: "规格",
            value: ["小杯", "中杯", "大杯"],
            chkIndex: 0
          }
        ]
      },
      {
        id: 27,
        cid: 9,
        goodsName: '新品推荐-南美风情肉香荟比萨',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825883633&di=78f61bf3546b87733b61869cece2436e&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F79%2Fd%2F55.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: false,
        spicy: 3,
        price: "106.00",
        num: 0,
        packageData: true
      },
      {
        id: 28,
        cid: 10,
        goodsName: '法式鹅肝酿果木牛小扒220g',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825883632&di=1a5200ca0d0f56d0ef9c07bd08b7b0a4&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F121016%2F240425-12101621262648.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: true,
        spicy: 2,
        price: "121.00",
        num: 0
      },
      {
        id: 29,
        cid: 10,
        goodsName: '刷卡机老师第六课老师',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825883632&di=60f155786e082718c7084bd3a1fe4905&imgtype=0&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fd2%2F1512%2F23%2F91ca417ef0d39ef7.jpg_r_650x487x95_a359b435.jpg',
        goodsDesc: '胜多负少是就分类看手机离开是解放路口谁离开房间是了肯德基离开家上课了 ',
        isGood: true,
        spicy: 0,
        price: "120.00",
        num: 0,
        norm: [
          {
            name: "温度",
            value: ["常温", "冰镇", "加热"],
            chkIndex: 0
          },
          {
            name: "份量",
            value: ["小份", "中份", "大份"],
            chkIndex: 0
          },
          {
            name: "辣度",
            value: ["微辣", "中辣", "中辣"],
            chkIndex: 0
          },
          {
            name: "规格",
            value: ["小杯", "中杯", "大杯"],
            chkIndex: 0
          }
        ]
      },
      {
        id: 30,
        cid: 10,
        goodsName: '新品推荐-南美风情肉香荟比萨',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825883632&di=616d53c006fe4d9c81721310595bca57&imgtype=0&src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F811%2F112614113358%2F141126113358-16.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: false,
        spicy: 3,
        price: "106.00",
        num: 0,
        packageData: true
      },
      {
        id: 31,
        cid: 11,
        goodsName: '法式鹅肝酿果木牛小扒220g',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825883631&di=5c2cf63690ec3a1d3a11b0b9f1e314cd&imgtype=0&src=http%3A%2F%2Fimg01.taopic.com%2F151211%2F240420-1512110Z44073.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: true,
        spicy: 2,
        price: "121.00",
        num: 0
      },
      {
        id: 32,
        cid: 11,
        goodsName: '刷卡机老师第六课老师',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825883631&di=18a7ba18ec57cf1dfea1c585d4bca83f&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F121017%2F240425-12101H0164835.jpg',
        goodsDesc: '胜多负少是就分类看手机离开是解放路口谁离开房间是了肯德基离开家上课了 ',
        isGood: true,
        spicy: 0,
        price: "120.00",
        num: 0,
        norm: [
          {
            name: "温度",
            value: ["常温", "冰镇", "加热"],
            chkIndex: 0
          },
          {
            name: "份量",
            value: ["小份", "中份", "大份"],
            chkIndex: 0
          },
          {
            name: "辣度",
            value: ["微辣", "中辣", "中辣"],
            chkIndex: 0
          },
          {
            name: "规格",
            value: ["小杯", "中杯", "大杯"],
            chkIndex: 0
          }
        ]
      },
      {
        id: 33,
        cid: 11,
        goodsName: '新品推荐-南美风情肉香荟比萨',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825883630&di=cf2b163c0572fbbc9aa60ff27f92f166&imgtype=0&src=http%3A%2F%2Fstatic.huihenduo.cn%2Fpublic%2Fattachment%2F201308%2F27%2F13%2F521c3adad0c03.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: false,
        spicy: 3,
        price: "106.00",
        num: 0,
        packageData: true
      },
      {
        id: 34,
        cid: 12,
        goodsName: '法式鹅肝酿果木牛小扒220g',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825883629&di=565d81f6e822aaa793035cce563ad176&imgtype=0&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fd1%2F201406%2F09%2F528709930ecada50ddb12cfb.jpg_r_650x433x95_8f3ecee8.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: true,
        spicy: 2,
        price: "121.00",
        num: 0
      },
      {
        id: 35,
        cid: 12,
        goodsName: '刷卡机老师第六课老师',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825883628&di=3e347895d1e36edb32a7250e042c930f&imgtype=0&src=http%3A%2F%2Fpic122.nipic.com%2Ffile%2F20170216%2F20860925_111709363000_2.jpg',
        goodsDesc: '胜多负少是就分类看手机离开是解放路口谁离开房间是了肯德基离开家上课了 ',
        isGood: true,
        spicy: 0,
        price: "120.00",
        num: 0,
        norm: [
          {
            name: "温度",
            value: ["常温", "冰镇", "加热"],
            chkIndex: 0
          },
          {
            name: "份量",
            value: ["小份", "中份", "大份"],
            chkIndex: 0
          },
          {
            name: "辣度",
            value: ["微辣", "中辣", "中辣"],
            chkIndex: 0
          },
          {
            name: "规格",
            value: ["小杯", "中杯", "大杯"],
            chkIndex: 0
          }
        ]
      },
      {
        id: 36,
        cid: 12,
        goodsName: '新品推荐-南美风情肉香荟比萨',
        goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501825883628&di=f8c0e48c479e515a94c88dc04cdad4b3&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F30%2Fd%2F130.jpg',
        goodsDesc: '精心挑选肉质厚实的本地鸡，味道.很赞特别推荐！鸡肉味道很赞，味道很赞特别推荐！',
        isGood: false,
        spicy: 3,
        price: "106.00",
        num: 0,
        packageData: true
      },
    ],
    //购物车列表
    carList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: "宁波研发园店",
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let that = this;
    let categoryMenu = that.data.categoryMenu;
    let curCategory = categoryMenu[0];
    let categoryDetail = that.data.categoryDetail;
    let setData = {};
    let curItem;
    let carList;
    let curIndex;
    let findItem;
    let curItemStr;
    let findItemStr;
    curCategory.index = 0;
    // 设置当前分类
    setData["curCategory"] = curCategory;
    //获取storage信息
    curItem = wx.getStorageSync("curItem");
    if (curItem) {
      console.log(curItem);
      curItem = JSON.parse(wx.getStorageSync("curItem"));
      carList = JSON.parse(wx.getStorageSync("carList"));
      curIndex = categoryDetail.findIndex((item) => {
        return item.id === curItem.id;
      });
      // 判断当前商品是否存在购物车
      findItem = carList.find((item) => {
        return item.id === curItem.id;
      });
      if (findItem) {
        // 是否组合套餐
        if (curItem.packageData.combination) {
          curItemStr = JSON.stringify(curItem.packageData.groupItem);
          findItemStr = JSON.stringify(findItem.packageData.groupItem);
          if (curItemStr === findItemStr) {
            carList.map((item)=>{
              if (item.id === curItem.id) {
                item.num += 1;
              }
            });
          } else {
            carList.unshift({
              id: curItem.id, //商品列表id
              curIndex: curIndex, //商品列表下标
              name: curItem.goodsName, //商品名称
              price: curItem.price, //商品价格
              num: 1, //商品数量
              packageData: curItem.packageData
            })
          }
        }
      } else {
        carList.unshift({
          id: curItem.id, //商品列表id
          curIndex: curIndex, //商品列表下标
          name: curItem.goodsName, //商品名称
          price: curItem.price, //商品价格
          num: 1, //商品数量
          packageData: curItem.packageData
        })
      }
      categoryDetail[curIndex].num += 1;
      setData["carList"] = carList
      setData["categoryDetail"] = categoryDetail
      that.cartCount(setData, curIndex, "add");
      wx.removeStorageSync("curItem");
      wx.removeStorageSync("carList");
    }
    //设置data
    that.setData(setData);
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  // 分类选择
  switchTab(event) {
    let that = this;
    let setData = {};
    let view = event.currentTarget.dataset.view;
    let index = event.currentTarget.dataset.index
    let categoryMenu = that.data.categoryMenu;
    setData["toView"] = view;
    setData["curCategory"] = categoryMenu[index];
    setData["curCategory.index"] = index;
    that.setData(setData);
  },
  showCar() {
    let that = this;
    this.setData({ "layer.actionSheet": !that.data.layer.actionSheet })
  },
  // 清空购物车
  emptyCart() {
    let that = this;
    this.setData({ "layer.confirm": true })
  },
  // 取消清空购物车
  cancelAction() {
    this.setData({ "layer.confirm": false })
  },
  // 触发遮罩层关闭弹窗
  closeActionSheet() {
    this.setData({ "layer.actionSheet": false });
  },
  // 确认清空购物车
  confirmAction() {
    var that = this;
    let categoryDetail = that.data.categoryDetail;
    let cartStatistisc = that.data.cartStatistisc;
    let footerInfo = that.data.footerInfo;
    let setData = {};
    cartStatistisc.amount = 0;
    cartStatistisc.price = '0.00';
    setData["carList"] = [];//清空购物车
    footerInfo.state = 0;
    footerInfo.text = "查看订单";
    setData["footerInfo"] = footerInfo;
    setData["layer.confirm"] = false;//关闭清空购物车弹窗
    setData["layer.actionSheet"] = false;//关闭购物车弹窗
    setData["categoryDetail"] = categoryDetail;//商品列表数量复原
    setData["cartStatistisc"] = cartStatistisc;//购物车统计清空
    // 把categoryDetail所有对象num不为0的设置为0
    categoryDetail.forEach((item, index) => {
      if (item.num !== 0) {
        categoryDetail[index].num = 0
      }
    })
    setData["categoryDetail"] = categoryDetail;//商品列表数量复原
    that.setData(setData);
  },
  // 商品列表按钮控制器
  goodsHandle(event) {
    let that = this;
    let curIndex = event.target.dataset.itemindex
    let curItem = that.data.categoryDetail[curIndex];
    let carList = that.data.carList;
    let control = event.target.dataset.control;
    let setData = {};
    // 是否多规格
    if (curItem.norm) {
      // 弹窗规格信息
      let layerNorm = {
        id: curItem.id,
        name: curItem.goodsName,
        price: curItem.price,
        style: curItem.norm,
        curIndex: curIndex
      }
      that.setData({ "layer.norm.data": layerNorm, "layer.norm.show": true });
    } else {
      let index = that.existCart(curItem);
      // 是否存在购物车中
      if (index !== -1) {
        //是否为减少 
        if (control === "red") {
          if (curItem.num === 1) {
            carList.splice(index, 1)
            setData["carList"] = carList;
            setData["categoryDetail[" + curIndex + "].num"] = curItem.num - 1;
            that.cartCount(setData, curIndex, control);
            return false;
          } else {
            setData["carList[" + index + "].num"] = carList[index].num - 1;
            setData["categoryDetail[" + curIndex + "].num"] = curItem.num - 1;
          }
        } else {
          setData["carList[" + index + "].num"] = carList[index].num + 1;
          setData["categoryDetail[" + curIndex + "].num"] = curItem.num + 1;
        }
      } else {
        // 是否为添加
        if (control === "add") {
          carList.unshift({
            id: curItem.id, //商品列表id
            curIndex: curIndex, //商品列表下标
            name: curItem.goodsName, //商品名称
            price: curItem.price, //商品价格
            num: curItem.num + 1, //商品数量
          })
          setData["categoryDetail[" + curIndex + "].num"] = curItem.num + 1;
          setData["carList"] = carList
        }
      }
      that.cartCount(setData, curIndex, control);
    }
  },
  //购物车列表控制器按钮
  cartHandle(event) {
    let that = this;
    let index = event.target.dataset.index;
    let control = event.target.dataset.control;
    let carList = that.data.carList;
    let curIndex = carList[index].curIndex;
    let curItem = that.data.categoryDetail[curIndex];
    let setData = {};
    if (control === "red") {
      if (carList[index].num === 1) {
        carList.splice(index, 1)
        setData["carList"] = carList;
        setData["categoryDetail[" + curIndex + "].num"] = curItem.num - 1;
        that.cartCount(setData, curIndex, control);
        return false;
      } else {
        setData["carList[" + index + "].num"] = carList[index].num - 1;
        setData["categoryDetail[" + curIndex + "].num"] = curItem.num - 1;
      }
    } else {
      setData["carList[" + index + "].num"] = carList[index].num + 1;
      setData["categoryDetail[" + curIndex + "].num"] = curItem.num + 1;
    }
    that.cartCount(setData, curIndex, control);
  },
  // 购物车价格和总数量统计
  /**
   * setData： 传入setData对象
   * curIndex: 商品列表的index
   * control： 是添加还是减少
   */
  cartCount(setData, curIndex, control) {
    let that = this;
    let carList = that.data.carList;
    let cartStatistisc = that.data.cartStatistisc;
    let curItem = that.data.categoryDetail[curIndex];
    let footerInfo = that.data.footerInfo;
    //把总价转为数字型
    let tmpNum = cartStatistisc.amount
    let tmpPrice = Number(cartStatistisc.price);
    let curPrice = Number(curItem.price);
    if (control === "red") {
      tmpNum -= 1;
      tmpPrice -= curPrice;
    } else {
      tmpNum += 1;
      tmpPrice += curPrice;
    }
    //计算最后把总价转为字符型
    tmpPrice = tmpPrice.toFixed(2);
    cartStatistisc.price = tmpPrice;
    cartStatistisc.amount = tmpNum;
    setData["cartStatistisc"] = cartStatistisc;
    if (cartStatistisc.amount > 0) {
      footerInfo.state = 1;
      footerInfo.text = "选好了";
    }else{
      footerInfo.state = 0;
      footerInfo.text = "查看订单";
    }
    setData["footerInfo"] = footerInfo;
    that.setData(setData);
  },
  // 关闭规格弹窗
  closeStyle() {
    this.setData({ "layer.norm.show": false });
  },
  // 商品是否存在购物车
  existCart(item, norm) {
    let that = this;
    let carList = that.data.carList;
    return carList.findIndex((list) => {
      if (norm) {
        //是多规格商品时，判断商品id是不是同一个，再判断选在的商品规格是否在购物车已经存在
        return list.id === item.id && untils.sameArray(list.norm, norm)
      } else {
        return list.id === item.id
      }
    })
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
    let curItem = that.data.categoryDetail[curIndex];
    let carList = that.data.carList;
    let tmpNorm = [];
    let setData = {};
    //筛选出当前选择的规格商品
    norm.data.style.forEach((item, index) => {
      tmpNorm.push(item.value[item.chkIndex]);
    })
    let index = that.existCart(curItem, tmpNorm);
    // 该商品是否存在购物车中
    if (index !== -1) {
      setData["carList[" + index + "].num"] = carList[index].num + 1;
      setData["categoryDetail[" + curIndex + "].num"] = curItem.num + 1;
    } else {
      carList.unshift({
        id: curItem.id, //商品列表id
        curIndex: curIndex, //商品列表下标
        name: curItem.goodsName, //商品名称
        price: curItem.price, //商品价格
        num: 1, //商品数量,
        norm: tmpNorm, //商品规格
        normText: tmpNorm.join("；")
      })
      setData["carList"] = carList;
      setData["categoryDetail[" + curIndex + "].num"] = curItem.num + 1;
    }
    setData["layer.norm.show"] = false;
    that.cartCount(setData, curIndex, "add");
  },
  //禁止删除
  forbidDel(event) {
    let that = this;
    let setData = {};
    if (that.data.forbidTip.show) return;
    setData["forbidTip.show"] = true;
    setData["forbidTip.offsetTop"] = event.target.offsetTop - 30;
    that.setData(setData);
    setTimeout(() => {
      setData["forbidTip.show"] = false;
      setData["forbidTip.offsetTop"] = 0;
      that.setData(setData);
    }, 1500);
  },
  // 选择套餐
  navigatorHandle(event) {
    let that = this;
 
    let curIndex = event.target.dataset.itemindex
    let curItem = that.data.categoryDetail[curIndex];
    let carList = that.data.carList;
    // 把当前选择的套餐保存在本地
    wx.setStorageSync("curItem", JSON.stringify(curItem));
    wx.setStorageSync("carList", JSON.stringify(carList));
    wx.navigateTo({
      url: '/pages/package/package'
    });
  },
  // 查看订单
  viewOrder(){
    wx.navigateTo({
      url: '/pages/order/order',
    })
  }
})