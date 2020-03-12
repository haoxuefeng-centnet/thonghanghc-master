/**
 * @Description: 用户模块
 * @Author:
 * @Param { Object }
 * @Create: 2019/5/19
 * @Version: 1.0.0
 */
import { getToken, saveToken, removeToken } from '@utils/auth'
import { UserInfo } from '@api/admin'
import creatSlideMenu from '@/MenuConfig'
import { Message } from 'iview'

const userModules = {
  state: {
    userInfo: null,
    token: getToken(),
    sliderMenu: []
  },
  mutations: {
    // 保存用户信息
    SAVE_USER(state, n) {
      state.userInfo = n
      state.token = n.userToken
      saveToken(n.userToken)
      // 创建菜单
      state.sliderMenu = creatSlideMenu(n.userType || 0)
    },
    // 清除用户信息
    CLEAR_USER(state) {
      state.userInfo = null
      state.token = null
      removeToken()
    }
  },
  getters: {},
  actions: {
    // 保存用户信息
    saveUserInfo({ commit }, data) {
      return new Promise(resolve => {
        commit('SAVE_USER', data)
        setTimeout(() => {
          resolve({ success: true })
        }, 500)
      })
    },
    clearUserInfo({ commit }) {
      commit('CLEAR_USER')
    },
    // 获取用户信息
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        UserInfo()
          .then(res => {
            if (res.code === 200) {
              commit('SAVE_USER', res.data)
              resolve({ success: true })
            } else {
              resolve({ success: false })
            }
          })
          .catch(err => {
            reject(err)
            Message.$error('获取用户资料出现异常，请刷新重试！')
          })
      })
    }
  }
}

export default userModules
