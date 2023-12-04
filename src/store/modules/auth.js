import LS from '@/helpers/localStorage'
import router from '@/routes'

const state = {
  isLoggedIn: false,
  currentUser: null,
  validationErrors: null
}

export const mutationTypes = {
  registerStart: '[auth] Register start',
  registerSuccess: '[auth] Register success',
  registerFailure: '[auth] Register failure',

  loginStart: '[auth] Login start',
  loginSuccess: '[auth] Login success',
  loginFailure: '[auth] Login failure',

  deleteAccountStart: '[auth] deleteAccount start',
  deleteAccountSuccess: '[auth] deleteAccount success',
  deleteAccountFailure: '[auth] deleteAccount failure',

  saveDataUserStart: '[auth] saveDataUser start',
  saveDataUserSuccess: '[auth] saveDataUser success',
  saveDataUserFailure: '[auth] saveDataUser failure',

  getCurrentUserStart: '[auth] Get current user start',
  getCurrentUserSuccess: '[auth] Get current user success',
  getCurrentUserFailure: '[auth] Get current user failure',

  saveDataUser: '[auth] Save data user mutation',

  logout: '[auth] Logout',

  authStep: '[auth] auth step'
}

export const actionTypes = {
  register: '[auth] Register',
  login: '[auth] Login',
  deleteAccount: '[auth] deleteAccount',
  getCurrentUser: '[auth] Get current user',
  saveDataUser: '[auth] Save data user action',
  logout: '[auth] Logout'
}

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  validationErrors: '[auth] validationErrors'
}

const getters = {
  [getterTypes.currentUser]: state => {
    return state.currentUser
  },
  [getterTypes.isLoggedIn]: state => {
    return Boolean(state.isLoggedIn)
  },
  [getterTypes.validationErrors]: state => {
    return state.validationErrors
  }
}

const mutations = {
  [mutationTypes.loginStart](state) {
    state.validationErrors = null
  },
  [mutationTypes.loginSuccess](state, payload) {
    const currentUser = {
      ...state.currentUser,
      ...payload
    }
    state.isLoggedIn = true
    state.currentUser = currentUser

    LS.setUser(currentUser)
  },
  [mutationTypes.loginFailure](state, payload) {
    state.validationErrors = payload
  },

  [mutationTypes.deleteAccountStart](state) {
    state.validationErrors = null
  },

  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false
    state.isLoggedIn = true
    state.currentUser = payload
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false
    state.isLoggedIn = false
    state.currentUser = null
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
    // location.reload()
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
