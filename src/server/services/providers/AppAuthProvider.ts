import * as express from 'express';
import {interfaces} from 'inversify-express-utils';
import {inject, injectable} from "inversify";
import {TYPES} from "../../ioc";
import {IAuthService} from "..";
import {Principal} from "./Principal";

const authService = inject(TYPES.IAuthService);

/**
 * HttpContext Auth Provider
 */
@injectable()
export class AppAuthProvider implements interfaces.AuthProvider {

    /**
     * AuthService
     */
    @authService private readonly authService: IAuthService;

    /**
     * get User principal
     * @param req request
     * @param res response
     * @param next next function
     * @return Promise<Principal>
     */
    public getUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction): Promise<interfaces.Principal> {

        const authToken: string = req.header('x-auth');
        let refreshToken: string = req.header('x-auth-refresh');

        return this.authService.getUserByToken(authToken, refreshToken).then((user) => {

            // 取得 principal 後重設 header.
            res.set({
                'x-auth': user.authToken,
                'x-auth-refresh': user.refreshToken
            });

            return new Principal(user);
        }).catch((err) => {

            // todo For now return an undefined user for principal, if undefined, then isAuthenticated is false.
            // todo 錯誤訊息會被吃掉
            return new Principal(undefined);
        });
    }
}
