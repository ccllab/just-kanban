/**
 * 驗證服務例外錯誤
 */
export default class AuthError extends Error {

    /**
     * 建構函數
     * @param message 錯誤訊息
     */
    public constructor(message: string) {

        super(message);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, AuthError.prototype);
    }
}