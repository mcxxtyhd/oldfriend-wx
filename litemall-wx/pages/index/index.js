var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');
var app = getApp();

Page({
  data: {
    imgUrls: [
      '/static/images/1.png',
      '/static/images/4.png',
      '/static/images/3.jpg'
    ],
    riqi:'',
    shijian:'',
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    xuqiuID:"",
    listData: [
    ]
  },
  onLoad: function (options) {
    var that = this;
    that.setData({                                                                                                                                                                                  
      xiuqiu: options.id,
    });
    util.request(api.chaxunxuqiu, {
      'pageNo': '2',
      'pageSize': '10',
      'searchText': ''
    }, 'GET').then(function (res) {
      // { "id": "01", "name2": "2", "name3": "3", "name4": "4", "name5": "5", "name6": "6" },
      // { "id": "7", "name2": "7", "name3": "7", "name4": "7", "name5": "7", "name6": "7" },
      that.data.listData = res.data.list;

      that.setData({
        listData: res.data.list,
      });
      for(var i = 0; i< that.data.listData.length;i++){
        
        if (that.data.listData[i].lyjRequirementBegindatetime != ""){
          console.log(that.data.listData[i]);
          that.data.riqi = that.data.listData[i].lyjRequirementBegindatetime.split("T")[0]
          that.data.shijian = that.data.listData[i].lyjRequirementBegindatetime.split("T")[1].substring(0,5)
          that.data.listData[i].lyjRequirementCreatedatetime = that.data.riqi;
          that.data.listData[i].lyjRequirementEnddatetime=that.data.shijian

        }
      }
    });
    console.log("111111111111111111111111111");
    console.log(that.data.listData);
    console.log("111111111111111111111111111");
    that.query();
  },
query(){
 
},
  changeName(e) {

    wx.getStorage({
      key: 'lyj_user_uuid',
      success(res) {
 
      }
    })
    // util.request(api.huoquyanzhengma, {
    //   phone: 18821202289,
    //   lyj_user_password:123123
    // }, 'POST').then(function (res) {
    //   this.setData({
    //     yanzhengma: e.detail.value
    //   })
    // });

    var that = this;
    that.setData({
      xuqiuID: e.currentTarget.dataset['index'],
    });
    console.log(that.data.xuqiuID);
    wx.navigateTo({
      url: "/pages/index/xuqiuxiangxi/xiangxixuqiu?category_name=" +that.data.xuqiuID,
    });
  }
})