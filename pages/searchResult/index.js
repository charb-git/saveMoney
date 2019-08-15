const utils = require("../../utils/util.js")
const userUtils = require("../../utils/userUtils.js")
const user = require("../../mode/user.js")
const config = require("../../config/config.js")
let lastClickTime = 0
const minClickTime = config.minClickTime
let key = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: userUtils.getDataByKey(user.HEIGHT),
    currentIndex: 0,
    loadingState: 0, //0加载中 1加载成功 2，没数据 3加载失败 
    loadIngStateImg: ["", "", config.no_data, config.faild],
    loadIngStateText: ["", "", "暂无数据", "加载失败，点击重试"],
    loadIngStateTextDsc: ["", "", "掌柜的，又没数据啦", "服务器开小差了，点击刷新再试试吧"],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    key = options.key
    this.getPageData()
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
  getPageData: function() {
    const that = this
    const data = {}
    data.keyword = key.toString()
    data.page_size = 50
    data.page = 1
    data.sort_type = 6
    data.pid = config.pid
    utils.getDataByPost(data, "pdd.ddk.goods.search", res => {
      const result = res.data
      if (result.goods_search_response && result.goods_search_response.goods_list.length > 0) {
        that.setData({
          list: result.goods_search_response.goods_list,
          loadingState: 1,
        })
      } else {
        that.setData({
          loadingState: 2
        })
      }
    }, error => {
      that.setData({
        loadingState: 3,
      })
    }, msg => {
      wx.stopPullDownRefresh();
    })
  },
  onAdItemClickListener: function(event) {
    const clickTime = Date.now()
    if (clickTime - lastClickTime <= minClickTime) {
      lastClickTime = clickTime
      return
    }
    lastClickTime = clickTime

    const posi = event.currentTarget.id
    const item = this.data.adList[posi]
    wx.navigateTo({
      url: '../themGoodsList/list?theme=' + encodeURIComponent(JSON.stringify(item)),
    })
  },
  onItemClickListener: function(event) {
    const clickTime = Date.now()
    if (clickTime - lastClickTime <= minClickTime) {
      lastClickTime = clickTime
      return
    }
    lastClickTime = clickTime

    const id = event.currentTarget.id
    wx.navigateTo({
      url: '../goodsInfo/info?goods_id=' + id,
    })
  },

  currentIndexChange: function(event) {
    this.setData({
      currentIndex: event.detail.current
    })
  },
})