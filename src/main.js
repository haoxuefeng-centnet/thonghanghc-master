import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './middleware/authRouter'

// plugins
import './plugins'

// styles
import './styles'

// 全局 mixins
import globalMixins from './mixins/global'
Vue.mixin(globalMixins)

// 全局filter
import filter from './lib/filter'
Vue.filter('disposeNonData', filter.disposeNonData)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
