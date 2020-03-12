/**
 * @Description: 默认路由配置
 * @Author:
 * @Create: 2019/5/23
 * @Version: 1.0.0
 */
// layout 默认主布局路由组件
import HeaderAsideLayout from '@/layouts/HeaderAsideLayout'
import ParentPage from '@/pages/Parent'
const defaultRoute = [
  {
    path: '/',
    component: HeaderAsideLayout,
    redirect: '/workplace',
    children: [
      {
        path: 'workplace', // 工作台
        component: () => import('@pages/WorkPlace'),
        meta: { title: '工作台' }
      },
      {
        path: 'appUser', // app用户
        component: () => import('@pages/User/AppUser'),
        meta: { title: 'app用户' }
      },
      {
        path: 'adminUser', // 后台用户
        component: () => import('@pages/User/Admin'),
        meta: { title: '后台用户' }
      },
      {
        path: 'shop', // 店铺管理
        component: ParentPage,
        redirect: '/shop/index',
        children: [
          {
            path: 'index', // 微店列表
            component: () => import('@pages/Shop'),
            meta: { title: '微店列表' }
          },
          {
            path: 'info', // 微店详情
            component: () => import('@pages/Shop/ShopInfo'),
            meta: { title: '微店详情' }
          }
        ]
      },
      {
        path: 'order/list', // 订单列表
        component: () => import('@pages/Order/OrderList'),
        meta: { title: '订单列表' }
      },
      {
        path: 'money/list', // 定金列表
        component: () => import('@pages/Order/MoneyList'),
        meta: { title: '定金列表' }
      },
      {
        path: 'vip', // vip特权管理
        component: () => import('@pages/Vip/VipConfig'),
        meta: { title: 'vip特权管理' }
      },
      {
        path: 'querylist', // vip特权管理
        component: () => import('@pages/Cars/Querylist'),
        meta: { title: '查询成交价列表' }
      },
      {
        path: 'carlist', // 车辆管理
        component: () => import('@pages/Cars/CarList'),
        meta: { title: '车辆列表' }
      },
      {
        path: 'carinfo', // 车辆详情
        component: () => import('@pages/Cars/CarList/CarsInfo'),
        meta: { title: '车辆详情' }
      },
      {
        path: 'carsModel', // 车型列表
        component: () => import('@pages/Cars/CarsModel'),
        meta: { title: '车型列表' }
      },
      {
        path: '/system', // 系统管理模块
        component: ParentPage,
        redirect: '/system/banner',
        children: [
          {
            path: 'banner', // 轮播管理
            component: () => import('@pages/Banner'),
            meta: { title: '轮播管理' }
          },
          {
            path: 'gvie', // 赠送配置
            component: () => import('@pages/Gvie'),
            meta: { title: '赠送配置' }
          }
        ]
      },
      {
        path: '/feedback', // 意见反馈
        component: () => import('@pages/Feedback'),
        meta: { title: '意见反馈' }
      }
    ]
  }
]

export default defaultRoute
