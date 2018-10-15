import {IAuthService} from "./interfaces/IAuthService";
import {IUserRepository, JwtPayload, User} from "../repository";
import {inject, injectable} from "inversify";
import {verify} from "jsonwebtoken";
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
     * 註冊使用者
     * @param user 新增的使用者
     */
    public async addNewUser(user: User): Promise<User> {

        // 檢查信箱是否已經使用
        if (await this.userRepository.getBy({email: user.email})) {

            throw new AuthError("This email has been used!");
        }

        return this.userRepository.add(user);
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
     * @return 驗證成功之使用者資料
     */
    public async verify(email: string, password: string): Promise<User> {

        let user = await this.userRepository.getBy({email});

        if (user.password !== password) {
            throw new AuthError('Wrong email or password!');
        }

        // 成功寫入新的 access token 並回傳
        return this.userRepository.update(user);
    }
}
