var util = require('../../utils/util.js')
var app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["个人总账信息", "个人明细账单"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    beginDate: util.formatTime_YM(new Date()),
    endDate: util.formatTime_YM(new Date()),
    items: [],
    boo_items:false,
    openbanks_now: app.globalData.openbanks_now
  
  },
  bindBeginDateChange: function (e) {
    this.setData({
      beginDate: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          openbanks_now: app.globalData.openbanks_now
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  bindSearch: function(e){
    //"body":{"grdjh":"41052619901103237300",
    //"gjjzh":"GJJ017598639",
    //"beginDate":"2016-08","endDate":"2017-08"}
    var param = {
      grdjh: app.globalData.grdjh,
      gjjzh: app.globalData.openbanks_now.SFZH,
      beginDate: this.data.beginDate,
      endDate: this.data.endDate
    }
    var item = [];
    var item_list = {}
    var than = this
    wx.request({
      url: app.path + "/getUserBankInfo",
      data: { 'data': app.encrypt.getPostParam(param) },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.success) {
          var body = JSON.parse(res.data.data)
          var items = body.items
          for(var i =0;i<items.length;i++){
            var list = items[i].list
            for (var l = list.length-1;l>=0;l--){
              var obj = list[l]
              var it = {
                JZRQ: obj.JZRQ.substr(0, 4) + "-" + obj.JZRQ.substr(4, 2) + "-" + obj.JZRQ.substr(6, 2),
                ZJE: Number(obj.ZJE) - Number(obj.ZQE),
                JZRQ_H: obj.JZRQ
              }
              item.push(it)
              item_list[it.JZRQ_H] = obj
            }
          }
          than.setData({
            items: item,
            boo_items:true,
            item_list: item_list
          });
        }
      }
    })
  },
  /**
     * 弹窗
     */
  showDialogBtn: function (e) {
    
    var obj_dialog = this.data.item_list[e.currentTarget.id]
    this.setData({
      showModal: true,
      obj_dialog: obj_dialog
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  }
});