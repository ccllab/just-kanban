import {ObjectID} from "typeorm";

/**
 * Card information dto
 */
export class CardInfoDto {

    /**
     * Card id
     */
    public _id: ObjectID;

    /**
     * Card title
     */
    public title: string;

    /**
     * Card description
     */
    public description: string;

    /**
     * Assigned user info
     */
    public assignedUser: {
        userId: string,
        username: string
    };

    /**
     * Card's comments
     */
    public comments: Array<{
        _id: ObjectID,
        content: string
    }> = [];
}
