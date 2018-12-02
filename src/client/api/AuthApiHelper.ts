import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import VueCookie from '../utils/cookies/VueCookies';

/**
 * Authentication api helper
 */
export default class AuthApiHelper {

    /**
     * Login
     */
    public static login(email: string, password: string): Promise<boolean> {
        let config: AxiosRequestConfig = {
            method: 'POST',
            data: {
                email,
                password
            }
        }

        return axios('/api/auth/login', config)
            .then(successHandler)
            .catch(failHandler)

        function successHandler(res: AxiosResponse) {
            return true
        }

        function failHandler(res: AxiosResponse) {
            return false
        }
    }

    /**
     * Logout
     */
    public static logout(): Promise<any> {
        return axios('/api/auth/logout')
    }

    /**
     * Signup
     */
    public static signup(): Promise<any> {
        let config: AxiosRequestConfig = {}
        return axios('/api/auth/signup', config)
            .then(successHandler)
            .catch(failHandler)

        function successHandler(res: AxiosResponse) {
            return true
        }

        function failHandler(res: AxiosResponse) {
            return false
        }
    }
}
