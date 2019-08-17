var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    categoryList: [],
    currentCategory: {},
    currentSubCategoryList: {},
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0
  },
  onLoad: function(options) {
    //CatalogList
    let that = this;
    // wx.showLoading({
    //   title: '加载中...',
    // });
    
    util.request(api.chaxunxuqiufulei, {
      'pageNo': '0',
      'pageSize': '10'
    }, 'GET').then(function (res) {
      // { "id": "01", "name2": "2", "name3": "3", "name4": "4", "name5": "5", "name6": "6" },
      // { "id": "7", "name2": "7", "name3": "7", "name4": "7", "name5": "7", "name6": "7" },
      console.log(res.data.list);
      that.setData({
        categoryList: res.data.list,
      });
    });
    console.log(that.data.categoryList);
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getCatalog();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  getCatalog: function() {
    
  },
  getCurrentCategory: function(id) {
    let that = this;
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  switchCate: function(e) {
    var that = this;

    util.request(api.leibieID, {
      parentId: e.currentTarget.dataset['index']
    }, 'GET').then(function (res) {
      if (res.statusCode == 200) {
        that.setData({
          currentSubCategoryList: res.data
        });
      } else {

      }
      // console.log(res);
      // that.setData({
      //   listData: res.data.list,
      // });
    });
  }
})