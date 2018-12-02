import { GetterTree } from 'vuex'

import { AuthState, User, GettersTypes } from './types'
import { RootState } from '../types'

const types: GettersTypes = {
  USER: 'user',
  IS_LOGIN: 'isLogin'
}

export default types

export const getters: GetterTree<AuthState, RootState> = {
  [types.USER](state): User | boolean {
    return state.isAuthed && !!state.user && state.user
  },

  [types.IS_LOGIN](state): boolean {
    return state.isAuthed && !!state.user
  }
}