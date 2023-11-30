/* eslint-disable no-new */
import './static/scss/main.scss'

import Vue from 'vue'
import router from '@/routes'
import store from '@/store'

import App from '@/templates/App.vue'

import MainLayout from '@/templates/layouts/MainLayout.vue'

import Vuelidate from 'vuelidate'

Vue.component('default', MainLayout)

Vue.use(Vuelidate)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
