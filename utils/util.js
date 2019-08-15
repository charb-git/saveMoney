const imgip = "https://dogtag.hani.cn/index.php/api/index/"
const md5 = require("md5.js")
const base64 = require("base64.js")
const encryptUtils = require("HHEncryptUtils.js")
const config = require("../config/config.js")
let paraNoDeal = ["username", "avatar"]

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatTime(date, format) {
  var formateArr = ['YY', 'MM', 'DD', 'hh', 'mm', 'ss'];
  var returnArr = [];
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));
  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

/**
 * 判断权限
 * 
 * scope 权限名字
 * contentMsg 权限被拒绝时提示文字
 * doWhat 授权成功后续操作
 * 
 */
function getAuthorize(scope, contentMsg, doWhat) {
  var that = this
  if (qq.getSetting) {
    qq.getSetting({
      success(res) {
        if (!res.authSetting[scope]) {
          qq.authorize({
            scope: scope,
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 qq.startRecord 接口不会弹窗询问
              doWhat()
            },
            fail: function(error) {
              qq.showModal({
                title: '提示',
                content: contentMsg + "权限未开启",
                confirmText: "去打开",
                cancelText: "暂不",
                success: function(res) {
                  if (res.confirm) {
                    qq.navigateTo({
                      url: '../openAuthorize/index?auth=' + contentMsg,
                    })

                  }
                }

              })

            }
          })
        } else {
          doWhat()
        }
      },

    })
  }
}
/**
 * 网络请求
 *  data 请求数据
 *  method 路由
 *  success 成功回调
 *  fail 失败回调
 *  complete 完成回调
 */
function getDataByPost(data, method, success, fail, complete, testIP) {
  data.type = method
  data.client_id = config.client_id
  data.data_type ="JSON"
  data.timestamp = 1565341690
  // data.timestamp = new Date().getTime()
  let sign = jsonSort(data)
  console.log("sign==" + sign)
  data.sign = md5.hex_md5(sign).toUpperCase()
  qq.showNavigationBarLoading()
  console.log("getDataByPost." + method + ".data=" + JSON.stringify(data))
  qq.request({
    url: config.ip,
    method: 'POSt',
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function(res) {
      console.log("getDataByPost." + method + ".result=" + JSON.stringify(res))
      if (res.data.code == 408) {
        if (qq.hideLoading) {
          qq.hideLoading()
        }
        qq.showModal({
          title: '警告',
          content: '非法请求',
        })
        fail("非法请求")
        return
      } else {
        success(res)
      }

    },
    fail: function(error) {
      console.log("getDataByPost." + method + ".fail=" + JSON.stringify(error))
      fail(error)
    },
    complete: function() {
      complete("complete")
      qq.hideNavigationBarLoading()
    }


  })
}
/**
 * 上传文件
 */
function upFile(filePath, success, fail, complete) {
  const imgName = "hn_" + getFileName(filePath)
  const url = "https://good-goods.oss-cn-beijing.aliyuncs.com/"
  qq.uploadFile({
    url: url,
    // url: ip + method,
    filePath: filePath,
    name: 'file',
    formData: {
      'name': "charb",
      "key": imgName,
      'success_action_status': '200', //让服务端返回200,不然，默认会返回204
    },
    success: function(res) {
      success(imgName)
    },
    fail: function(error) {
      fail(error)
    },
    complete: function() {
      console.log("upFile 完成")
      complete("complete")
    }


  })
}

function getFileName(filePath) {
  const time = new Date().getTime()
  const sin = md5.hex_md5(filePath)
  const posi = filePath.lastIndexOf(".")
  const gs = filePath.substring(posi, filePath.length)
  console.log("getFileName==" + sin + time + gs)
  return sin + time + gs
}

function jsonSort(jsonObj) {
  let arr = [];
  for (let key in jsonObj) {
    if (jsonObj[key] !== undefined && jsonObj[key] !== null) {
      arr.push(key)
    }
  }
  arr.sort();
  let str = config.client_secret;
  for (let i in arr) {
    str += arr[i] + (typeof (jsonObj[arr[i]]) == "object" ? JSON.stringify(jsonObj[arr[i]]) : jsonObj[arr[i]])
  }
  return str + config.client_secret
}

/**
 * 比较两个版本
 */
function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  var len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i])
    var num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

/**
 * 检查更新
 */
function checkUpData() {
  if (qq.getUpdateManager) {
    const updateManager = qq.getUpdateManager()

    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function() {
      qq.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })

    updateManager.onUpdateFailed(function() {
      // 新的版本下载失败
    })
  }

}
module.exports = {
  formatTime: formatTime,
  getAuthorize: getAuthorize,
  upFile: upFile,
  getDataByPost: getDataByPost,
  compareVersion: compareVersion,
  checkUpData: checkUpData
}