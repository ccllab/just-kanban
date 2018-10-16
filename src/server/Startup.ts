import './controllers'; // declare metadata by @controller annotation
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import * as socketIO from 'socket.io';
import {AppAuthProvider} from "./services/providers/AppAuthProvider";
import {Container} from 'inversify';
import {createConnections} from 'typeorm';
import {DependencyResolverImpl, TYPES} from './ioc';
import {ILogger} from './utils';
import {InversifyExpressServer} from 'inversify-express-utils';

/**
 * Node.js express server Startup class.
 * @singleton
 */
export default class Startup {

    /**
     * The single instance for Startup
     */
    private static startupInstance: Startup;

    /**
     * The server listening port
     */
    private port: number = parseInt(process.env.PORT) || 8080;

    /**
     * Logger
     */
    private logger: ILogger;

    /**
     * http server instance
     */
    public serverInstance: http.Server;

    /**
     * socket.io server instance
     */
    public socketInstance: socketIO.Server;

    /**
     * constructor
     *
     * Set up DI container for DependencyResolver,
     * then create database connection, if success,
     * then set up express server.
     * @param container DI container
     */
    private constructor(private container: Container) {
        DependencyResolverImpl.current().SetContainer(this.container);
        this.logger = DependencyResolverImpl.current().Resolve<ILogger>(TYPES.ILogger);

        createConnections().then(async conns => {
            conns.forEach(c => this.logger.info(`Database connected: ${c.name};`));
            this.configExpress();
        }).catch(error => {

            // log error.
            this.logger.error(error);
            throw error;
        });
    }

    /**
     * Create and bootstrap the Startup
     * @param container DI container
     * @returns Startup The single instance for Startup
     */
    public static bootstrap(container: Container): Startup {

        return this.startupInstance || (this.startupInstance = new this(container));
    }

    /**
     * Set up all express server feature
     */
    private configExpress(): void {

        const expressServer: InversifyExpressServer =
            new InversifyExpressServer(
                this.container,
                null,
                null,
                null,
                AppAuthProvider
            );
        const staticFolderPath = path.join(__dirname, '..', '..', '..', 'public');

        // set additional config for express application
        expressServer.setConfig(app => {

            // support parsing of application/json type post data
            app.use(bodyParser.json());

            // set up static path
            app.use(express.static(staticFolderPath));

            // all http get will redirect to index.html, that vue-router handle route.
            app.get('*', (req: express.Request, res: express.Response) => {
                let viewPath = path.join(staticFolderPath, 'views', 'index.html');

                fs.readFile(
                    viewPath,
                    {encoding: 'utf-8'},
                    (err, data) => {
                        if (err) {
                            throw err;
                        }

                        return res.send(data);
                    });
            });
        });

        // build express server
        this.serverInstance = http.createServer(expressServer.build());

        // build socket io.
        this.socketInstance = socketIO(this.serverInstance);
        this.socketInstance.on('connection', (socket) => {

            this.logger.log('New user connected.');

            socket.on('disconnect', () => {
                this.logger.log('User was disconnect.');
            });
        });

        // boot express server
        this.serverInstance.listen(this.port, () => {

            this.logger.log(`Listening on port:${this.port}.`);
        });
    }
}
