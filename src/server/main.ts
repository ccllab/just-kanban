import 'reflect-metadata'; // import reflect-metadata in program entry.
import * as dotenv from 'dotenv';
import Startup from './Startup';
import {Container} from 'inversify';
import {DependencyResolverImpl, InversifyContainerFactory, TYPES} from './ioc';
import {HttpShutdownManager, ILogger} from './utils';

/**
 * The main function.
 */
const Main = () => {

    // .env config
    dotenv.config();

    // build application dependency injection container.
    const appContainer: Container = InversifyContainerFactory.getInstance().container;

    // build Startup class
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

// program entry.
// check this module was run directly from the command line as in node main.js
if (require.main === module) {

    // invoke main function
    Main();
}
