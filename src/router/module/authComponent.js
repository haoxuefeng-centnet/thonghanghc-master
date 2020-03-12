/**
 * @Description: 有权限路由组件
 * @Author:
 * @Param { String } title 页面名称
 * @Param { Number } id 页面权限id
 * @Create: 2019/5/22
 *
 * @Version: 1.0.0
 */

import HeaderAsideLayout from '@/layouts/HeaderAsideLayout'
export default [
  {
    path: '/permission',
    component: HeaderAsideLayout,
    children: []
  }
]
