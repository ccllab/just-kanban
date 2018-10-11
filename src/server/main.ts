import 'reflect-metadata';
import Startup from './Startup';
import {HttpShutdownManager, ILogger} from './utils';
import {DependencyResolverImpl, InversifyContainerFactory, TYPES} from './ioc';
import {Container} from 'inversify';
import * as dotenv from 'dotenv';

/**
 * 主程式
 */
const Main = () => {

    // .env config
    dotenv.config();

    // 建立 app 容器
    const appContainer: Container = InversifyContainerFactory.getInstance().container;

    // 建立 Startup class
    const server: Startup = Startup.bootstrap(appContainer);

    let logger = DependencyResolverImpl.current().Resolve<ILogger>(TYPES.ILogger);

    /**
     * callback function for process shutdown event
     */
    const shutdownCallback = () => {
        const shutdownManager = new HttpShutdownManager(server.serverInstance);

        shutdownManager.terminate(() => {
            logger.info('伺服器已終止');
        });

        // exit node process with code 0
        process.exit(0);
    };

    // catch ctrl+c(interrupt) event
    process.on('SIGINT', shutdownCallback);

    // when app is closing
    process.on('exit', shutdownCallback);
};

// check this module was run directly from the command line as in node main.js
if (require.main === module) {

    // invoke
    Main();
}