import VueCookie from "../utils/cookies/VueCookies";

/**
 * Authentication api helper
 */
export default class AuthApiHelper {

    /**
     * Login
     */
    public static login(): void {
        let cookieInstance = VueCookie.getInstance();

        console.log(cookieInstance.get('vue-cookie-test'));
    }
}
