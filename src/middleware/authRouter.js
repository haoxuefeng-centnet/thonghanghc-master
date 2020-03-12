/**
 * @Description: 路由拦截器
 * @Author:
 * @Param { String }
 * @Create: 2019/5/19
 * @Version: 1.0.0
 */
import router from '../router'
import store from '../store'
import { getToken } from '@utils/auth'
// 加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 路由白名单
const whiteList = ['/login']

NProgress.configure({ showSpinner: false })
// 验证登陆
function getIsLogin(to, next) {
  const userToken = getToken()
  // 本地是否存在用户token
  if (userToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
    // 是否需要重新拉取用户信息
    if (!store.state.user.userInfo) {
      store.dispatch('getUserInfo')
    }
  } else {
    store.dispatch('clearUserInfo')
    next({ path: `/login?key=${to.path}` })
  }
}
// 页面载入前
router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = to.meta.title || '二手车后台管理'
  // 是否需要进行登陆状态校验
  if (whiteList.indexOf(to.path) === -1) {
    // 验证登陆态
    getIsLogin(to, next)
  } else {
    next()
  }
})
// 页面载入完成
router.afterEach(() => {
  NProgress.done()
})
