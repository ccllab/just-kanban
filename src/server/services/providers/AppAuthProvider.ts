import * as express from 'express';
import AuthError from "../exceptions/AuthError";
import {IAuthService} from "..";
import {ILogger} from "../../utils";
import {inject, injectable} from "inversify";
import {interfaces} from 'inversify-express-utils';
import {Principal} from "./Principal";
import {TYPES} from "../../ioc";

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
     * Logger
     */
    @inject(TYPES.ILogger) private readonly logger: ILogger;

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
        const refreshToken: string = req.header('x-refresh');

        return this.authService.getUserAuthByToken(authToken, refreshToken).then((userAuthDto) => {

            // set header after get User entity.
            res.set({
                'x-auth': userAuthDto.accessToken,
                'x-refresh': userAuthDto.userDetail.refreshToken
            });

            return new Principal(userAuthDto.userDetail);
        }).catch((err) => {

            // only log unexpected error
            if (!(err instanceof AuthError)) {
                this.logger.error(err);
            }

            return new Principal(undefined);
        });
    }
}
