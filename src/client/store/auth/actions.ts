import { ActionTree } from 'vuex'
import * as _ from 'lodash'

import { TokenManager } from '../../utils/TokenManager'
import { User } from '../../models/User.model'
import { AuthApi } from '../../api'
import { RootState } from '../types'
import { 
  AuthState, 
  LoginParameters,
  SignupParameters,
  types
} from './types'

export const actions: ActionTree<AuthState, RootState> = {
  async [types.AUTH_SIGNUP]({ commit }, payload: SignupParameters): Promise<boolean> {
    let resData = await AuthApi.signup(payload)

    if (resData.result) {
      let user: User = _.pick(resData, ['userId', 'username', 'email'])
      commit(types.SET_USER, user)
      return true
    } else {
      commit(types.SET_USER, null)
      return false
    }
  },

  async [types.AUTH_LOGIN]({ commit }, para: LoginParameters): Promise<boolean> {
    let resData = await AuthApi.login(para)

    if (resData.result) {
      let user: User = _.pick(resData, ['userId', 'username', 'email'])
      commit(types.SET_USER, user)
      return true
    } else {
      commit(types.SET_USER, null)
      return false
    }
  },

  async [types.AUTH_INIT]({ commit }): Promise<void> {
    let resData = await AuthApi.getUserInfo()

    if (resData.result) {
      let user: User = _.pick(resData, ['userId', 'username', 'email'])
      commit(types.SET_USER, user)
    }

    commit(types.SET_IS_AUTHENTICATED)
  },

  [types.AUTH_LOGOUT]({ commit }): void {
    commit(types.SET_USER, null)
    TokenManager.clear()
  },

  async [types.AUTH_FAKE_LOGIN]({ commit }, para: LoginParameters): Promise<boolean> {
    let user: User = {
      userId: '666',
      username: 'Jay',
      email: 'test@gmail.com'
    }
    commit(types.SET_USER, user)
    console.warn('Fake login mode !!!!!!!!')
    return true
  },
}