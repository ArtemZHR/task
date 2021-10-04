import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

const moment = require('moment')
require('moment/locale/es')

Vue.use(require('vue-moment'), {
  moment
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
