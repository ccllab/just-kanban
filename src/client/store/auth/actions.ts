import { ActionTree, Action } from 'vuex'

import authAPI from '../../api/AuthApiHelper'
import { RootState } from '../types'
import { 
  AuthState, 
  User,
  LoginParameters,
  types
} from './types'

export const actions: ActionTree<AuthState, RootState> = {
  async [types.AUTH_LOGIN]({ commit }, para: LoginParameters): Promise<boolean> {
    let { email, password } = para
    let result = await authAPI.login(email, password)

    if (!result) {
      commit(types.SET_USER, null)
      commit(types.SET_TOKEN, null)
      return false
    } else {
      let user: User = {
        _id: 'oqwodnqowcnowq',
        name: 'Jay'
      }

      commit(types.SET_USER, user)
      commit(types.SET_TOKEN, 'djksfndosjfnods')
      return true
    }
  },

  [types.AUTH_LOGOUT]({ commit }): void {
    commit(types.SET_USER, null)
  },

  async [types.AUTH_SIGNUP]({ commit }): Promise<boolean> {
    let result = await authAPI.signup()

    if (!result) {
      return false
    } else {
      let user: User = {
        _id: 'oqwodnqowcnowq',
        name: '123'
      }
      
      commit(types.SET_USER, user)
      commit(types.SET_TOKEN, 'djksfndosjfnods')
      return false
    }
  }
}