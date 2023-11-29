// import appApi from '@/api/app'
// import { unnecessaryRoutes, getURLParameters } from '@/helpers/utils'

const state = {
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
  async [actionTypes.init]({ getters, commit, dispatch }) {
    commit(mutationTypes.initStart)
    try {
      // url params
      // const urlParams = getURLParameters(window.location.href)
      // commit(mutationTypes.setUrlParams, urlParams)
      // // user
      // dispatch(actionTypesAuth.getCurrentUser)
      // // load cities
      // await dispatch(actionTypesCity.loadCities)
      // const currentUser = getters[getterTypesAuth.currentUser]
      // if (currentUser) {
      //   const { limited = null } = urlParams
      //   if (limited) {
      //     appApi.saveLimited({
      //       user_id: currentUser.id,
      //       token: currentUser.token,
      //       limited
      //     })
      //   }
      //
      //   dispatch(actionTypesMessage.init, { user_id: currentUser.id })
      // }
      // // routing
      // const resultsRoutes = await dispatch(actionTypes.initRouting)
      // setTimeout(() => {
      //   commit(mutationTypes.initSuccess, resultsRoutes)
      // }, 300)
    } catch (error) {
      commit(mutationTypes.initFailure, error)
    }
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
