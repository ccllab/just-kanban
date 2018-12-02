export class User {
  _id: string
}

export interface AuthState {
  user: User,
  token: string
}

export interface LoginParameters {
  email: string,
  password: string
}