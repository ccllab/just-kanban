import * as express from 'express';
import {TYPES} from '../ioc';
import {
    controller,
    httpPost,
    BaseHttpController,
    request,
    response
} from 'inversify-express-utils';
import {User} from '../repository';
import {inject} from 'inversify';
import {methodAdvice} from '../utils';
import {IAuthService} from "../services";

/**
 * 使用者控制器
 */
@controller('/api/user')
export class UserController extends BaseHttpController {

    /**
     * 建構子
     * @param authService 登入驗證服務
     */
    public constructor(
        @inject(TYPES.IAuthService) private authService: IAuthService) {

        super();
    }

    /**
     * 新增使用者
     * @param res response
     * @param req request
     * @return Promise
     */
    @httpPost('/')
    @methodAdvice()
    private addUser(
        @response() res: express.Response,
        @request() req: express.Request): Promise<express.Response> {

        let user: User = new User();

        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;

        return this.authService.addNewUser(user).then((newUser) => {
            return res.header('x-auth', newUser.authToken).send({
                id: newUser.id,
                name: newUser.username,
                email: newUser.email
            });
        }, (err) => {
            return res.status(400).send(err.message);
        });
    }

    /**
     * 登入驗證
     * @param res response
     * @param req request
     * @return Promise
     */
    @httpPost('/login')
    @methodAdvice()
    private login(
        @response() res: express.Response,
        @request() req: express.Request): Promise<express.Response> {

        return this.authService.verify(req.body.email, req.body.password).then((user) => {
            return res.header('x-auth', user.authToken).send({
                id: user.id,
                name: user.username,
                email: user.email
            });
        }, (err) => {
            return res.status(400).send(err.message);
        });
    }

    /**
     * 使用 user access token 取得基本資料
     * @param res response
     * @param req request
     * @return Promise
     */
    @httpPost('/me')
    @methodAdvice()
    private getMe(
        @response() res: express.Response,
        @request() req: express.Request): Promise<express.Response> {

        let accessToken: string = req.header('x-auth');

        return this.authService.getUserByToken(accessToken).then((user) => {
            return res.send({
                id: user.id,
                name: user.username,
                email: user.email
            });
        }, (err) => {
            return res.status(400).send(err.message);
        });
    }
}