const utils = require("../../utils/util.js")
const userUtils = require("../../utils/userUtils.js")
const user = require("../../mode/user.js")
const config = require("../../config/config.js")
let lastClickTime = 0
const minClickTime = config.minClickTime
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      historyList: userUtils.getDataByKey('searchLog'),
    })
    this.getHotList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: config.textIndex,
      path: 'pages/index/index',
      imageUrl: config.shareIndex,
    }
  },
  /**
   * 获取热门列表
   */
  getHotList: function() {
    const that = this
    const data = {}
    data.offset = Math.floor(Math.random() * 400)
    data.limit = 10
    data.pid = config.pid
    utils.getDataByPost(data, "pdd.ddk.goods.recommend.get", res => {
      const info = res.data
      if (info.goods_basic_detail_response) {
        that.setData({
          list: info.goods_basic_detail_response.list,
        })
      } else {
        that.setData({
          loadingState: 2
        })
      }
    }, error => {

    }, msg => {

    })
  },
  /**
   * 搜索
   */
  search: function(event) {
    var inputVal = this.data.inputVal
    if (inputVal.length == 0) {

      return
    }

    this.toSraechResult(inputVal)
  },

  hideInput: function() {
    var inputVal = this.data.inputVal
    if (inputVal.length > 0) {
      this.toSraechResult(inputVal)

    } else {
      wx.navigateBack({
        delta: 1
      })
    }

  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  lableItemClick: function(event) {
    var key = event.currentTarget.dataset.key
    this.toSraechResult(key)
  },

  /**
   * 长按删除
   */
  lableLongClick: function(event) {
    var posi = event.currentTarget.id
    var historyList = this.data.historyList
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认删除' + historyList[posi],
      success: function(res) {
        if (res.confirm) {
          var historyList = that.data.historyList
          historyList.splice(posi, 1)
          userUtils.setDataBykey('searchLog', historyList)
          that.setData({
            historyList: historyList
          })
        }
      }
    })
  },
  clean: function(event) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '清空历史记录？',
      success: function(res) {
        if (res.confirm) {
          userUtils.setDataBykey('searchLog', "")
          that.setData({
            historyList: []
          })
        }
      }
    })
  },
  /**
   * 跳转到搜索结果页
   */
  toSraechResult: function(key) {
    var historyList = this.data.historyList
    var isHave = false
    console.log("key==" + key)
    console.log("historyList==" + JSON.stringify(historyList))
    if (historyList != undefined && historyList.length > 0) {
      for (var i = 0; i < historyList.length; i++) {
        if (key == historyList[i]) {
          isHave = true;
          break
        }
      }
    } else {
      historyList = []
    }

    if (!isHave) {
      historyList.splice(0, 0, key)
      userUtils.setDataBykey('searchLog', historyList)
    }
    this.setData({
      historyList: historyList
    })
    var url = "../searchResult/index?key=" + key
    wx.redirectTo({
      url: url,
    })
  }
})