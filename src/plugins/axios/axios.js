/**
 * axios 拦截器相关配置
 * @author
 * @date 2019/4/9
 */
import axios from 'axios'
import { Message } from 'iview'
import router from '@/router'
import store from '@/store'
import configs from './config'
// 创建一个 axios 实例
const service = axios.create({
  baseURL: configs.baseURL,
  timeout: configs.timeout,
  header: configs.header
})
// 白名单接口
const whiteList = [`${process.env.VUE_APP_REQURL}login`]
// 请求拦截器
service.interceptors.request.use(
  config => {
    const userToken = store.state.user.token
    if (!whiteList.includes(config.url)) {
      if (userToken) {
        config.headers['userToken'] = userToken
      }
    }
    return config
  },
  error => {
    // 发送失败
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    if (typeof dataAxios !== 'object') {
      Message.error('客服端请求接口无返回数据')
      return Promise.reject('请检查接口响应数据!')
    }
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 code 进行判断
    if (code !== 200) {
      // 如果success 为 false 证明请求失败
      const { current } = router.history
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (dataAxios.code) {
        // 登陆异常
        case 407:
          Message.error(dataAxios.msg)
          store.dispatch('clearUserInfo')
          setTimeout(() => {
            router.push(`/login?key=${current.path}`)
          }, 500)
          break
        // 无权限
        case 401:
          store.dispatch('clearUserInfo')
          setTimeout(() => {
            router.push(`/login?key=${current.path}`)
          }, 500)
          Message.error(dataAxios.msg)
          router.push('/403')
          break
        default:
          // 其他 code
          Message.error(dataAxios.msg)
          break
      }
    }
    return dataAxios
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误，请检查客服端传入的参数'
          break
        case 401:
          error.message = '客户端未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          error.message = '请求失败！'
          break
      }
    }
    Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
