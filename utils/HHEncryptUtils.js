
var base64 = require('base64.js')
var obj_base64 = new base64.Base64();


// //十六位十六进制数作为秘钥
// var key = fun_aes.CryptoJS.enc.Utf8.parse("3454345434543454");
// //十六位十六进制数作为秘钥偏移量
// var iv = fun_aes.CryptoJS.enc.Utf8.parse('6666666666666666');

// //十六位十六进制数作为秘钥偏移量
// var iv = fun_aes.CryptoJS.enc.Utf8.parse('6666666666666666');

function  base64Encode (res)
{
  return obj_base64.encode(res+"")
}

function base64Decode(res) {
  return obj_base64.decode(res)
}
module.exports.base64Encode = base64Encode
exports.base64Decode = base64Decode
