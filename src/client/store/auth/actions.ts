import { ActionTree, Action } from 'vuex'

import { AuthApi } from '../../api'
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
    let result = await AuthApi.login({
      email,
      password,
      isRememberMe: false
    })

    if (!result) {
      commit(types.SET_USER, null)
      commit(types.SET_TOKEN, null)
      return false
    } else {
      let user: User = {
        userId: 'oqwodnqowcnowq',
        username: 'Jay'
      }

      commit(types.SET_USER, user)
      commit(types.SET_TOKEN, 'djksfndosjfnods')
      return true
    }
  },

  [types.AUTH_LOGOUT]({ commit }): void {
    commit(types.SET_USER, null)
  },

  async [types.AUTH_SIGNUP]({ commit }, payload): Promise<boolean> {
    let param = payload
    let res = await AuthApi.signup({
      userId: '',
      email: '',
      username: '',
      password: '',
      confirm: ''
    })

    if (!res.result) {
      return false
    } else {
      let user: User = {
        userId: 'oqwodnqowcnowq',
        username: '123'
      }
      
      commit(types.SET_USER, user)
      commit(types.SET_TOKEN, 'djksfndosjfnods')
      return false
    }
  }
}