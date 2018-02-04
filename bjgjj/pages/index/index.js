//index.js
//获取应用实例
var app = getApp()
var placeholder_array = ['银行卡号16-20位数字', '15位-18位数字或字母', '8位数字', '15位-18位数字或字母', '最多20位数字或字母']

var pattern = [/^[0-9]{16,20}$/, /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/]

Page({
  data: {
    placeholder: placeholder_array[0],
    tips: '温馨提示：\n 本查询功能只向已申领住房公积金查询卡或住房公积金联名卡的缴存职工提供查询服务。如果您还没有以上卡种，请到公积金办事处咨询并办理联名卡申请手续。\n 首次登陆查询功能，验证方式须选择联名卡号；初始密码为身份证号后四位阿拉伯数字+00。',
    motto: '',
    userInfo: {},
    //idcordTypes: ['联名卡号', '身份证', '军官证', '护照','个人登记号'],
    idcordTypes: ['联名卡号', '身份证'],
    idcordType: 0
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        idcard_history: wx.getStorageSync('idcard_history')[0],
        idcard: wx.getStorageSync('idcard_history')[0]
      })
    })
  },
  idcardInputEvent: function (e) {
    this.setData({
      idcard: e.detail.value,
      //showTopTips:true
    })
  },
  passwordInputEvent: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      idcordType: e.detail.value,
      placeholder: placeholder_array[e.detail.value],
      idcard_history: wx.getStorageSync('idcard_history')[e.detail.value],
      idcard: wx.getStorageSync('idcard_history')[e.detail.value]
    })
  },
  bindButtion: function (e) {
    var that = this
    var idcard = this.data.idcard
    var password = this.data.password
    // idcard = '6212260200113620724';
    var idcard_pattern = pattern[that.data.idcordType]

    if (!idcard_pattern.test(idcard)) {
      wx.showToast({
        title: '证件号错误！',
        icon: 'success',
        duration: 3000
      })
      return
    }

    var password_pattern = /^[0-9a-zA-Z]{6}$/
    if (!password_pattern.test(password) && that.data.idcordType == 0) {
      wx.showToast({
        title: '密码不正确！',
        icon: 'success',
        duration: 3000
      })
      return
    }
    var idcards = wx.getStorageSync('idcard_history')
    idcards = idcards == "" ? {} : idcards
    idcards[that.data.idcordType] = idcard;
    wx.setStorageSync('idcard_history', idcards)
    if (that.data.idcordType == 0) {
      var param = {
        gjjCardXXID: idcard,
        cardPass: password
      }
      that.getLogin(param)
    }
    if (that.data.idcordType == 1) {
      that.getOpenBanks(idcard + "00")
    }

  },
  getLogin: function (param) {
    var that = this
    wx.request({
      url: app.path + "/login",
      data: { 'data': app.encrypt.getPostParam(param) },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        if (res.data.success) {
          var body = JSON.parse(res.data.data)
          if (body.result_status != 'SUCCESS') {
            wx.showToast({
              title: "输入信息有误",
              icon: 'success',
              duration: 3000
            })
            return
          }

          that.getOpenBanks(body.grdjh)
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 3000
          })
          return
        }

      }
    })
  },
  getOpenBanks: function (grdjh) {
    app.globalData.grdjh = grdjh
    var param = {
      grdjh: grdjh
    }
    wx.request({
      url: app.path + "/getOpenBanks",
      data: { 'data': app.encrypt.getPostParam(param) },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        var body
        if (res.data.success) {
          var body = JSON.parse(res.data.data)
          app.globalData.openbanks = body
          wx.navigateTo({
            url: '../openingbank/openingbank'
          })
        }
      }
    })

  }
})
