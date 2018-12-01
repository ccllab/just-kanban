import { ActionTree, Action } from 'vuex'

import authAPI from '../../api/AuthApiHelper'
import mTypes from './mutations'
import { RootState } from '../types'
import { 
  AuthState, 
  ActionsTypes, 
  User,
  LoginParameters
} from './types'


const types: ActionsTypes = {
  AUTH_LOGIN: 'login',
  AUTH_LOGOUT: 'logout',
  AUTH_SIGNUP: 'signup'
}

export default types

export const actions: ActionTree<AuthState, RootState> = {
  async [types.AUTH_LOGIN]({ commit }, para: LoginParameters): Promise<boolean> {
    let { email, password } = para
    let result = await authAPI.login(email, password)

    if (!result) {
      commit(mTypes.SET_USER, null)
      commit(mTypes.SET_TOKEN, null)
      return false
    } else {
      let user: User = {
        _id: 'oqwodnqowcnowq'
      }

      commit(mTypes.SET_USER, user)
      commit(mTypes.SET_TOKEN, 'djksfndosjfnods')
      return true
    }
  },

  [types.AUTH_LOGOUT]({ commit }): void {
    commit(mTypes.SET_USER, null)
  },

  async [types.AUTH_SIGNUP]({ commit }): Promise<boolean> {
    let result = await authAPI.signup()

    if (!result) {
      return false
    } else {
      let user: User = {
        _id: 'oqwodnqowcnowq'
      }
      
      commit(mTypes.SET_USER, user)
      commit(mTypes.SET_TOKEN, 'djksfndosjfnods')
      return false
    }
  }
}