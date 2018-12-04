import * as express from 'express';
import ApiControllerBase from "./ApiControllerBase";
import {controller, httpPost, request, response} from 'inversify-express-utils';
import {IAuthService} from "../services";
import {inject} from 'inversify';
import {methodAdvice} from '../utils';
import {TYPES} from '../ioc';
import {IUserRepository, User} from '../repository';

/**
 * User information and auth controller
 */
@controller('/api/user')
export class UserController extends ApiControllerBase {

    /**
     * Constructor
     * @param authService The service for authentication
     * @param userRepository User Repository
     */
    public constructor(
        @inject(TYPES.IAuthService) private authService: IAuthService,
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository) {

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
        let {userId, username, email, password, confirm} = req.body;

        if (confirm !== password) {
            return Promise.resolve(res.status(400).send({
                error: "Password and confirm not match."
            }));
        }

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
            return res.status(400).send({
                error: err.message
            });
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
            return res.status(400).send({
                error: err.message
            });
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

        let {userId, username, email} = this.httpContext.user.details;

        return res.send({
            userId: userId,
            username: username,
            email: email
        });
    }

    /**
     * search user by email
     * @param res http response
     * @param req http request
     * @return Promise<Response>
     */
    @httpPost('/search')
    private async search(
        @response() res: express.Response,
        @request() req: express.Request): Promise<express.Response> {

        if (! await this.isAuthenticated()) {
            return res.status(401).send('Please login, and try again.');
        }

        let {email} = req.body;

        return this.userRepository.getBy({email}).then((user) => {
            return res.send({
                userId: user.userId,
                username: user.username,
                email: user.email
            });
        }, (err) => {
            return res.status(400).send({
                error: err.message
            });
        });
    }
}
