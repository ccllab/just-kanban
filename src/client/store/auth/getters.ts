import { GetterTree } from 'vuex'

import { AuthState, User, types } from './types'
import { RootState } from '../types'

export const getters: GetterTree<AuthState, RootState> = {
  [types.USER](state): User | boolean {
    return !!state.user && state.user
  },

  [types.IS_LOGIN](state): boolean {
    return !!state.user
  }
}