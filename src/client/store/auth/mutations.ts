import { MutationTree } from 'vuex'

import { AuthState, types } from './types'
import { User } from '../../models/User.model'

export const mutations: MutationTree<AuthState> = {
  [types.SET_USER](state, payload: User): void {
    state.user = payload ? payload : null
  }
}