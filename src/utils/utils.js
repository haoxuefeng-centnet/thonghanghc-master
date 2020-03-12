/**
 * @Description: 时间格式化工具
 * @Author: Gyang18
 * @Param { date } date 传入的标准时间
 * @Param { String } 需要生成的时间格式  yyyy-MM-dd  yyyy-MM-dd hh:mm 默认 yyyy-MM-dd
 * @Create: 2019/5/25
 * @Version: 1.0.0
 */
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
export function formatDate(date, fmt = 'yyyy-MM-dd') {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}
