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
let pageConfirm = [] //保存每一加载信息
let currentIndex = 0

Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: userUtils.getDataByKey(user.MAIN_HEIGHT),
    loadingState: 0, //0加载中 1加载成功 2，没数据 3加载失败 
    loadIngStateImg: ["", "", config.no_data, config.faild],
    loadIngStateText: ["", "", "暂无数据", "加载失败，点击重试"],
    loadIngStateTextDsc: ["", "", "掌柜的，又没数据啦", "服务器开小差了，点击刷新再试试吧"],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    loading = false;
    const clazzList = datajs.clazzList
    if (clazzList && clazzList.length > 0) {
      clazzList[0].isSelect = true
      this.setData({
        clazzList: clazzList
      })
      this.deealLable(clazzList)
      this.getPageData()
    }
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
    let pageComnfimItem = pageConfirm[currentIndex]
    pageComnfimItem["page"] = 1
    this.getPageData()
  },
  reLoadPageData: function() {
    this.setData({
      loadingState: 0, //0加载中 1加载成功 2，没数据 3加载失败 
    })
    let pageComnfimItem = pageConfirm[currentIndex]
    pageComnfimItem["page"] = 1
    this.getPageData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getMoreData()
  },
  showToast: function (msg) {
    wx.showToast({
      title: msg,
      icon: "none"
    })

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
  tableItemClick: function(event) {
    const index = event.currentTarget.dataset.posi
    var clazzList = this.data.clazzList
    const that = this
    if (clazzList[index]["isSelect"]) {
      return
    }
    currentIndex = index
    for (var i = 0; i < clazzList.length; i++) {
      if (i == index) {
        clazzList[i]["isSelect"] = true
      } else {
        clazzList[i]["isSelect"] = false
      }
    }
    const pageComnfimItem = pageConfirm[currentIndex]
    const list = pageComnfimItem.list
    const isGet = pageComnfimItem.isGet
    console.log("isGet==" + isGet)
    if (list.length == 0 && !isGet) {
      this.setData({
        clazzList: clazzList,
        intoView: "clazz" + clazzList[index].opt_id,
        loadingState: 0, //0加载中 1加载成功 2，没数据 3加载失败 
        loadMore: false,
      })
      this.getPageData()
    } else {
      const pageCount = pageComnfimItem["pageCount"]
      this.setData({
        list: list,
        clazzList: clazzList,
        intoView: "clazz" + clazzList[index].opt_id,
        loadingState: list.length <= 0 ? 2 : 1, //0加载中 1加载成功 2，没数据 3加载失败 
        loadMore: pageCount == pageSize
      })
    }
  },
  deealLable: function(table) {
    for (let i = 0; i < table.length; i++) {
      table[i].isSelect = i == currentIndex
      const pageConfirmItem = {}
      pageConfirmItem["page"] = 1
      pageConfirmItem["pageCount"] = 0
      pageConfirmItem["mark"] = table[i].opt_id
      pageConfirmItem["list"] = []
      pageConfirmItem["isGet"] = false
      pageConfirm = pageConfirm.concat(pageConfirmItem)
    }
  },
  getPageData: function() {
    loading = true
    const that = this
    const status = pageConfirm[currentIndex].mark
    const pageIndex = pageConfirm[currentIndex].page
    const data = {}
    data.opt_id = status
    data.page_size = pageSize
    data.page = pageIndex
    data.pid=config.pid
    utils.getDataByPost(data, "pdd.ddk.goods.search", res => {
      const result=res.data
      const pageConfirmItem = pageConfirm[currentIndex]
      const pageIndex = pageConfirmItem["page"]
      if (result.goods_search_response && result.goods_search_response.goods_list.length>0) {
        const tempList = result.goods_search_response.goods_list
        pageConfirmItem["pageCount"] = tempList.length
        const loadMore = tempList.length == pageSize
        if (pageIndex == 1) {
          pageConfirmItem["isGet"] = true
          pageConfirmItem["list"] = tempList
          that.setData({
            list: tempList,
            loadingState: tempList.length > 0 ? 1 : 2, // 1，数据加载成功
            loadMore: loadMore
          })
        } else {
          let list = pageConfirmItem.list
          list = list.concat(tempList)
          pageConfirmItem["list"] = list
          that.setData({
            list: list,
            loadMore: loadMore
          })

        }

      } else {
        if (pageIndex == 1) {
          pageConfirmItem["isGet"] = true
          pageConfirmItem["pageCount"] = 0
          pageConfirmItem["list"] = []
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
      const pageComnfimItem = pageConfirm[currentIndex]
      let pageIndex = pageComnfimItem["page"]
      pageIndex += 1
      pageComnfimItem["page"] = pageIndex
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