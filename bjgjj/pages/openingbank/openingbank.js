
var app = getApp()

Page({
  data: {
    openbank:0
  },
  onLoad: function () {
    var openbanks = ['请选择开户行']
    console.log('onLoad')
    var openbanks_ = app.globalData.openbanks
    // console.log(openbanks_)
    var return_body = openbanks_.return_body
    for (var i = 0; i < return_body.length;i++){
      openbanks.push(return_body[i].DWMC)
    }
    var that = this
    //调用应用实例的方法获取全局数据
    var userI ;
    app.getUserInfo(function (userInfo) {
      userI = userInfo
    })
    //更新数据
    that.setData({
      userInfo: userI,
      openbanks: openbanks
    })
  },
  bindPickerChange: function (e) {
    var index = e.detail.value;
    if(index == 0){
      return
    }
    var return_body = app.globalData.openbanks.return_body
    // console.log(openbanks_)
    app.globalData.openbanks_now = return_body[index - 1]
    console.log(app.globalData.openbanks_now)
    wx.navigateTo({
      url: '../bankinfo/bankinfo'
    })
  },
  
})
