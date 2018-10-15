import {User} from "../../repository";

/**
 * The interface for authentication service
 */
export interface IAuthService {

    /**
     * Add new user
     * @param user The new user that want to add.
     */
    addNewUser(user: User): Promise<User>;

    /**
     * Get user by authToken, if authToken expired, refresh authToken
     * @param authToken access token
     * @param refreshToken Refresh token
     * @return The user passing authentication.
     */
    getUserByToken(authToken: string, refreshToken: string): Promise<User>;

    /**
     * User login verify
     * @param email User's email
     * @param password User's password
     * @param isRememberMe Is remember login status.
     * @return The user passing authentication.
     */
    verify(email: string, password: string, isRememberMe: boolean): Promise<User>;
}
