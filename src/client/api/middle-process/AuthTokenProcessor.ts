import { successMiddleProcess } from '../../utils/ApiRequestor'
import CookieUtil from '../../utils/cookies/VueCookies'
import { authToken, refreshToken } from '../cookie-header-pair'

export const AuthTokenProccessor: successMiddleProcess = (res) => {
  const cookie = CookieUtil.getInstance()

  let authTokenValue: string = res.headers[authToken.HeaderName]
  let refreshTokenValue: string = res.headers[refreshToken.HeaderName]

  cookie.set(authToken.CookieName, authTokenValue)
  cookie.set(refreshToken.CookieName, refreshTokenValue)
}