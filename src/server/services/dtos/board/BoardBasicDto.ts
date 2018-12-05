/**
 * Board information for specified user
 */
export class BoardBasicDto {

    /**
     * board id
     */
    public _id: string;

    /**
     * board name
     */
    public boardName: string;

    /**
     * is specified user is admin
     */
    public isAdmin: boolean = false;
}
