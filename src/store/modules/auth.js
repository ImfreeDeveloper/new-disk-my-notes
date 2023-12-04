import LS from '@/helpers/localStorage'
import router from '@/routes'

const state = {
  isLoggedIn: false,
  currentUser: null
}

export const mutationTypes = {
  loginSuccess: '[auth] Login success',
  logout: '[auth] Logout'
}

export const actionTypes = {
  login: '[auth] Login',
  logout: '[auth] Logout'
}

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn'
}

const getters = {
  [getterTypes.currentUser]: state => {
    return state.currentUser
  },
  [getterTypes.isLoggedIn]: state => {
    return Boolean(state.isLoggedIn)
  }
}

const mutations = {
  [mutationTypes.loginSuccess](state, payload) {
    const currentUser = {
      ...state.currentUser,
      ...payload
    }
    state.isLoggedIn = true
    state.currentUser = currentUser

    LS.setUser(currentUser)
  },
  [mutationTypes.logout](state) {
    state.isLoggedIn = false
    state.currentUser = null
  }
}

const actions = {
  [actionTypes.logout]({ commit }) {
    commit(mutationTypes.logout)
    LS.clear()
    history.pushState(null, null, '/')
    router.push({ name: 'home' })
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
