let utils = require("util.js")
const user = require("../mode/user.js")
let userModel = {}

function getUserId(getSu, getFail, tuid) {
  getUserIdIsLoading(getSu, getFail, false, tuid)
}

function getUserIdIsLoading(getSu, getFail, isLoading, tuid) {
  if (isLoading) {
    if (qq.showLoading) {
       qq.showLoading({
        title: '正在登录',
        mask: true
      })
    }
  }
  if (getDataByKey(user.OPENID)) //openid 存在 用户之前登陆过
  {
    if (getDataByKey(user.SESSION_KEY)) {
       qq.checkSession({ // 登陆是否失效 失效重新走登陆流程  未失效 更新登陆时间  
        success: function(res) {
          getUserIdByOpenId(getDataByKey(user.OPENID), getSu, getFail, tuid)
        },
        fail: function(res) {
          getJsCode(getSu, getFail, tuid) // 登陆
        },
        complete: function(res) {},
      })
    } else {
      getJsCode(getSu, getFail, tuid) // 登陆
    }
  } else {
    getJsCode(getSu, getFail, tuid) // 登陆
  }
}
/**
 * 获取jsCode
 */
function getJsCode(getSu, getFail, tuid) {
  console.log('getJsCode code')
  const that = this
   qq.login({
    success: function(res) {
      if (res.code) {
        console.log('getJsCode code' + res.code)
        getUserIdByCode(res.code, getSu, getFail, tuid)
      } else {
        console.log('getJsCode 失败！' + res.errMsg)
        if (getFail) {
          getFail("登录失败！")
        }
      }
    },
    fail: function(error) {
      if (getFail) {
        getFail(error)
      }
    }
  });
}
/**
 * 获取页面数据
 */
function getUserIdByCode(jsCode, getSu, getFail, tuid) {
  const data = {}
  data.code = jsCode
  data.t_uid = tuid
  utils.getDataByPost(data, "get_uid", res => {
    var code = res.data.code
    if (code == 200) {
      const data = res.data.data
      if (data) {
        if (data.uid) {
          setDataBykey(user.OPENID, data.uid)
          setDataBykey(user.SESSION_KEY, data.session_key)
          if (getSu) {
            getSu(data.uid)
          }
        } else {
          setDataBykey(user.OPENID, "")
          setDataBykey(user.SESSION_KEY, "")
          if (getFail) {
            getFail(res.data.msg)
          }
        }

      } else {
        setDataBykey(user.OPENID, "")
        if (getFail) {
          getFail(res.data.msg)
        }
      }

    } else if (code == 402) {
      setDataBykey(user.OPENID, "")
      if (getFail) {
        getFail(res.data.msg)
      }
    } else {
      if (getFail) {
        getFail(res.data.msg)
      }
    }
  }, error => {
    if (getFail) {
      getFail(error)
    }
  }, msg => {
    console.log(msg)
  })

}
/**
 * 获取页面数据
 */
function getUserIdByOpenId(openid, getSu, getFail, tuid) {
  console.log("getUserIdByOpenId")
  const data = {}
  data.openid = openid
  data.t_uid = tuid
  utils.getDataByPost(data, "get_uid", res => {
    var code = res.data.code
    if (code == 200) {
      const data = res.data.data
      if (data) {
        if (data.uid) {
          setDataBykey(user.OPENID, data.uid)
          if (getSu) {
            getSu(data.uid)
          }
        } else {
          setDataBykey(user.OPENID, "")
          if (getFail) {
            getFail(res.data.msg)
          }
        }

      } else {
        setDataBykey(user.OPENID, "")
        if (getFail) {
          getFail(res.data.msg)
        }
      }

    } else if (code == 402) {
      setDataBykey(user.OPENID, "")
      if (getFail) {
        getFail(res.data.msg)
      }
    } else {
      if (getFail) {
        getFail(res.data.msg)
      }
    }
  }, error => {
    if (getFail) {
      getFail(error)
    }
  }, msg => {
    console.log(msg)
  })

}
/**
 * 上传用户信息
 */
function upUsermsg(userMsg, upSu, upFail) {
  const that = this
  if (userModel[user.OPENID]) {
    addMsg(userMsg, upSu, upFail)
  } else {
    getUserId(res => {
      addMsg(userMsg, upSu, upFail)
    }, error => {
      upFail("上传用户信息失败")
    })
  }
}
/**
 * 上传用户信息
 */
function upFormId(fromId) {
  const data = {}
  data["uid"] = userModel[user.OPENID]
  data["form_id"] = fromId
  utils.getDataByPost(data, "form_id", res => {

  }, error => {

  }, msg => {

  })
}
/***
 * 上传用户信息到服务器
 */
function addMsg(userMsg, upSu, upFail) {
  const that = this
  const data = {}
  if (userMsg.userInfo == undefined) {
    upFail("未授权")
    return
  }
  data["username"] = userMsg.userInfo.nickName
  data["avatar"] = userMsg.userInfo.avatarUrl
  data["uid"] = userModel[user.OPENID]
  data["sex"] = userMsg.userInfo.gender
  data["encryptedData"] = userMsg.encryptedData
  data["iv"] = userMsg.iv
  data["session_key"] = getDataByKey(user.SESSION_KEY)
  utils.getDataByPost(data, "update_user_info", res => {
    var code = res.data.code
    if (code == 200) {
      setDataBykey(user.AVATAR, userMsg.userInfo.avatarUrl)
      setDataBykey(user.USER_NAME, userMsg.userInfo.nickName)
      if (upSu) {
        upSu(res.data.msg)
      }
    } else if (code == 201) {
      setDataBykey(user.OPENID, "")
      setDataBykey(user.SESSION_KEY, "")
      upUsermsg(userMsg, upSu, upFail)
    } else {
      if (upFail) {
        upFail(res.data.msg)
      }
    }
  }, error => {
    if (upFail) {
      upFail(error)
    }
  }, msg => {
    console.log(msg)
  })
}
/**
 * 获取窗口高度以及 sx（像素与rpx的比）
 */
function getHeight() {
  let oldHight
  let mainHeight
  const that = this
  console.log("mainHeight  getHeight==")
  try {
    oldHight = getDataByKey(user.HEIGHT)
    mainHeight = getDataByKey(user.MAIN_HEIGHT)
  } catch (e) {
    oldHight = 0
    mainHeight = 0
  }
  if (oldHight > mainHeight && mainHeight > 0) {
    return
  }
   qq.getSystemInfo({
    success: function(res) {
      let height = res.windowHeight
      console.log("mainHeight==" + mainHeight)
      console.log("height==" + height)
      if (mainHeight > 0) {

      } else {
        setDataBykey(user.MAIN_HEIGHT, height)
      }
      let width = res.windowWidth
      let sx = width / 750
      setDataBykey("sx", sx)
      if (height > oldHight) {
        setDataBykey(user.HEIGHT, height)
      }
    },
  })
}

function setDataBykey(key, value) {
  userModel[key] = value
  try {
     qq.setStorageSync(key, value)
  } catch (e) {
     qq.setStorage({
      key: key,
      data: value
    })

  }

}

function getDataByKey(key) {
  if (userModel[key]) {
    return userModel[key]
  } else {
    try {
      return  qq.getStorageSync(key)
    } catch (e) {
       qq.getStorage({
        key: key,
        success(res) {
          return res.data
        }
      })
    }
    return ""
  }


}
module.exports = {
  getUserId: getUserId,
  getUserIdIsLoading: getUserIdIsLoading,
  getHeight: getHeight,
  upUsermsg: upUsermsg,
  upFormId: upFormId,
  getDataByKey: getDataByKey,
  setDataBykey: setDataBykey,
}