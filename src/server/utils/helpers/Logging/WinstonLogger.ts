import * as winston from 'winston';
import {IExecutionContext} from "../..";
import {ILogger} from './abstraction/ILogger';
import {inject, injectable} from 'inversify';
import {TYPES} from "../../../ioc";

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
     * constructor
     *
     * Set up winston.logger
     * @param executionContext IExecutionContext
     */
    public constructor(@inject(TYPES.IExecutionContext) executionContext: IExecutionContext) {

        // short date format yyyy-mm-dd
        const dateNow: string = executionContext.dateNow.toJSON().slice(0, 10);

        // display format for log
        const loggerFormat = winston.format.printf(info => {

            let time = executionContext.dateNow.toTimeString();

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
     * @param message The message for log
     * @param optionalParams The optional parameters
     */
    public debug(message?: any, ...optionalParams: any[]): void {

        this.loggerInstance.debug(message, optionalParams);
    }

    /**
     * Log error
     * @param message The message for log
     * @param optionalParams The optional parameters
     */
    public error(message?: any, ...optionalParams: any[]): void {

        this.loggerInstance.error(message, optionalParams);
    }

    /**
     * Log info
     * @param message The message for log
     * @param optionalParams The optional parameters
     */
    public info(message?: any, ...optionalParams: any[]): void {

        this.loggerInstance.info(message, optionalParams);
    }

    /**
     * Log trace
     * @param message The message for log
     * @param optionalParams The optional parameters
     */
    public trace(message?: any, ...optionalParams: any[]): void {

        this.loggerInstance.verbose(message, optionalParams);
    }

    /**
     * Log warn
     * @param message The message for log
     * @param optionalParams The optional parameters
     */
    public warn(message?: any, ...optionalParams: any[]): void {

        this.loggerInstance.warn(message, optionalParams);
    }

    /**
     * Default logging
     * @param message The message for log
     * @param optionalParams The optional parameters
     */
    public log(message?: any, ...optionalParams: any[]): void {

        this.loggerInstance.info(message, optionalParams);
    }
}
