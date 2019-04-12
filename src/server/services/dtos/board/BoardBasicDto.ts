import {ObjectID} from "typeorm";

/**
 * Board information for specified user
 */
export class BoardBasicDto {

    /**
     * board id
     */
    public _id: ObjectID;

    /**
     * board name
     */
    public boardName: string;

    /**
     * is specified user is admin
     */
    public isAdmin: boolean = false;
}
