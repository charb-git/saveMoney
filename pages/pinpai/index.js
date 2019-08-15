const utils = require("../../utils/util.js")
const userUtils = require("../../utils/userUtils.js")
const user = require("../../mode/user.js")
const config = require("../../config/config.js")
const datajs = require("../../config/data.js")
let lastClickTime = 0
const minClickTime = config.minClickTime
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: userUtils.getDataByKey(user.MAIN_HEIGHT),
    currentIndex: 0,
    loadingState: 0, //0加载中 1加载成功 2，没数据 3加载失败 
    loadIngStateImg: ["", "", config.no_data, config.faild],
    loadIngStateText: ["", "", "暂无数据", "加载失败，点击重试"],
    loadIngStateTextDsc: ["", "", "掌柜的，又没数据啦", "服务器开小差了，点击刷新再试试吧"],
    mallType: ["", "个人", "企业", "旗舰店", "专卖店", "专营店", "普通店"]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    this.changeMall()

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
    const mallObj = this.getUserMalllist()
    data.mall_id_list = mallObj.mall_id_list
    utils.getDataByPost(data, "pdd.ddk.merchant.list.get", res => {
      const info = res.data
      if (info.merchant_list_response && info.merchant_list_response.total > 0) {
        that.setData({
          loadingState: 1,
          mallImgobj:mallObj.mallImgobj,
          list: info.merchant_list_response.mall_search_info_vo_list,
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
      if (wx.hideLoading) {
        wx.hideLoading()
      }
      wx.stopPullDownRefresh();
    })
  },
  getUserMalllist: function() {
    const mallList = datajs.mallList
    const mallImg = datajs.mallImg
    const offset = userUtils.getDataByKey(user.OFFSET)
    const set_time = userUtils.getDataByKey(user.SET_TIME)
    const nowData = new Date()
    const randon_num = Math.floor(Math.random() * (mallList.length - 10))
    const dayTime = 1000 * 60 * 60 * 24
    let offset_t = ""

    if (set_time) {
      console.log("nowData==" + nowData.getTime())
      console.log("set_time==" + set_time)
      console.log("dayTime==" + dayTime)
      if (nowData.getTime() - set_time >= dayTime) {
        offset_t = randon_num
        userUtils.setDataBykey(user.OFFSET, offset_t)
        userUtils.setDataBykey(user.SET_TIME, nowData.getTime())
      } else {
        const lastData = new Date(set_time)
        if (lastData.getDate() != nowData.getDate()) {
          offset_t = randon_num
          userUtils.setDataBykey(user.OFFSET, offset_t)
          userUtils.setDataBykey(user.SET_TIME, nowData.getTime())
        } else {
          offset_t = offset
        }

      }

    } else {
      offset_t = randon_num
      userUtils.setDataBykey(user.OFFSET, offset_t)
      userUtils.setDataBykey(user.SET_TIME, nowData.getTime())
    }

    const finalMallList = mallList.splice(offset_t, 10)
    let mall_id_list = "["
    let mallImgobj = {}
    for (let i = 0; i < finalMallList.length; i++) {
      mallImgobj[finalMallList[i]] = mallImg[finalMallList[i]]
      if (i < finalMallList.length - 1) {
        mall_id_list += finalMallList[i] + ","
      } else {
        mall_id_list += finalMallList[i] + "]"
      }

    }
    const mallObj={}
    mallObj.mall_id_list=mall_id_list
    mallObj.mallImgobj = mallImgobj
    return mallObj

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
  toMall: function(event) {
    const clickTime = Date.now()
    if (clickTime - lastClickTime <= minClickTime) {
      lastClickTime = clickTime
      return
    }
    lastClickTime = clickTime

    const posi = event.currentTarget.id
    const list = this.data.list
    const goodsItem = list[posi].goods_detail_vo_list[0]

    wx.navigateTo({
      url: '../mallGoods/list?mall_id=' + goodsItem.mall_id + "&mall_name=" + goodsItem.mall_name,
    })
  },
  changeMall: function(event) {
    const clickTime = Date.now()
    if (clickTime - lastClickTime <= minClickTime) {
      lastClickTime = clickTime
      return
    }
    lastClickTime = clickTime
    userUtils.setDataBykey(user.OFFSET, "")
    userUtils.setDataBykey(user.SET_TIME, "")
    if (wx.showLoading) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
    }
    this.getPageData()
  }
})