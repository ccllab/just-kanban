import * as express from 'express';
import {interfaces} from 'inversify-express-utils';
import {inject, injectable} from "inversify";
import {TYPES} from "../../ioc";
import {IAuthService} from "..";
import {Principal} from "./Principal";

/**
 * HttpContext Auth Provider
 * Verify user status by token in every http request.
 */
@injectable()
export class AppAuthProvider implements interfaces.AuthProvider {

    /**
     * AuthService
     */
    @inject(TYPES.IAuthService) private readonly authService: IAuthService;

    /**
     * Get user principal by authToken, and refreshToken.
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
        const refreshToken: string = req.header('x-auth-refresh');

        return this.authService.getUserAuthByToken(authToken, refreshToken).then((userAuthDto) => {

            // set header after get User entity.
            res.set({
                'x-auth': userAuthDto.accessToken,
                'x-auth-refresh': userAuthDto.userDetail.refreshToken
            });

            return new Principal(userAuthDto.userDetail);
        }).catch((err) => {

            // todo For now return an undefined user for principal, if undefined, then isAuthenticated is false.
            // todo This will hide error message.
            return new Principal(undefined);
        });
    }
}
