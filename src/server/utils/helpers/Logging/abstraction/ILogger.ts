/**
 * Logger interface
 */
export interface ILogger {

    /**
     * Log debug
     * @param message
     * @param optionalParams
     */
    debug(message?: any, ...optionalParams: any[]): void;

    /**
     * Log error
     * @param message
     * @param optionalParams
     */
    error(message?: any, ...optionalParams: any[]): void;

    /**
     * Log info
     * @param message
     * @param optionalParams
     */
    info(message?: any, ...optionalParams: any[]): void;

    /**
     * Log trace
     * @param message
     * @param optionalParams
     */
    trace(message?: any, ...optionalParams: any[]): void;

    /**
     * Log warn
     * @param message
     * @param optionalParams
     */
    warn(message?: any, ...optionalParams: any[]): void;

    /**
     * Default log
     * @param message
     * @param optionalParams
     */
    log(message?: any, ...optionalParams: any[]): void;
}
