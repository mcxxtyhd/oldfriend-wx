var api = require('../../../config/api.js');
var check = require('../../../utils/check.js');
var util = require('../../../utils/util.js');
var app = getApp();
Page({
  data: {
    username: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    code: '',
    disabled: true,
    send: true,
    alreadySend: false,
    second: 60,
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成

  },
  onReady: function() {

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
  //获取验证码
  sendCode: function() {
    let that = this;

    if (this.data.mobile.length == 0) {
      wx.showModal({
        title: '错误信息',
        content: '手机号不能为空',
        showCancel: false
      });
      return false;
    }
     
  
    

    if (!check.isValidPhone(this.data.mobile)) {
      wx.showModal({
        title: '错误信息',
        content: '手机号输入不正确',
        showCancel: false
      });
      return false;
    }



    // var m = new Date().getMinutes().toString();//获得当前分钟数
    // console.log('提交外面的')
    // // console.log(m)
    // // console.log(new Date().getMinutes())
    // //开始缓存池中没有分钟数，当前分钟数肯定不等于缓存中的分钟数，当前可以执行
    // if (m != wx.getStorageSync('m')) {
    //   wx.setStorageSync('m', m)//把分钟数放到缓存
    //   //要做的事情，提交啊，点击啊等等、
    //   console.log("一点击");
    // }
    // else {
    //   //当发生了1分钟内多次点击等事件，弹窗提示或者做别的操作。
    //   wx.showModal({
    //     title: '错误信息',
    //     content: '1分钟内请不要重复点击',
    //     showCancel: false
    //   });
    //   this.setData({
    //     disabled: !this.data.disabled
    //   })
    // }
    
    util.request(api.huoquyanzhengma, {
      phone:18821202289
    }, 'GET').then(function (res) {
      this.setData({
        yanzhengma: e.detail.value
      })
    });
    that.setData({
      alreadySend: true,
      send: false
    }),
      this.timer();
    
  },
  panduan(){
    this.setData({
      alreadySend: true,
      send: false
    }),
      this.timer();

  },
  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              alreadySend: false,
              send: true
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },

  requestRegister: function(wxCode) {
    let that = this;
    wx.request({
      url: api.AuthRegister,
      data: {
        username: that.data.username,
        password: that.data.password,
        mobile: that.data.mobile,
        code: that.data.code,
        wxCode: wxCode
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errno == 0) {
          app.globalData.hasLogin = true;
          wx.setStorageSync('userInfo', res.data.data.userInfo);
          wx.setStorage({
            key: "token",
            data: res.data.data.token,
            success: function() {
              wx.switchTab({
                url: '/pages/ucenter/index/index'
              });
            }
          });
        } else {
          wx.showModal({
            title: '错误信息',
            content: res.data.errmsg,
            showCancel: false
          });
        }
      }
    });
  },
  startRegister: function() {
    var that = this;

    if (this.data.password.length < 6) {
      wx.showModal({
        title: '错误信息',
        content: '密码不得少于6位',
        showCancel: false
      });
      return false;
    }

    if (this.data.password != this.data.confirmPassword) {
      wx.showModal({
        title: '错误信息',
        content: '确认密码不一致',
        showCancel: false
      });
      return false;
    }

    if (this.data.mobile.length == 0 || this.data.code.length == 0) {
      wx.showModal({
        title: '错误信息',
        content: '手机号和验证码不能为空',
        showCancel: false
      });
      return false;
    }

    if (!check.isValidPhone(this.data.mobile)) {
      wx.showModal({
        title: '错误信息',
        content: '手机号输入不正确',
        showCancel: false
      });
      return false;
    }
  
    util.request(api.yonghuzhuce, {
      "lyjUserPhone": 18821202289,
      "lyjUserPassword": 1234567 
    },'POST').then(function (res) {
      if(res.statusCode == 200){
        console.log(res.data);
      }
     
      
    });
  },
  bindUsernameInput: function(e) {

    this.setData({
      username: e.detail.value
    });
  },
  bindPasswordInput: function(e) {

    this.setData({
      password: e.detail.value
    });
  },
  bindConfirmPasswordInput: function(e) {

    this.setData({
      confirmPassword: e.detail.value
    });
  },
  bindMobileInput: function(e) {

    this.setData({
      mobile: e.detail.value
    });
  },
  //输入验证码
  bindCodeInput: function(e) {

    this.setData({
      code: e.detail.value
    });
  },
  clearInput: function(e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-confirm-password':
        this.setData({
          confirmPassword: ''
        });
        break;
      case 'clear-mobile':
        this.setData({
          mobile: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  }
})