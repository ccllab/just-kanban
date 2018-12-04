import { BaseResponseData } from './base'
import { User } from '../../store/auth/types'

export interface SignupRequest extends User{
  password: string
  confirm: string
}
export interface LoginRequest {
  email: string
  password: string
  isRememberMe: boolean
}
export interface QueryUserRequest {
  email: string
}

export interface SignupResponseData extends BaseResponseData, User {}
export interface LoginResponseData extends BaseResponseData, User {}
export interface GetUserResponseData extends BaseResponseData, User {}
export interface QueryUserResponseData extends BaseResponseData, User {}

export interface IAuthApiHelper {
  signup(param: SignupRequest): Promise<SignupResponseData>;
  login(param: LoginRequest): Promise<LoginResponseData>;
  getUserInfo(): Promise<GetUserResponseData>;
  queryUserInfo(param: QueryUserRequest): Promise<QueryUserResponseData>;
  logout(): void;
}

