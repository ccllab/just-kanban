import {ILogger} from './abstraction/ILogger';
import {injectable} from 'inversify';

/**
 * ILogger implement by console
 */
@injectable()
export class ConsoleLogger implements ILogger {

    /**
     * Logger instance
     */
    private loggerInstance: Console;

    /**
     * 建構子
     */
    public constructor() {

        this.loggerInstance = console;
    }

    /**
     * Log debug
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    public debug(message?: any, ...optionalParams: any[]): void {

        optionalParams.length === 0 ?
            this.loggerInstance.debug(message) :
            this.loggerInstance.debug(message, optionalParams);
    }

    /**
     * Log error
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    public error(message?: any, ...optionalParams: any[]): void {

        optionalParams.length === 0 ?
            this.loggerInstance.error(message) :
            this.loggerInstance.error(message, optionalParams);
    }

    /**
     * Log info
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    public info(message?: any, ...optionalParams: any[]): void {

        optionalParams.length === 0 ?
            this.loggerInstance.info(message) :
            this.loggerInstance.info(message, optionalParams);
    }

    /**
     * Log trace
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    public trace(message?: any, ...optionalParams: any[]): void {

        optionalParams.length === 0 ?
            this.loggerInstance.trace(message) :
            this.loggerInstance.trace(message, optionalParams);
    }

    /**
     * Log warn
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    public warn(message?: any, ...optionalParams: any[]): void {

        optionalParams.length === 0 ?
            this.loggerInstance.warn(message) :
            this.loggerInstance.warn(message, optionalParams);
    }

    /**
     * Default logging
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    public log(message?: any, ...optionalParams: any[]): void {

        optionalParams.length === 0 ?
            this.loggerInstance.log(message) :
            this.loggerInstance.log(message, optionalParams);
    }
}