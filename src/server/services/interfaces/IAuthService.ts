import {User} from "../../repository";
import {UserAuthenticationDto} from "../dtos/UserAuthenticationDto";

/**
 * The interface for authentication service
 */
export interface IAuthService {

    /**
     * Add new user
     * @param user The new user that want to add.
     */
    addNewUser(user: User): Promise<UserAuthenticationDto>;

    /**
     * Get user auth dto, if authToken expired, refresh authToken
     * @param accessToken access token
     * @param refreshToken Refresh token
     * @return The user auth dto passing authentication.
     */
    getUserAuthByToken(accessToken: string, refreshToken: string): Promise<UserAuthenticationDto>;

    /**
     * User login verify
     * @param email User's email
     * @param password User's password
     * @param isRememberMe Is remember login status.
     * @return The user passing authentication.
     */
    verify(email: string, password: string, isRememberMe: boolean): Promise<UserAuthenticationDto>;
}
