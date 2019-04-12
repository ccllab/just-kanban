import { successMiddleProcess } from '../../utils/ApiRequestor';
import { TokenManager } from '../../utils/TokenManager';
import { TokenConfig } from '../../config';

/**
 * AuthTokenProccessor
 * @param res res
 */
export const AuthTokenProccessor: successMiddleProcess = (res) => {
  let authKey = TokenConfig.auth.key;
  let refreshKey = TokenConfig.refresh.key;
  
  let authTokenValue: string = res.headers[authKey];
  let refreshTokenValue: string = res.headers[refreshKey];

  TokenManager.set(authKey, authTokenValue);
  TokenManager.set(refreshKey, refreshTokenValue);
};