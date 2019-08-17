var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
var util1 = require("../../../utils/util1.js");
var app = getApp();
const date = new Date()
const years = []
const months = []
const days = []


var province = (util1.province || []).map(v => {
  return v.title
});
// 获取到的province["上海市", "江苏省", "浙江省", "安徽省", "北京市", "重庆市", ...]
var city = ((util1.city || []).filter(v => { return v.parent_code == "sh" }) || []).map(v => {
 
  return v.title
});
// 获取到的 city["黄浦区", "徐汇区", "长宁区", "静安区", "闸北区", "虹口区", "普陀区", "杨浦区",...]

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({
  data: {
    idCard: '',
    phone: '',
    workplace: '',
    juzhudi: '',
    pcIndex: '',
    country: '',
    gender: '',
    userName: '',
    date: '',
    index: 0,
    region: ["四川省", "广元市", "苍溪县"],
    array: ['中国'],
    items: [
      { name: '1', value: '男' },
      { name: '2', value: '女' },
    ],
    address: {
      id: 0,
      provinceId: 0,
      cityId: 0,
      areaId: 0,
      address: '',
      name: '',
      mobile: '',
      isDefault: 0,
      provinceName: '',
      cityName: '',
      areaName: ''
    },
    addressId: 0,
    openSelectRegion: false,
    selectRegionList: [{
      id: 0,
      name: '省份',
      pid: 1,
      type: 1
    },
    {
      id: 0,
      name: '城市',
      pid: 1,
      type: 2
    },
    {
      id: 0,
      name: '区县',
      pid: 1,
      type: 3
    }
    ],
    regionType: 1,
    regionList: [],
    selectRegionDone: false
  },
  bindinputMobile(event) {
    let address = this.data.address;
    address.mobile = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputName(e) {
    this.setData({ userName: e.detail.value });
  },
  bindinputAddress(event) {
    let address = this.data.address;
    address.address = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindIsDefault() {
    let address = this.data.address;
    address.isDefault = !address.isDefault;
    this.setData({
      address: address
    });
  },
  getAddressDetail() {
    let that = this;

  },
  setRegionDoneStatus() {
    let that = this;
    let doneStatus = that.data.selectRegionList.every(item => {
      return item.id != 0;
    });

    that.setData({
      selectRegionDone: doneStatus
    })

  },
  chooseRegion() {
    let that = this;
    this.setData({
      openSelectRegion: !this.data.openSelectRegion
    });

    //设置区域选择数据
    let address = this.data.address;
    if (address.provinceId > 0 && address.cityId > 0 && address.areaId > 0) {
      let selectRegionList = this.data.selectRegionList;
      selectRegionList[0].id = address.provinceId;
      selectRegionList[0].name = address.provinceName;
      selectRegionList[0].pid = 0;

      selectRegionList[1].id = address.cityId;
      selectRegionList[1].name = address.cityName;
      selectRegionList[1].pid = address.provinceId;

      selectRegionList[2].id = address.areaId;
      selectRegionList[2].name = address.areaName;
      selectRegionList[2].pid = address.cityId;

      this.setData({
        selectRegionList: selectRegionList,
        regionType: 3
      });

      this.getRegionList(address.cityId);
    } else {
      this.setData({
        selectRegionList: [{
          id: 0,
          name: '省份',
          pid: 0,
          type: 1
        },
        {
          id: 0,
          name: '城市',
          pid: 0,
          type: 2
        },
        {
          id: 0,
          name: '区县',
          pid: 0,
          type: 3
        }
        ],
        regionType: 1
      })
      this.getRegionList(0);
    }

    this.setRegionDoneStatus();

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    if (options.id && options.id != 0) {
      this.setData({
        addressId: options.id
      });
      this.getAddressDetail();
    }
  },
  onReady: function () {

  },
  selectRegionType(event) {
    let that = this;
    let regionTypeIndex = event.target.dataset.regionTypeIndex;
    let selectRegionList = that.data.selectRegionList;

    //判断是否可点击
    if (regionTypeIndex + 1 == this.data.regionType || (regionTypeIndex - 1 >= 0 && selectRegionList[regionTypeIndex - 1].id <= 0)) {
      return false;
    }

    this.setData({
      regionType: regionTypeIndex + 1
    })

    let selectRegionItem = selectRegionList[regionTypeIndex];

    this.getRegionList(selectRegionItem.pid);

    this.setRegionDoneStatus();

  },
  selectRegion(event) {
    let that = this;
    let regionIndex = event.target.dataset.regionIndex;
    let regionItem = this.data.regionList[regionIndex];
    let regionType = regionItem.type;
    let selectRegionList = this.data.selectRegionList;
    selectRegionList[regionType - 1] = regionItem;


    if (regionType != 3) {
      this.setData({
        selectRegionList: selectRegionList,
        regionType: regionType + 1
      })
      this.getRegionList(regionItem.id);
    } else {
      this.setData({
        selectRegionList: selectRegionList
      })
    }

    //重置下级区域为空
    selectRegionList.map((item, index) => {
      if (index > regionType - 1) {
        item.id = 0;
        item.name = index == 1 ? '城市' : '区县';
        item.pid = 0;
      }
      return item;
    });

    this.setData({
      selectRegionList: selectRegionList
    })


    that.setData({
      regionList: that.data.regionList.map(item => {

        //标记已选择的
        if (that.data.regionType == item.type && that.data.selectRegionList[that.data.regionType - 1].id == item.id) {
          item.selected = true;
        } else {
          item.selected = false;
        }

        return item;
      })
    });

    this.setRegionDoneStatus();

  },
  doneSelectRegion() {
    if (this.data.selectRegionDone === false) {
      return false;
    }

    let address = this.data.address;
    let selectRegionList = this.data.selectRegionList;
    address.provinceId = selectRegionList[0].id;
    address.cityId = selectRegionList[1].id;
    address.areaId = selectRegionList[2].id;
    address.provinceName = selectRegionList[0].name;
    address.cityName = selectRegionList[1].name;
    address.areaName = selectRegionList[2].name;

    this.setData({
      address: address,
      openSelectRegion: false
    });

  },
  cancelSelectRegion() {
    this.setData({
      openSelectRegion: false,
      regionType: this.data.regionDoneStatus ? 3 : 1
    });

  },
  getRegionList(regionId) {
    let that = this;
    let regionType = that.data.regionType;
  },
  cancelAddress() {
    wx.navigateBack();
  },
  saveAddress() {


    // if (address.name == '') {
    //   util.showErrorToast('请输入姓名');

    //   return false;
    // }

    // if (address.mobile == '') {
    //   util.showErrorToast('请输入手机号码');
    //   return false;
    // }


    // if (address.areaId == 0) {
    //   util.showErrorToast('请输入省市区');
    //   return false;
    // }

    // if (address.address == '') {
    //   util.showErrorToast('请输入详细地址');
    //   return false;
    // }

    // if (!check.isValidPhone(address.mobile)) {
    //   util.showErrorToast('手机号不正确');
    //   return false;
    // }
    console.log(this.data.pcIndex[1]);
    util.request(api.tianjiayigong, {
      "lyjUserAge": 0,
      "lyjUserBirthday": this.data.date,
      "lyjUserCountry": this.data.country,
      "lyjUserCreditid": this.data.idCard,
      "lyjUserCreditnegative": this.data.fan,
      "lyjUserCreditpositive": this.data.zheng,
      "lyjUserGender": Number(this.data.gender),
      "lyjUserId": 1,
      "lyjUserLivingplace": this.data.juzhudi,
      "lyjUserLocation": this.data.region[1],
      "lyjUserName": this.data.userName,
      "lyjUserOpenid": "string",
      "lyjUserPassword": "string",
      "lyjUserPhone": this.data.phone,
      "lyjUserRewards": 0,
      "lyjUserUuid": "string",
      "lyjUserWorkplace": this.data.workplace,
      "lyjVolunteerId": 0
    }, 'POST').then(function (res) {
      if (res.statusCode == 200) {
        console.log("1111111111");

        //返回上一级关闭当前页面
        wx.navigateBack({
          delta: 1
        })

        var pages = getCurrentPages(); // 获取页面栈
        var currPage = pages[pages.length - 1]; // 当前页面
        var prevPage = pages[pages.length - 2]; // 上一个页面
        prevPage.setData({
          status: 1,
        })
        console.log("55555555555");
      }

    });


  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  //输入性别
  radioChange(e) {
    this.setData({ gender: e.detail.value });
  },
  bindPickerChange(e) {
    this.setData({
      country: this.data.array[e.detail.value]
    })
  },
  //身份证号
  idCardInput(e) {
    this.setData({ idCard: e.detail.value });
  },
  //手机号
  phoneInput(e) {
    this.setData({ phone: e.detail.value });
  },
  //工作单位
  workplaceInput(e) {
    this.setData({ workplace: e.detail.value });
  },
  //居住地址
  juzhudiInput(e) {
    this.setData({ juzhudi: e.detail.value });
  },
})

//   shangchuanfan() {
    
//     var that = this;
//     wx.chooseImage({
//       success(res) {
//         const tempFilePaths1 = res.tempFilePaths
//         wx.uploadFile({
//           url: api.shenfenzheng, //仅为示例，非真实的接口地址
//           filePath: tempFilePaths1[0],
//           name: 'img',
//           formData: {
//             'img': 'test'
//           },
//           success(res) {
//            if(res.statusCode = 200){
//               that.data.imglist = res.data.split("data")
//             //  console.log(that.data.imglist[1])
//             //  console.log(that.data.imglist[1].substring(3, that.data.imglist[1].length-2))
//             that.setData({
//               fan: that.data.imglist[1].substring(3, that.data.imglist[1].length - 2)
//             })
//            }
//             //do something
//           }
//         })
//       }
//     })
//   },
//   shangchuanzheng() {
//     var that = this;
//     wx.chooseImage({
//       success(res) {
//         const tempFilePaths = res.tempFilePaths
//         wx.uploadFile({
//           url: api.shenfenzheng, //仅为示例，非真实的接口地址
//           filePath: tempFilePaths[0],
//           name: 'img',
//           formData: {
//             'img': 'test'
//           },
//           success(res) {
//             if (res.statusCode = 200) {
//               that.data.imglist = res.data.split("data")
//               //  console.log(that.data.imglist[1])
//               //  console.log(that.data.imglist[1].substring(3, that.data.imglist[1].length-2))
//               that.setData({
//                 zheng: that.data.imglist[1].substring(3, that.data.imglist[1].length - 2)
//               })
//             }
//           }
//         })
//       }
//     })
//   },

//   shangchuan(){
//     wx.chooseImage({
//       success(res) {
//         const tempFilePaths = res.tempFilePaths
//         wx.uploadFile({
//           url: api.shenfenzheng, //仅为示例，非真实的接口地址
//           filePath: tempFilePaths[0],
//           name: 'img',
//           formData: {
//             'img': 'test'
//           },
//           success(res) {
//             console.log(res)
//             const data = res.data
//             //do something
//           }
//         })
//       }
//     })
//   },

//   //身份证上传
//   frontimage: function () {
//     var _this = this;
//     var Type = _this.data.sourceType
//     wx.chooseImage({
//       count: 1, // 默认9 
//       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//       sourceType: Type, // 可以指定来源是相册还是相机，默认二者都有 
//       success: function (res) {
//         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
//         _this.setData({
//           FilePaths: res.tempFilePaths
//         })
//       }
//     });
//     var that = this;
//     //that.upload();
//   },
//   upload(){
//     util.request(api.shenfenzheng, {
//       test: this.data.FilePaths,
//       file: 1
//     }, 'POST').then(function (res) {
//       console.log(res);
//     });
//   },
//   // reciteimage: function () {
//   //   var _this = this;
//   //   var Type = _this.data.sourceType
//   //   wx.chooseImage({
//   //     count: 1, // 默认9 
//   //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
//   //     sourceType: Type, // 可以指定来源是相册还是相机，默认二者都有 
//   //     success: function (res) {
//   //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
//   //       _this.setData({
//   //         recitePaths: res.tempFilePaths
//   //       })
//   //     }
//   //   })
//   // },

// //身份证上传正面
//   reciteimage: function () {
//     var _this = this;
//     var Type = _this.data.sourceType

//     wx.chooseImage({
//       count: 1,
//       sizeType: ['original', 'compressed'],
//       sourceType: ['album', 'camera'],
//       success(res) {
//         console.log(res);
//         // tempFilePath可以作为img标签的src属性显示图片
//         const tempFilePaths = res.tempFilePaths
//       }
//     })
//     // wx.chooseImage({
//     //   count: 1, // 默认9 
//     //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
//     //   sourceType: Type, // 可以指定来源是相册还是相机，默认二者都有 
//     //   success: function (res) {
//     //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
//     //     _this.setData({
//     //       recitePaths: res.tempFilePaths
//     //     })
//     //   }
//     // })
//     // wx.chooseImage({
//     //   success(res) {
//     //     const tempFilePaths = res.tempFilePaths
//     //     wx.uploadFile({
//     //       url: api.shenfenzheng, //仅为示例，非真实的接口地址
//     //       filePath: tempFilePaths[0],
//     //       name: 'file',
//     //       formData: {
//     //         file:1,
//     //       },
//     //       success(res) {
//     //         const data = res.data
//     //         console.log(data);
//     //         console.log(tempFilePaths);
//     //       }
//     //     })
//     //   }
//     // })
//   },

// })