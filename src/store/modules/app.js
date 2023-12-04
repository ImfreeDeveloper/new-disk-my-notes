import appAuth from '@/api/auth'
import router from '@/routes'
import LS from '@/helpers/localStorage'
import { mutationTypes as mutationTypesAuth } from '@/store/modules/auth'

const state = {
  isLoading: false
}

export const mutationTypes = {
  initStart: '[app] Init start',
  initSuccess: '[app] Success start',
  initFailure: '[app] Failure start'
}

export const actionTypes = {
  init: '[app] init',
  initRouting: '[app] init routing'
}

export const getterTypes = {
  loading: '[app] loading'
}

const getters = {
  [getterTypes.loading]: state => {
    return state.isLoading
  }
}

const mutations = {
  [mutationTypes.initStart](state) {
    state.isLoading = true
    state.validationErrors = null
  },
  [mutationTypes.initSuccess](state, payload) {
    state.isLoading = false
  },
  [mutationTypes.initFailure](state, payload) {
    state.isLoading = false
    state.validationErrors = payload
  }
}

const actions = {

  async [actionTypes.init]({ commit }) {
    const user = LS.getUser()

    if (!user?.accessToken) return

    commit(mutationTypes.initStart)
    try {
      const data = await appAuth.loginCheck()

      setTimeout(() => {
        commit(mutationTypes.initSuccess)

        commit(mutationTypesAuth.loginSuccess, {
          email: data.email,
          accessToken: user.accessToken
        })

        if (router.currentRoute.name !== 'notes') {
          router.push({ name: 'notes' })
        }
      }, 600)
    } catch (error) {
      setTimeout(() => {
        if (router.currentRoute.name !== 'home') {
          router.push({ name: 'home' })
        }

        commit(mutationTypes.initFailure, error)
      }, 600)
    }
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
