import {Container} from 'inversify';
import {ConsoleLogger, ExecutionContext, IExecutionContext, ILogger, WinstonLogger} from './index';
import {TYPES} from '../ioc';

/**
 * Register util layer components
 * @param container DI container
 */
const registerUtil = (container: Container) => {
    let isProduction: boolean = process.env.NODE_ENV === 'production';

    isProduction ?
        container.bind<ILogger>(TYPES.ILogger).to(WinstonLogger) :
        container.bind<ILogger>(TYPES.ILogger).to(ConsoleLogger);

    container.bind<IExecutionContext>(TYPES.IExecutionContext).to(ExecutionContext);
};

export default registerUtil;
