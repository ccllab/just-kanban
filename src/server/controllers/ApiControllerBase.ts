import {BaseHttpController} from "inversify-express-utils";

export default abstract class ApiControllerBase extends BaseHttpController {

    /**
     * constructor
     */
    protected constructor() {
        super();
    }

    /**
     * Check if is authenticated.
     * @return Promise<boolean>
     */
    protected isAuthenticated(): Promise<boolean> {
        return this.httpContext.user.isAuthenticated();
    }
}
