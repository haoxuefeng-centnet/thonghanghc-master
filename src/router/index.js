import Vue from 'vue'
import Router from 'vue-router'
// layout 默认主布局路由组件
import HeaderAsideLayout from '@/layouts/HeaderAsideLayout'
// 默认路由
import defaultRoutes from './module/default'
// 权限路由
import authRoutes from './module/authComponent'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    ...defaultRoutes,
    ...authRoutes,
    {
      path: '/login', // 登陆
      name: 'login',
      component: () => import('@pages/Login')
    },
    {
      path: '/error/:status', // 403
      name: '403',
      component: () => import('@/layouts/ErrorPage')
    },
    {
      path: '*', // 404
      component: HeaderAsideLayout,
      children: [
        {
          path: '',
          component: () => import('@/layouts/NotFound')
        }
      ]
    }
  ]
})
