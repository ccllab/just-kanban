import { User } from '../../models/User.model'

export interface AuthState {
  user: User,
  token: string
}

export interface LoginParameters {
  email: string,
  password: string
}

export const types = {
  // actions
  AUTH_LOGIN: 'login',
  AUTH_LOGOUT: 'logout',
  AUTH_SIGNUP: 'signup',

  // getters
  USER: 'user',
  IS_LOGIN: 'isLogin',

  // mutations
  SET_USER: 'setUser',
  SET_TOKEN: 'setToken'
}