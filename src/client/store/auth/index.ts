import { Module } from 'vuex'

import { AuthState, User } from './types'
import { RootState } from '../types'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'

const state: AuthState = {
  // user: new User({_id: '8888', name: 'Jay'}),
  user: null,
  token: null
}

export const auth: Module<AuthState, RootState> = {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}