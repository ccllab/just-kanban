import * as express from 'express';
import ApiControllerBase from "./ApiControllerBase";
import {controller, httpPost, request, response} from 'inversify-express-utils';
import {IAuthService} from "../services";
import {inject} from 'inversify';
import {methodAdvice} from '../utils';
import {TYPES} from '../ioc';
import {User} from '../repository';

/**
 * User information and auth controller
 */
@controller('/api/user')
export class UserController extends ApiControllerBase {

    /**
     * Constructor
     * @param authService The service for authentication
     */
    public constructor(
        @inject(TYPES.IAuthService) private authService: IAuthService) {

        super();
    }

    /**
     * Add new user
     * @param res Http Response
     * @param req Http Request
     * @return Promise<Response>
     */
    @httpPost('/')
    @methodAdvice()
    private addUser(
        @response() res: express.Response,
        @request() req: express.Request): Promise<express.Response> {
        let {userId, username, email, password} = req.body;
        let user: User = new User();
        user.userId = userId;
        user.username = username;
        user.email = email;
        user.password = password;

        return this.authService.addNewUser(user).then((userAuthDto) => {
            return res.set({
                'x-auth': userAuthDto.accessToken,
                'x-refresh': userAuthDto.userDetail.refreshToken
            }).send({
                id: userAuthDto.userDetail.userId,
                name: userAuthDto.userDetail.username,
                email: userAuthDto.userDetail.email
            });
        }, (err) => {
            return res.status(400).send(err.message);
        });
    }

    /**
     * User login
     * @param res http response
     * @param req http request
     * @return Promise<response>
     */
    @httpPost('/login')
    @methodAdvice()
    private login(
        @response() res: express.Response,
        @request() req: express.Request): Promise<express.Response> {
        let {email, password, isRememberMe} = req.body;

        return this.authService.verify(
            email,
            password,
            isRememberMe
        ).then((userAuthDto) => {
            return res.set({
                'x-auth': userAuthDto.accessToken,
                'x-refresh': userAuthDto.userDetail.refreshToken
            }).send({
                id: userAuthDto.userDetail.userId,
                name: userAuthDto.userDetail.username,
                email: userAuthDto.userDetail.email
            });
        }, (err) => {
            return res.status(400).send(err.message);
        });
    }

    /**
     * Get user information
     * @param res http response
     * @param req http request
     * @return Promise<Response>
     */
    @httpPost('/me')
    @methodAdvice()
    private async getMe(
        @response() res: express.Response,
        @request() req: express.Request): Promise<express.Response> {

        // console.log(await this.httpContext.user.isAuthenticated());

        if (! await this.isAuthenticated()) {
            return res.status(401).send('Please login, and try again.');
        }

        return res.send(this.httpContext.user.details);
    }
}
