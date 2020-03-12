/**
 * axios 请求配置相关文件
 * @author
 * @date 2019/4/8
 * @param {String} baseURL  请求接口地址
 * @param {Object} header   请求头设置
 * @param {Object} timeout  超时时间设置
 * @param {String} responseType  响应数据结构
 * @param {Number} maxReqNum  重发请求最大数
 * */
export default {
  baseURL: process.env.VUE_APP_REQURL, // 请求地址
  header: {},
  timeout: 60000,
  withCredentials: true // 解决跨域cookie问题
}
