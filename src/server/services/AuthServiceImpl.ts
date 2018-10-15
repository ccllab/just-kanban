import {IAuthService} from "./interfaces/IAuthService";
import {IUserRepository, JwtPayload, User} from "../repository";
import {inject, injectable} from "inversify";
import {sign, verify} from "jsonwebtoken";
import {TYPES} from "../ioc";
import AuthError from "./exceptions/AuthError";

/**
 * The implementation for authentication service
 */
@injectable()
export class AuthServiceImpl implements IAuthService {

    /**
     * constructor
     * @param userRepository User Repository
     */
    public constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) {
    }

    /**
     * Generate and inject new authToken and refreshToken to user.
     * @param user User entity
     * @param isLongExpiration Extend token expiration or not.
     * @return The user entity injected with new token.
     */
    private static injectNewToken(user: User, isLongExpiration: boolean): User {

        const {SECRET_KEY, LONG_EXPIRATION, NORMAL_EXPIRATION, TOKEN_LIFE_USING_REFRESH} = process.env;

        // authToken for access, expires after 20 min.
        user.authToken = sign(
            {
                username: user.username,
                email: user.email
            },
            SECRET_KEY,
            {
                expiresIn: parseInt(TOKEN_LIFE_USING_REFRESH)
            }
        );

        // after 20 min, use refresh token to refresh
        user.refreshToken = sign(
            {},
            SECRET_KEY,
            {
                expiresIn: isLongExpiration ? parseInt(LONG_EXPIRATION) : parseInt(NORMAL_EXPIRATION)
            }
        );

        return user;
    }


    /**
     * Add new user
     * @param user The new user that want to add.
     */
    public async addNewUser(user: User): Promise<User> {

        // check email if is already used.
        if (await this.userRepository.getBy({email: user.email})) {

            throw new AuthError("This email has been used!");
        }

        return this.userRepository.add(AuthServiceImpl.injectNewToken(user, true));
    }

    /**
     * Get user by authToken, if authToken expired, refresh authToken
     * @param authToken access token
     * @param refreshToken Refresh token
     * @return The user passing authentication.
     */
    public async getUserByToken(authToken: string, refreshToken: string): Promise<User> {

        // Check the token if is exist in database or not.
        if (! await this.userRepository.getBy({authToken})) {
            throw new AuthError('This token is invalid.');
        }

        const {SECRET_KEY} = process.env;
        let payload: JwtPayload = new JwtPayload(null, null);

        // todo Nested try-catch, need refactor
        try {
            // verify authToken first.
            payload = verify(authToken, SECRET_KEY) as JwtPayload;
        } catch (err) {

            // if failed, try verify refreshToken.
            try {
                verify(refreshToken, SECRET_KEY);

                // verify success, then get user data to update user's token.
                let user = await this.userRepository.getBy({refreshToken});
                let updated = await this.userRepository.update(
                    AuthServiceImpl.injectNewToken(user, true)
                );

                // update payload
                Object.assign(payload, updated);
            } catch (err) {
                throw new AuthError(err.message);
            }
        }

        // get user data by payload.
        return await this.userRepository.getBy({
            email: payload.email,
            username: payload.username
        });
    }

    /**
     * User login verify
     * @param email User's email
     * @param password User's password
     * @param isRememberMe Is remember login status.
     * @return The user passing authentication.
     */
    public async verify(email: string, password: string, isRememberMe: boolean = false): Promise<User> {
        let user = await this.userRepository.getBy({email});

        if (user.password !== password) {
            throw new AuthError('Wrong email or password!');
        }

        // Update new token for login user.
        return this.userRepository.update(AuthServiceImpl.injectNewToken(user, isRememberMe));
    }
}
