import { MutationTree } from 'vuex'

import { AuthState, types } from './types'
import { User } from '../../models/User.model'

export const mutations: MutationTree<AuthState> = {
  [types.SET_USER](state, payload: User): void {
    state.user = payload
  },

  [types.SET_TOKEN](state, payload: string): void {
    state.token = payload ? payload : null
  }
}