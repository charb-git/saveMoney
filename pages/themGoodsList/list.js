// pages/rule/index.js

const config = require("../../config/config.js")
let lastClickTime = 0
const minClickTime = config.minClickTime
const userUtils = require("../../utils/userUtils.js")
const user = require("../../mode/user.js")
const utils = require("../../utils/util.js")
let themInfo = {}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: userUtils.getDataByKey(user.HEIGHT),
    base_img: config.base_img,
    loadingState: 0, //0加载中 1加载成功 2，没数据 3加载失败 
    loadIngStateImg: ["", "", config.no_data, config.faild],
    loadIngStateText: ["", "", "暂无数据", "加载失败，点击重试"],
    loadIngStateTextDsc: ["", "", "掌柜的，又没数据啦", "服务器开小差了，点击刷新再试试吧"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    userUtils.getHeight()
    themInfo = JSON.parse(decodeURIComponent(options.theme))
    let title = ""
    if (themInfo.name.length > 13) {
      title = themInfo.name.substring(0, 10) + "..."

    } else {
      title = themInfo.name

    }
    wx.setNavigationBarTitle({
      title: title,
    })
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
  reLoadPageData: function() {
    this.setData({
      loadingState: 0
    })
    this.getPageData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    return {
      title: config.textIndex,
      path: 'pages/index/index',
      imageUrl: config.shareIndex,
    }
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
    this.getPageData()
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
    data.theme_id = themInfo.id
    utils.getDataByPost(data, "pdd.ddk.theme.goods.search", res => {

      if (res.data.theme_list_get_response) {
        this.setData({
          loadingState: 1,
          topImg: themInfo.image_url,
          list: res.data.theme_list_get_response.goods_list
        })
      } else {
        that.setData({
          loadingState: that.data.loadingState == 1 ? 1 : 2
        })
      }
    }, error => {
      that.setData({
        loadingState: that.data.loadingState == 1 ? 1 : 3
      })
    }, msg => {
      if (wx.hideLoading) {
        wx.hideLoading()
      }
      wx.stopPullDownRefresh()

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
  }


})