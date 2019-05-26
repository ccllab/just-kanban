import {ObjectID} from "typeorm";

/**
 * Card comment service interface
 */
export interface ICardCommentService {

    /**
     * Add new comment to specified card
     * @param cardId The specified card id
     * @param content The content of comment.
     */
    addComment(cardId: ObjectID, content: string): Promise<{_id: ObjectID, content: string}>;
}
