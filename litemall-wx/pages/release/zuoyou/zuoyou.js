var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({
  data: {
    navLeftItems: [],
    navRightItems: [],
    list:[],
    curNav: 1,
    curIndex: 0,
    xuqiuID:'',
    xuqiuname:''
  },
  onLoad: function () {
    // 加载的使用进行网络访问，把需要的数据设置到data数据对象
    var that = this
    wx.request({
      url: 'http://localhost:8888/RquirementType',
      method: 'GET',
      data: {
        "pageNo": 0,
        "pageSize": 10
      },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        
        for ( var i = 0; i < res.data.data.list.length; i++) {
          if (res.data.data.list[i].lyjRequirementTypeparentid == 0){
            that.data.navLeftItems.push(res.data.data.list[i]);
          }
        }
        that.setData({
          navLeftItems: that.data.navLeftItems,
          list:res.data.data.list
        })
        console.log(that.data.navLeftItems);
        // console.log("111111111111");
        // console.log(res.data.data.list);
        // that.setData({
        //   navLeftItems: res.data.data.list,
        // })
      }
    })
  },

  //事件处理函数
  switchRightTab(e) {
    var that = this;
    util.request(api.leibieID, {
      parentId: e.currentTarget.dataset['index']
    }, 'GET').then(function (res) {
      // { "id": "01", "name2": "2", "name3": "3", "name4": "4", "name5": "5", "name6": "6" },
      // { "id": "7", "name2": "7", "name3": "7", "name4": "7", "name5": "7", "name6": "7" },
      if(res.statusCode == 200){
        //console.log(res.data);
        that.setData({
          navRightItems: res.data,
          list:res.data
      });
      }else{

      }
      // console.log(res);
      // that.setData({
      //   listData: res.data.list,
      // });
    });

    // var that = this;
    // that.setData({
    //   navRightItems:[]
    // })
    // // 获取item项的id，和数组的下标值
    // for (var i = 0; i < this.data.list.length; i++) {
    //   if (this.data.list[i].lyjRequirementTypeparentid == e.target.dataset.id) {
    //     that.data.navRightItems.push(this.data.list[i]);
    //   }
    // }
    // that.setData({
    //   navRightItems: that.data.navRightItems
    // })
    // console.log(this.data.navRightItems)
    // let id = e.target.dataset.id,
    //   index = parseInt(e.target.dataset.index);
    // // 把点击到的某一项，设为当前index
    // this.setData({
    //   curNav: id,
    //   curIndex: index
    // })
  },
  changeName(e) {

    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].lyjRequirementTypeid == e.currentTarget.dataset['index']) {
       
          this.data.name=this.data.list[i].lyjRequirementTypename
        
      }
    }
   console.log(this.data.name);
    var that = this;
    that.setData({
      xuqiuID: e.currentTarget.dataset['index'],
      xuqiuname:this.data.name
    });
    wx.navigateTo({
      url: "/pages/release/xuqiu/xuqiu?category_name=" + that.data.xuqiuID + "&name=" + that.data.xuqiuname,
    });
  }

})