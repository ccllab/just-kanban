import { beforeRequestPeocess } from '../../utils/ApiRequestor'
import CookieUtil from '../../utils/cookies/VueCookies'
import { authToken, refreshToken } from '../cookie-header-pair'

const InjectAuthToken: beforeRequestPeocess = (config) => {
  const cookie = CookieUtil.getInstance()
  let authTokenValue = cookie.get(authToken.CookieName)
  let refreshTokenValue = cookie.get(refreshToken.CookieName)

  if (!authTokenValue || !refreshTokenValue) return
  
  config.headers || (config.headers = {})
  config.headers[authToken.HeaderName] = authTokenValue
  config.headers[refreshToken.HeaderName] = refreshTokenValue
}

export default InjectAuthToken