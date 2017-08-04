function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 是否是数组
function isArray(obj){
  return obj === null || typeof obj === "undefined" ? false : obj.constructor === Array;
}
// 判断两个数组是否相同
function sameArray(arr1, arr2){
  if (isArray(arr1) && isArray(arr2)) {
    if(arr1.length === arr2.length) {
      for(var i = 0; i < arr1.length; i++) {
        if (arr1[i] instanceof Array && arr2[i] instanceof Array){
          if (!sameArray(arr1[i], arr2[i])){
            return false;
          }
        }else if (arr1[i] !== arr2[i]) {
          return false;
        }
      }
      return true;
    }else{
      return false;
    }
  }else {
    return false;
  }
}
module.exports = {
  formatTime: formatTime,
  isArray: isArray,
  sameArray: sameArray
}
