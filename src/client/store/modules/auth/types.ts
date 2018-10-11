/**
 * 驗證狀態模型
 */
export interface IAuthState {

    /**
     * oauth2 的 access token
     */
    token: string | null;
}