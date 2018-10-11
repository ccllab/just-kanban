import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import * as socketIO from 'socket.io';
import {Container} from 'inversify';
import {createConnections} from 'typeorm';
import {DependencyResolverImpl, TYPES} from './ioc';
import {ILogger} from './utils';
import {InversifyExpressServer} from 'inversify-express-utils';
import './controllers'; // declare metadata by @controller annotation

/**
 * Node.js 伺服器啟動類別
 * @singleton
 */
export default class Startup {

    /**
     * Startup 的單例
     */
    private static startupInstance: Startup;

    /**
     * 環境 port 號
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
     * 建構子，初始化資料庫連線與 express app
     * @param container DI 容器
     */
    private constructor(private container: Container) {

        // 設定 DI 解析器
        DependencyResolverImpl.current().SetContainer(this.container);
        this.logger = DependencyResolverImpl.current().Resolve<ILogger>(TYPES.ILogger);

        // 建立資料庫連線，成功後設定 express app
        createConnections().then(async conns => {

            conns.forEach(c => this.logger.info(`已連線資料庫:${c.name};`));
            this.configExpress();
        }).catch(error => {

            // 記錄錯誤
            this.logger.error(error);
            throw error;
        });
    }

    /**
     * 啟動 Node.js 伺服器
     * @param container DI 容器
     * @returns Startup Startup的單一實例
     */
    public static bootstrap(container: Container): Startup {

        return this.startupInstance || (this.startupInstance = new this(container));
    }

    /**
     * 設定 express 與 DependencyResolver
     */
    private configExpress(): void {

        const expressServer: InversifyExpressServer = new InversifyExpressServer(this.container);
        const staticFolderPath = path.join(__dirname, '..', '..', '..', 'public');

        // 設定 express application
        expressServer.setConfig(app => {

            // support parsing of application/json type post data
            app.use(bodyParser.json());

            // 設定靜態資料路徑
            app.use(express.static(staticFolderPath));

            // 所有的 get 都導向至 index.html，由 vue-router 處理路由
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

        // 建立 http Server
        this.serverInstance = http.createServer(expressServer.build());

        // 建立 socket.io
        this.socketInstance = socketIO(this.serverInstance);
        this.socketInstance.on('connection', (socket) => {

            this.logger.log('New user connected.');

            socket.on('disconnect', () => {
                this.logger.log('User was disconnect.');
            });
        });

        // 啟動
        this.serverInstance.listen(this.port, () => {

            this.logger.log(`Listening on port:${this.port}.`);
        });
    }
}