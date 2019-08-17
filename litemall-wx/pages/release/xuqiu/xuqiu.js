var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var dateTimePicker = require('../../../utils/dateTimePicker.js');

const date = new Date()
const years = []
const months = []
const days = []

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
    riqishijian:'',
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    items: [
      { name: '1', value: '男' },
      { name: '2', value: '女' },
    ],
    xuqiu:'',
    caname:'',
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
    array: ['中国'],
    // 普通选择器列表设置,及初始化
    countryList: ['中国', '美国', '英国', '日本', '韩国', '巴西', '德国'],
    countryIndex: 6,
    // 省市区三级联动初始化
    region: ["上海市", "上海市", "徐汇区"],
    // 多列选择器(二级联动)列表设置,及初始化
    multiArray: [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    multiIndex: [3, 5],
    // 多列选择器(三级联动)列表设置,及初始化
    multiArray3: [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    multiIndex3: [3, 5, 4]
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  // 选择国家函数
  changeCountry(e) {
    this.setData({ countryIndex: e.detail.value });
  },
  // 选择省市区函数
  changeRegin(e) {
    this.setData({ region: e.detail.value });
  },
  // 选择二级联动
  changeMultiPicker(e) {
    this.setData({ multiIndex: e.detail.value })
  },
  //输入性别
  genderChange(e) {
    this.setData({ gender: e.detail.value });
  },
  //优先性别
  radioChange(e) {
    this.setData({ gender: e.detail.value });
  },
  // 选择三级联动
  changeMultiPicker3(e) {
    this.setData({ multiIndex3: e.detail.value })
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      lyjRequirementBegindatetime: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    });
    console.log(this.data.region[0]);
    console.log(this.data.region[1]);
    console.log(this.data.region[2]);
  },
  bindTimeChange: function (e) {
    this.setData({
      lyjRequirementEnddatetime: e.detail.value
    })
  },
  //输入积分
  changejifen(e) {
    this.setData({
      lyjRequirementReward: e.detail.value
    })
  },
  //输入地址
  changedizhi(e) {
    this.setData({
      lyjRequirementRawaddress: e.detail.value
    })
  },
  //输入门牌号
  changemenpai(e) {
    this.setData({
      lyjRequirementDetailadd: e.detail.value
    })
  },
  //输入需求描述
  changexuqiumiaoshu(e) {
    this.setData({
      lyjRequirementDescription: e.detail.value
    })
  },
  onLoad:function(options){
    //日期时间选择器
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });

    var that = this;
    that.setData({
      xiuqiu: options.category_name,
      caname: options.name
    })
  },
  formSubmit(e) {
    var that = this;
    that.setData({
      riqishijian: this.data.dateTimeArray1[0][this.data.dateTime1[0]] + "-" + this.data.dateTimeArray1[1][this.data.dateTime1[1]] + "-" + this.data.dateTimeArray1[2][this.data.dateTime1[2]] + "T" + this.data.dateTimeArray1[3][this.data.dateTime1[3]] + ":" + this.data.dateTimeArray1[4][this.data.dateTime1[4]]+"Z",
    })
    console.log();
    // console.log(this.data.lyjRequirementBegindatetime + "T" + this.data.lyjRequirementEnddatetime+"Z");
    // console.log(this.data.lyjRequirementEnddatetime);
    util.request(api.xinzengxuqiuID + this.data.xiuqiu, {
      "lyjRequirementApplyuser": 0,
      "lyjRequirementArea": this.data.region[1],
      "lyjRequirementBegindatetime": "2019-08-11T04:27Z",
      "lyjRequirementCity": this.data.region[0],
      "lyjRequirementCreatedatetime": "2019-08-11T04:27Z",
      "lyjRequirementCreateuser": 0,
      "lyjRequirementDescription": this.data.lyjRequirementDescription,
      "lyjRequirementEnddatetime": "2019-08-11T04:27:51.698Z",
      "lyjRequirementId": 0,
      "lyjRequirementIsvolunteer": 0,
      "lyjRequirementMaplocation": "string",
      "lyjRequirementName": "string",
      "lyjRequirementRawaddress": this.data.lyjRequirementRawaddress,
      "lyjRequirementReward": Number(this.data.lyjRequirementReward),
      "lyjRequirementStreet": this.data.region[2],
      "lyjRequirementVolunteerperfer": this.data.gender,
      "lyjRequirementDetailadd": this.data.lyjRequirementDetailadd
    }, 'POST').then(function (res) {
      console.log(res);
      // if (res.errno === 0) {
      //   that.setData({
      //     order: res.data.order
      //   });
      // }

    });
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },


  changeDateTimeColumn1(e) {
    console.log("11111111111");
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  bindTextAreaBlur: function (e) {
    this.setData({
      lyjRequirementDescription: e.detail.value
    })
  },
})