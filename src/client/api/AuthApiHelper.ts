import VueCookie from '../utils/cookies/VueCookies';
import { ApiRequestor } from './ApiRequestor'
import { IAuthApiHelper } from './interfaces/auth'

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

    getUserInfo() {
        return ApiRequestor.request({
            url: '/api/user/me',
            method: 'POST'
        })
    },

    queryUserInfo(param) {
        return ApiRequestor.request({
            url: '/api/user/search',
            method: 'POST',
            data: param
        })
    },

    /**
     * Logout
     */
    logout() {
        
    }
}