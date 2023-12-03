import Vue from 'vue'
import Vuex from 'vuex'

import app from '@/store/modules/app'
import auth from '@/store/modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    auth
  }
})

export default store
