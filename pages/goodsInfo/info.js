// pages/dGoodsInfo/info.js
const app = getApp()
let content = ""
const utils = require("../../utils/util.js")
const userUtils = require("../../utils/userUtils.js")
const user = require("../../mode/user.js")
const config = require("../../config/config.js")
let lastClickTime = 0
const minClickTime = config.minClickTime
let goods_id = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: userUtils.getDataByKey(user.HEIGHT),
    loadingState: 0, //0加载中 1加载成功 2，没数据 3加载失败 
    loadIngStateImg: ["", "", config.no_data, config.faild],
    loadIngStateText: ["", "", "暂无数据", "加载失败，点击重试"],
    loadIngStateTextDsc: ["", "", "掌柜的，又没数据啦", "服务器开小差了，点击刷新再试试吧"],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userUtils.getHeight()
    goods_id = "[" + options.goods_id + "]"
    this.getPageData()
    this.getHotGoods()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const info = this.data.info
    if (info) {
      return {
        title: info.goods_detail.goods_name,
        path: 'pages/goodsInfo/info?goods_id=' + info.goods_detail.goods_id,
        imageUrl: info.goods_detail.goods_thumbnail_url,
      }
    } else {
      return {
        title: config.textIndex,
        path: 'pages/index/index',
        imageUrl: config.shareIndex,
      }
    }


  },
  reLoadPageData: function () {
    const that = this
    this.getPageData()
    this.getHotGoods()
  },
  getPageData: function () {
    const that = this
    const data = {}
    console.log("goods_id==", goods_id)
    data.goods_id_list = goods_id
    data.p_id = config.pid
    data.generate_we_app = "true"
    utils.getDataByPost(data, "pdd.ddk.goods.promotion.url.generate", res => {
      if (res.data.goods_promotion_url_generate_response && res.data.goods_promotion_url_generate_response.goods_promotion_url_list.length > 0) {
        const info = res.data.goods_promotion_url_generate_response.goods_promotion_url_list[0]
        that.setData({
          info: info,
          loadingState: 1, // 1，数据加载成功
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
      wx.stopPullDownRefresh()

    })
  },
  /**
   * 热门推荐
   */
  getHotGoods: function () {
    const that = this
    const data = {}
    data.offset = Math.floor(Math.random() * 400)
    data.limit = 4
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
  toBuy: function () {
    const clickTime = Date.now()
    if (clickTime - lastClickTime <= minClickTime) {
      lastClickTime = clickTime
      return
    }
    lastClickTime = clickTime
    const info = this.data.info
    wx.navigateToMiniProgram({
      appId: '1108233859',
      path: info.we_app_info.page_path,
      extraData: {},
      envVersion: '',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    // this.getDDKl()

  },
  /**
     * 拼多多口令
     */
  getDDKl: function () {
    const that = this
    const data = {}
    data.goods_id_list = goods_id
    data.p_id = config.pid
    data.style = "1"
    utils.getDataByPost(data, "pdd.ddk.phrase.generate", res => {
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
  onItemClickListener: function (event) {
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

  toMain: function (event) {
    const clickTime = Date.now()
    if (clickTime - lastClickTime <= minClickTime) {
      lastClickTime = clickTime
      return
    }
    lastClickTime = clickTime

    wx.switchTab({
      url: '../index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }

})