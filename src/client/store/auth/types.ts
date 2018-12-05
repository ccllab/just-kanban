import { User } from '../../models/User.model'

export interface AuthState {
  user: User
}

export interface LoginParameters {
  email: string
  password: string
  isRememberMe: boolean
}
export interface SignupParameters extends User {
  password: string
  confirm: string
}

export interface LoginFunc {
  (param: LoginParameters): Promise<boolean>
}
export interface SignupFunc {
  (param: SignupParameters): Promise<boolean>
}
export interface LogoutFunc {
  (): void
}

export const types = {
  // actions
  AUTH_SIGNUP: 'signup',
  AUTH_LOGIN: 'login',
  AUTH_LOGOUT: 'logout',
  AUTH_FAKE_LOGIN: 'loginFake',

  // getters
  USER: 'user',
  IS_LOGIN: 'isLogin',

  // mutations
  SET_USER: 'setUser',
}