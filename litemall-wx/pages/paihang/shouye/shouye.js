var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
var app = getApp();

Page({
  data: {
    imgUrls: [
      '/static/images/1.png',
      '/static/images/4.png',
      '/static/images/3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    listData: [
      { lyjRequirementId: 1, lyjRequirementName: "1", lyjRequirementDescription: "1", lyjRequirementCreateuser: 1, lyjRequirementApplyuser: 1, }
    ]
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      xiuqiu: options.id,
    });
    util.request(api.chaxunxuqiu, {
      'pageNo': '1',
      'pageSize': '10',
      'searchText': ''
    }, 'GET').then(function (res) {
      // { "id": "01", "name2": "2", "name3": "3", "name4": "4", "name5": "5", "name6": "6" },
      // { "id": "7", "name2": "7", "name3": "7", "name4": "7", "name5": "7", "name6": "7" },
      that.data.listData = res.list;
      that.setData({
        listData: res.list,
      });
      console.log(that.data.listData);
    });
    that.query();
  },
  query() {

  },
  changeName(e) {
    var that = this;
    that.setData({
      xuqiuID: e.currentTarget.dataset['index'],
    });
    wx.navigateTo({
      url: "/pages/index/xuqiuxiangxi/xiangxixuqiu?category_name=" + that.data.xuqiuID,
    });
  }
})