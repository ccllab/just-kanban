/**
 * Logger 介面
 */
export interface ILogger {

    /**
     * Log debug
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    debug(message?: any, ...optionalParams: any[]): void;

    /**
     * Log error
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    error(message?: any, ...optionalParams: any[]): void;

    /**
     * Log info
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    info(message?: any, ...optionalParams: any[]): void;

    /**
     * Log trace
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    trace(message?: any, ...optionalParams: any[]): void;

    /**
     * Log warn
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    warn(message?: any, ...optionalParams: any[]): void;

    /**
     * Default log
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    log(message?: any, ...optionalParams: any[]): void;
}