import {IAuthService} from "./interfaces/IAuthService";
import {IUserRepository, JwtPayload, User} from "../repository";
import {inject, injectable} from "inversify";
import {sign, verify} from "jsonwebtoken";
import {TYPES} from "../ioc";
import AuthError from "./exceptions/AuthError";

/**
 * 登入驗證服務
 */
@injectable()
export class AuthServiceImpl implements IAuthService {

    /**
     * 建構函數
     * @param userRepository 使用者資料儲存庫
     */
    public constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) {
    }

    /**
     * 產生新的 access token
     * @param user 使用者實體資料
     * @param isLongExpiration 是否延長 RefreshToken 期限
     * @return 取得新 token 的使用者資料
     */
    private static injectNewToken(user: User, isLongExpiration: boolean): User {

        const {SECRET_KEY, LONG_EXPIRATION, NORMAL_EXPIRATION, TOKEN_LIFE_USING_REFRESH} = process.env;

        // authToken 用於 access, 只有 20 分鐘
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

        // 過了 20 分鐘用 refresh token 刷新
        // refresh token 的期限根據 isLongExpiration 記住我設為 1 天或 1 週
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
     * 註冊使用者
     * @param user 新增的使用者
     */
    public async addNewUser(user: User): Promise<User> {

        // 檢查信箱是否已經使用
        if (await this.userRepository.getBy({email: user.email})) {

            throw new AuthError("This email has been used!");
        }

        return this.userRepository.add(AuthServiceImpl.injectNewToken(user, true));
    }

    /**
     * 取得使用者資料
     * @param authToken access token
     * @param refreshToken Refresh token
     * @return 驗證成功的使用者
     */
    public async getUserByToken(authToken: string, refreshToken: string): Promise<User> {

        // 檢查目前傳入之 authToken 是否已經遭到覆蓋
        // 遭到覆蓋表示已經重新登入
        if (! await this.userRepository.getBy({authToken})) {
            throw new AuthError('This token is invalid.');
        }

        const {SECRET_KEY} = process.env;
        let payload: JwtPayload = new JwtPayload(null, null);

        try {
            // 驗證 authToken
            payload = verify(authToken, SECRET_KEY) as JwtPayload;
        } catch (err) {

            // authToken 已經失效或驗證失敗, 嘗試驗證 refreshToken
            try {
                verify(refreshToken, SECRET_KEY);

                // 驗證通過後取得使用者資訊, 並刷新 tokens
                let user = await this.userRepository.getBy({refreshToken});
                let updated = await this.userRepository.update(
                    AuthServiceImpl.injectNewToken(user, true)
                );

                // 更新 payload 資訊
                Object.assign(payload, updated);
            } catch (err) {
                throw new AuthError(err.message);
            }
        }

        return await this.userRepository.getBy({
            email: payload.email,
            username: payload.username
        });
    }

    /**
     * 登入驗證
     * @param email 使用者信箱
     * @param password 使用者密碼
     * @param isRememberMe 是否記住我
     * @return 驗證成功之使用者資料
     */
    public async verify(email: string, password: string, isRememberMe: boolean = false): Promise<User> {

        // todo if "remember me", make jwt token expiration longer.

        let user = await this.userRepository.getBy({email});

        if (user.password !== password) {
            throw new AuthError('Wrong email or password!');
        }

        // 成功寫入新的 access token 並回傳
        return this.userRepository.update(AuthServiceImpl.injectNewToken(user, isRememberMe));
    }
}
