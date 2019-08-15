// pages/dh/index.js
let content = ""
const utils = require("../../utils/util.js")
const userUtils = require("../../utils/userUtils.js")
const user = require("../../mode/user.js")
const config = require("../../config/config.js")
const datajs = require("../../config/data.js")
let lastClickTime = 0
const minClickTime = config.minClickTime
const pageSize = config.pageSize
let pageIndex = 1
let loading = false;
let channel_type = ""

Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: userUtils.getDataByKey(user.HEIGHT),
    loadingState: 0, //0加载中 1加载成功 2，没数据 3加载失败 
    loadIngStateImg: ["", "", config.no_data, config.faild],
    loadIngStateText: ["", "", "暂无数据", "加载失败，点击重试"],
    channelDsc: ["1.9包邮", "今日爆款", "品牌清仓"],
    loadIngStateTextDsc: ["", "", "掌柜的，又没数据啦", "服务器开小差了，点击刷新再试试吧"],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    channel_type = options.channel_type
    pageIndex = 1
    const channelDsc = this.data.channelDsc
    wx.setNavigationBarTitle({
      title: channelDsc[channel_type],
    })
    loading = false;
    this.getPageData()
    userUtils.getHeight()
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
    this.getPageData()
  },
  reLoadPageData: function() {
    this.setData({
      loadingState: 0, //0加载中 1加载成功 2，没数据 3加载失败 
    })
    this.getPageData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getMoreData()
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
  showToast: function(msg) {
    wx.showToast({
      title: msg,
      icon: "none"
    })

  },
  getPageData: function() {
    loading = true
    const that = this
    const data = {}
    data.channel_type = channel_type
    data.limit = pageSize
    data.offset = (pageIndex - 1) * pageSize
    utils.getDataByPost(data, "pdd.ddk.goods.recommend.get", res => {
      const result = res.data
      if (result.goods_basic_detail_response && result.goods_basic_detail_response.list.length > 0) {
        const tempList = result.goods_basic_detail_response.list
        const loadMore = tempList.length == pageSize
        if (pageIndex == 1) {
          that.setData({
            list: tempList,
            loadingState: tempList.length > 0 ? 1 : 2, // 1，数据加载成功
            loadMore: loadMore
          })
        } else {
          let list = that.data.list
          list = list.concat(tempList)
          that.setData({
            list: list,
            loadMore: loadMore
          })

        }

      } else {
        if (pageIndex == 1) {
          that.setData({
            list: [],
            loadingState: 2,
          })

        } else {
          that.showToast("暂无更多数据")
          that.setData({
            loadMore: false
          })

        }
      }
    }, error => {
      if (pageIndex == 1) {
        that.setData({
          loadingState: 3,
        })
      } else {
        that.showToast("网络异常")

      }
    }, msg => {
      loading = false
      wx.stopPullDownRefresh()
    })
  },
  getMoreData: function() {
    const loadMore = this.data.loadMore
    if (loadMore && !loading) {
      pageIndex += 1
      this.getPageData()
    }
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