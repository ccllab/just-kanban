import * as winston from 'winston';
import {ILogger} from './abstraction/ILogger';
import {injectable} from 'inversify';

/**
 * ILogger implement by winston.logger
 */
@injectable()
export class WinstonLogger implements ILogger {

    /**
     * Logger instance
     */
    private loggerInstance: winston.Logger;

    /**
     * 建構子
     */
    public constructor() {

        // short date format yyyy-mm-dd
        const dateNow: string = new Date().toJSON().slice(0, 10);

        // display format for log
        const loggerFormat = winston.format.printf(info => {

            let time = new Date().toTimeString();

            return `[${time}] [${info.level}]: ${info.message}`;
        });

        // transports for log
        const loggerTransports = [

            // Write all logs error (and below) to `error.log`.
            new winston.transports.File({
                filename: `${process.cwd()}/logs/error-${dateNow}.log`,
                level: 'error',
            }),

            // Write to all logs with level `debug` and below to `all.log`.
            new winston.transports.File({
                filename: `${process.cwd()}/logs/all-${dateNow}.log`
            }),

            // console log
            new winston.transports.Console()
        ];

        // create a logger instance
        this.loggerInstance = winston.createLogger({
            level: 'debug',
            format: loggerFormat,
            transports: loggerTransports
        });
    }

    /**
     * Log debug
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    public debug(message?: any, ...optionalParams: any[]): void {

        this.loggerInstance.debug(message, optionalParams);
    }

    /**
     * Log error
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    public error(message?: any, ...optionalParams: any[]): void {

        this.loggerInstance.error(message, optionalParams);
    }

    /**
     * Log info
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    public info(message?: any, ...optionalParams: any[]): void {

        this.loggerInstance.info(message, optionalParams);
    }

    /**
     * Log trace
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    public trace(message?: any, ...optionalParams: any[]): void {

        this.loggerInstance.verbose(message, optionalParams);
    }

    /**
     * Log warn
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    public warn(message?: any, ...optionalParams: any[]): void {

        this.loggerInstance.warn(message, optionalParams);
    }

    /**
     * Default logging
     * @param message 訊息
     * @param optionalParams 傳遞參數
     */
    public log(message?: any, ...optionalParams: any[]): void {

        this.loggerInstance.info(message, optionalParams);
    }
}