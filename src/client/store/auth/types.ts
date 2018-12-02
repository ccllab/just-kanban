interface UserConstructorParameter {
  _id: string,
  name: string
}

export class User {
  _id: string
  name: string

  constructor(para: UserConstructorParameter) {
    Object.assign(this, para)
  }
}

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