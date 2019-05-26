import { User } from '../../models/User.model';

export interface AuthState {
  user: User,
  isAuthenticated: boolean
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
  AUTH_SIGNUP: 'signUp',
  AUTH_LOGIN: 'login',
  AUTH_LOGOUT: 'logout',
  AUTH_INIT: 'authInit',

  // getters
  USER: 'user',
  IS_LOGIN: 'isLogin',
  IS_AUTHENTICATED: 'isAuthenticated',

  // mutations
  SET_USER: 'setUser',
  SET_IS_AUTHENTICATED: 'setIsAuthenticated'
};