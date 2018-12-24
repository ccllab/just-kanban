import { beforeRequestPeocess } from '../../utils/ApiRequestor';
import { TokenManager } from '../../utils/TokenManager';
import { TokenConfig } from '../../config';

/**
 * InjectAuthToken
 * @param config config
 */
const InjectAuthToken: beforeRequestPeocess = (config) => {
  let authKey = TokenConfig.auth.key;
  let refreshKey = TokenConfig.refresh.key;

  let authTokenValue = TokenManager.get(authKey);
  let refreshTokenValue = TokenManager.get(refreshKey);

  if (!authTokenValue || !refreshTokenValue) return;

  config.headers || (config.headers = {});
  config.headers[authKey] = authTokenValue;
  config.headers[refreshKey] = refreshTokenValue;
};

export default InjectAuthToken;