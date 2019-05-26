import { ApiRequestor } from '../utils/ApiRequestor';
import { IAuthApiHelper } from './interfaces/auth';
import InjectAuthToken from './middle-process/InjectAuthToken';

/**
 * Authentication api helper
 */
export const AuthApi: IAuthApiHelper = {

     /**
      * Sign up
      * @param param parameter
      * @returns ApiRequestor
      */
    signUp(param) {
        return ApiRequestor.request({
            url: '/api/user',
            method: 'POST',
            data: param
        });
    },

    /**
     * Login
     * @param param parameter
     * @returns ApiRequestor
     */
    login(param) {
        return ApiRequestor.request({
            url: '/api/user/login',
            method: 'POST',
            data: param
        });
    },

    /**
     * Get login user info
     * @returns ApiRequestor
     */
    getUserInfo() {
        return ApiRequestor.request({
            url: '/api/user/me',
            method: 'POST'
        }, InjectAuthToken);
    },

    /**
     * Query another User
     * @param param parameter
     * @returns ApiRequestor
     */
    queryUserInfo(param) {
        return ApiRequestor.request({
            url: '/api/user/search',
            method: 'POST',
            data: param
        }, InjectAuthToken);
    }
};