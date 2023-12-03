import authApi from '@/api/auth'
import LS from '@/helpers/localStorage'
import router from '@/routes'
import { mutationTypes as mutationTypesApp } from '@/store/modules/app'

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
  isAnonymous: '[auth] isAnonymous',
  validationErrors: '[auth] validationErrors',
  step: '[auth] step'
}

const getters = {
  [getterTypes.currentUser]: state => {
    return state.currentUser
  },
  [getterTypes.isLoggedIn]: state => {
    return Boolean(state.isLoggedIn)
  },
  [getterTypes.isAnonymous]: state => {
    return !state.isLoggedIn
  },
  [getterTypes.step]: state => {
    return state.step
  },
  [getterTypes.validationErrors]: state => {
    return state.validationErrors
  }
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.validationErrors = null
  },
  [mutationTypes.registerFailure](state, payload) {
    state.validationErrors = payload
  },
  [mutationTypes.loginStart](state) {
    state.validationErrors = null
  },
  [mutationTypes.saveDataUserStart](state) {
    state.validationErrors = null
  },
  [mutationTypes.saveDataUserSuccess](state, payload) {
    state.currentUser = {
      ...state.currentUser,
      ...payload
    }
  },
  [mutationTypes.saveDataUser](state, payload) {
    state.currentUser = {
      ...state.currentUser,
      ...payload
    }
  },
  [mutationTypes.saveDataUserFailure](state, payload) {
    state.validationErrors = payload
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isLoggedIn = true
    state.currentUser = {
      ...state.currentUser,
      ...payload
    }
  },
  [mutationTypes.loginFailure](state, payload) {
    state.validationErrors = payload
  },

  [mutationTypes.deleteAccountStart](state) {
    state.validationErrors = null
  },
  [mutationTypes.deleteAccountFailure](state, payload) {
    state.validationErrors = payload
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
  [mutationTypes.authStep](state, payload) {
    state.step = payload
  },
  [mutationTypes.logout](state) {
    state.isLoggedIn = false
    state.currentUser = null
    state.messages = []
    state.unreaded = null
  }
}

const actions = {
  async [actionTypes.register]({ state, commit }, payload) {
    commit(mutationTypes.registerStart)
    try {
      const data = await authApi.register(payload)
      if (data.success) {
        setTimeout(() => {
          commit(mutationTypes.registerSuccess, payload)
        }, 600)
      } else {
        // this.validErrorPhoneAPI = {
        //   isError: true,
        //   message: data.error,
        //   phoneError: this.phone
        // }
        commit(mutationTypes.registerFailure, data.error)
      }
    } catch (error) {
      commit(mutationTypes.registerFailure, error)
    }
  },
  // async [actionTypes.login]({ commit, dispatch }, payload) {
  //   commit(mutationTypes.loginStart)
  //   try {
  //     const data = await authApi.login(payload)
  //     if (data.success) {
  //       commit(mutationTypes.loginSuccess, {
  //         ...data.results,
  //         ...payload
  //       })
  //       Cookies.set('c_auth', `${payload.phone}_${payload.token}`, {
  //         expires: 3
  //       })
  //       LS.setUser(state.currentUser)
  //       dispatch(actionTypesCity.loadCityCurrentUser)
  //       router.push({ name: 'account' })
  //     } else {
  //       commit(mutationTypes.loginFailure, data.error)
  //     }
  //   } catch (error) {
  //     commit(mutationTypes.loginFailure, error)
  //   }
  // },
  async [actionTypes.deleteAccount]({ commit, dispatch }, payload) {
    commit(mutationTypes.deleteAccountStart)
    try {
      const data = await authApi.deleteAccount(payload)
      if (data.success) {
        commit(mutationTypes.deleteAccountSuccess)
        dispatch(actionTypes.logout)
      } else {
        commit(mutationTypes.deleteAccountFailure, data.error)
      }
    } catch (error) {
      commit(mutationTypes.deleteAccountFailure, error)
    }
  },
  async [actionTypes.saveDataUser]({ commit }, payload) {
    commit(mutationTypes.saveDataUserStart)
    try {
      const data = await authApi.saveDataUser(payload)
      if (data.success) {
        commit(mutationTypes.saveDataUserSuccess, {
          firstname: payload.first_name,
          lastname: payload.last_name,
          middlename: payload.middle_name,
          fill_percent: data.results.fill_percent,
          ...payload
        })
        LS.setUser(state.currentUser)
      } else {
        commit(mutationTypes.saveDataUserFailure, data.error)
      }
      return data
    } catch (error) {
      commit(mutationTypes.saveDataUserFailure, error)
    }
  },
  // [actionTypes.getCurrentUser]({ commit }) {
  //   const userCurrent = LS.getUser()
  //   // commit(mutationTypes.getCurrentUserStart)
  //   if (userCurrent && userCurrent.token) {
  //     commit(
  //       mutationTypes.getCurrentUserSuccess,
  //       userCurrent
  //     )
  //   }
  // },
  [actionTypes.logout]({ commit }) {
    commit(mutationTypesApp.initStart)
    commit(mutationTypes.logout)
    LS.clear()
    history.pushState(null, null, '/')
    router.push({ name: 'auth' })
    location.reload()
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
