import VueCookie from '../utils/cookies/VueCookies';
import { ApiRequestor } from '../utils/ApiRequestor'
import { IAuthApiHelper } from './interfaces/auth'
import InjectAuthToken from './middle-process/InjectAuthToken'

/**
 * Authentication api helper
 */
export const AuthApi: IAuthApiHelper = {
     /**
     * Signup
     */
    signup(param) {
        return ApiRequestor.request({
            url: '/api/user',
            method: 'POST',
            data: param
        })
    },

    /**
     * Login
     */
    login(param) {
        return ApiRequestor.request({
            url: '/api/user/login',
            method: 'POST',
            data: param
        })
    },

    /**
     * Get login user info
     */
    getUserInfo() {
        return ApiRequestor.request({
            url: '/api/user/me',
            method: 'POST'
        }, InjectAuthToken)
    },

    /**
     * Query another User
     * @param param 
     */
    queryUserInfo(param) {
        return ApiRequestor.request({
            url: '/api/user/search',
            method: 'POST',
            data: param
        }, InjectAuthToken)
    }
}