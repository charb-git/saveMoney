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
    height: userUtils.getDataByKey(user.MAIN_HEIGHT),
    currentIndex: 0,
    loadingState: 0, //0加载中 1加载成功 2，没数据 3加载失败 
    loadIngStateImg: ["", "", config.no_data, config.faild],
    loadIngStateText: ["", "", "暂无数据", "加载失败，点击重试"],
    loadIngStateTextDsc: ["", "", "掌柜的，又没数据啦", "服务器开小差了，点击刷新再试试吧"],
    topTitleOpacity: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getPageData()
    this.getTopAd()
    this.getRed()
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log("imageUrl==", config.shareIndex)
    return {
      title: config.textIndex,
      path: 'pages/index/index',
      imageUrl: config.shareIndex,
    }
  },
  onPageScroll: function(e) {
    if (e.scrollTop < 50) {
      if (this.data.topTitleOpacity > 0) {
        this.setData({
          topTitleOpacity: 0
        })
      }

    } else if (50 <= e.scrollTop && e.scrollTop < 150) {
      this.setData({
        topTitleOpacity: e.scrollTop / 150
      })
    } else {
      if (this.data.topTitleOpacity < 1) {
        this.setData({
          topTitleOpacity: 1
        })
      }
    }
  },
  getPageData: function() {
    const that = this
    const data = {}
    data.offset = Math.floor(Math.random() * 400)
    data.limit = 32
    data.pid = config.pid
    utils.getDataByPost(data, "pdd.ddk.goods.recommend.get", res => {
      const info = res.data
      if (info.goods_basic_detail_response) {
        that.setData({
          loadingState: 1,
          list: info.goods_basic_detail_response.list,
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
      qq.stopPullDownRefresh();
    })
  },
  getTopAd: function() {
    const that = this
    const data = {}
    data.page = 1
    data.page_size = 4
    utils.getDataByPost(data, "pdd.ddk.theme.list.get", res => {
      const info = res.data
      if (info.theme_list_get_response) {
        that.setData({
          adList: info.theme_list_get_response.theme_list,
        })
      }
    }, error => {

    }, msg => {

    })
  },
  getRed: function() {
    const that = this
    const data = {}
    data.p_id_list = '["' + config.pid + '"]'
    data.generate_weapp_webview = false
    data.generate_we_app = true
    utils.getDataByPost(data, "pdd.ddk.rp.prom.url.generate", res => {
      const info = res.data
      if (info.rp_promotion_url_generate_response) {
        if (info.rp_promotion_url_generate_response.url_list[0].we_app_info) {
          userUtils.setDataBykey(user.RED_URL, info.rp_promotion_url_generate_response.url_list[0].we_app_info.page_path)
        }
      }
    }, error => {

    }, msg => {

    })
  },

  toAction: function(event) {
    const clickTime = Date.now()
    if (clickTime - lastClickTime <= minClickTime) {
      lastClickTime = clickTime
      return
    }
    lastClickTime = clickTime
    const channel_type = event.currentTarget.id
    qq.navigateTo({
      url: '../action/list?channel_type=' + channel_type,
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
    qq.navigateTo({
      url: '../themGoodsList/list?theme=' + encodeURIComponent(JSON.stringify(item)),
    })
  },
  toRed: function(event) {
    const clickTime = Date.now()
    if (clickTime - lastClickTime <= minClickTime) {
      lastClickTime = clickTime
      return
    }
    lastClickTime = clickTime
    if (userUtils.getDataByKey(user.RED_URL)) {
      qq.navigateToMiniProgram({
        appId: '1108233859',
        path: userUtils.getDataByKey(user.RED_URL),
        extraData: {},
        envVersion: '',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      qq.showToast({
        title: '网络异常请重试',
        icon: "none"
      })
      this.getRed()
    }

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
    qq.navigateTo({
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
    qq.navigateTo({
      url: '../goodsInfo/info?goods_id=' + id,
    })
  },

  currentIndexChange: function(event) {
    this.setData({
      currentIndex: event.detail.current
    })
  },
  toSearch: function() {
    const clickTime = Date.now()
    if (clickTime - lastClickTime <= minClickTime) {
      lastClickTime = clickTime
      return
    }
    lastClickTime = clickTime

    qq.navigateTo({
      url: '../search/index',
    })
  },
})