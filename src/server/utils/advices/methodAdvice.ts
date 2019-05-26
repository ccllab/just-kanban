import {afterMethod} from 'kaop-ts';
import {DependencyResolverImpl, TYPES} from '../../ioc';
import {ILogger} from '..';

/**
 * Log method I/O
 * @returns Advice for log method I/O
 */
export const methodAdvice = () => afterMethod(meta => {

    let logger = DependencyResolverImpl.current().Resolve<ILogger>(TYPES.ILogger);
    let methodName = `${meta.target.constructor.name}::${meta.key}`;

    logger.info(`log-decorator: ${methodName} invoked!`);
    // logger.info(`log-decorator: ${methodName} arguments -> `, meta.args);
    // logger.info(`log-decorator: ${methodName} result -> `, meta.result);
    logger.info(`log-decorator: ${methodName} out.`);
});
