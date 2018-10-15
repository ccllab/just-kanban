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
     * @param isLongExpiration 是否延長 authToken 有效期
     * @return 取得新 token 的使用者資料
     */
    private static injectNewToken(user: User, isLongExpiration: boolean): User {

        const secretKey: string = process.env.SECRET_KEY;

        user.authToken = sign(
            {
                username: user.username,
                email: user.email
            },
            secretKey,
            {
                expiresIn: isLongExpiration ? 604800 : 86400
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

        return this.userRepository.add(AuthServiceImpl.injectNewToken(user, false));
    }

    /**
     * 取得使用者資料
     * @param accessToken access token
     * @return 驗證成功的使用者
     */
    public async getUserByToken(accessToken: string): Promise<User> {

        // 檢查 token 是否已經過期
        if (! await this.userRepository.getBy({authToken: accessToken})) {
            throw new AuthError('This token is expired.');
        }

        const secretKey: string = process.env.SECRET_KEY;

        let payload: JwtPayload = verify(
            accessToken,
            secretKey) as JwtPayload;

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
