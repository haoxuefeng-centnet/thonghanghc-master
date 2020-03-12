/**
 * @Description: 系统菜单配置
 * @author Gyang18
 * @date 2019-08-01
 */
// 菜单顺序（从上至下）
const firstMenu = [
  {
    path: '/workplace',
    title: '工作台',
    icon: 'md-desktop'
  },
  {
    path: '/shop/index',
    title: '微店管理',
    icon: 'md-appstore'
  },
  {
    path: '/appUser',
    title: '用户管理',
    icon: 'md-person',
    children: [
      {
        path: '/appUser',
        title: '用户列表',
        icon: ''
      }
    ]
  }
]
// 权限菜单
const authMenu = [
  {
    path: '',
    title: '后台系统用户',
    icon: 'md-person',
    children: [
      {
        path: '/adminUser',
        title: '管理员列表',
        icon: ''
      }
    ]
  },
  {
    path: '/vip',
    title: 'vip特权',
    icon: 'logo-vimeo',
    children: [
      {
        path: '/vip',
        title: 'vip配置',
        icon: ''
      }
      // {
      //   path: '/generalize',
      //   title: '推广配置',
      //   icon: ''
      // }
    ]
  },
  {
    path: '/system',
    title: '系统管理',
    icon: 'md-construct',
    children: [
      {
        path: '/system/banner',
        title: '轮播管理',
        icon: ''
      },
      {
        path: '/system/gvie',
        title: '赠送功能配置',
        icon: ''
      }
    ]
  },
  {
    path: '/feedback',
    title: '意见反馈',
    icon: 'md-paper'
  }
]

// 默认菜单
const defaultMenu = [
  {
    path: '/order',
    title: '订单管理',
    icon: 'md-paper',
    children: [
      {
        path: '/order/list',
        title: '订单列表',
        icon: ''
      },
      {
        path: '/money/list',
        title: '定金列表',
        icon: ''
      }
    ]
  },
  {
    path: '/cars',
    title: '车辆管理',
    icon: 'md-car',
    children: [
      {
        path: '/carlist',
        title: '车辆列表',
        icon: ''
      },
      {
        path: '/carsModel',
        title: '车型列表',
        icon: ''
      }
    ]
  }
]

/*
 * roleType 0 超管 1 区域管理员
 * */
export default roleType => {
  if (roleType === 0) {
    return [...firstMenu, ...authMenu, ...defaultMenu]
  }
  return [...firstMenu, ...defaultMenu]
}
