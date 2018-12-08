import {interfaces} from "inversify-express-utils";
import {User} from "../../repository";

/**
 * User principal
 */
export class Principal implements interfaces.Principal {

    public details: User;

    /**
     * constructor
     * @param details The user details
     */
    public constructor(details: User) {
        this.details = details;
    }

    /**
     * Check is authenticated.
     * @return true/false
     */
    public isAuthenticated(): Promise<boolean> {

        // if details equals undefined, return false
        return this.details ? Promise.resolve(true) : Promise.resolve(false);
    }

    /**
     * Check is resource owner, not implement
     * @param resourceId The id of resource.
     * @return true/false
     */
    public isResourceOwner(resourceId: number | string): Promise<boolean> {
        return undefined;
    }

    /**
     * Check the user role
     * @param role The role of user
     * @return true or false
     */
    public isInRole(role: string): Promise<boolean> {
        return Promise.resolve(role === "admin");
    }
}
