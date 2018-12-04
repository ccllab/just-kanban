import { ActionTree, Action } from 'vuex'

import { AuthApi } from '../../api'
import { RootState } from '../types'
import { 
  AuthState, 
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

    return false
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
      return false
    }
  }
}