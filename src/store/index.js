import Vue from 'vue'
import Vuex from 'vuex'
import userModules from './modules/user'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    user: userModules
  }
})
