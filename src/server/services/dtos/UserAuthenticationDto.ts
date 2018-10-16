import {User} from "../../repository";

/**
 * The data transfer object for user authentication
 */
export class UserAuthenticationDto {

    /**
     * User detail information
     */
    public userDetail: User;

    /**
     * token for access api features
     */
    public accessToken: string;
}
