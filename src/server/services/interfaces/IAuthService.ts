import {User} from "../../repository";

/**
 * 登入驗證服務介面
 */
export interface IAuthService {

    /**
     * 新增使用者
     * @param user 新增的使用者
     */
    addNewUser(user: User): Promise<User>;

    /**
     * 取得使用者資料
     * @param token access token
     * @return 驗證成功的使用者
     */
    getUserByToken(token: string): Promise<User>;

    /**
     * 登入驗證
     * @param email 使用者信箱
     * @param password 使用者密碼
     * @param isRememberMe 是否記住我
     * @return 驗證成功之使用者資料
     */
    verify(email: string, password: string, isRememberMe: boolean): Promise<User>;
}
