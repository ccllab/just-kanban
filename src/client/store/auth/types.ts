export interface User {
  _id: string
}

export interface AuthState {
  user: User,
  isAuthed: boolean,
  token: string
}

export interface GettersTypes {
  USER: string,
  IS_LOGIN: string
}

export interface ActionsTypes {
  AUTH_LOGIN: string,
  AUTH_LOGOUT: string,
  AUTH_SIGNUP: string
}

export interface LoginParameters {
  email: string,
  password: string
}

export interface MutationsTypes {
  SET_USER: string,
  SET_TOKEN: string
}
