import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

import { RootState } from './types'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'
import { auth } from './auth'
import { boards } from './board'

Vue.use(Vuex)

const state: RootState = {
  error: ''
}

const store: StoreOptions<RootState> = {
  state,
  getters,
  actions,
  mutations,
  modules: {
    auth,
    boards
  },
  strict: true
}

export default new Vuex.Store<RootState>(store)
