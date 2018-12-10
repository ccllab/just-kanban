import {ObjectID} from "typeorm";
import {CardInfoDto} from "..";

/**
 * Kanban board card management service
 */
export interface ICardService {

    /**
     * Get specified card info
     * @param cardId The specified card id.
     */
    getCardInfo(cardId: ObjectID): Promise<CardInfoDto>;

    /**
     * add new card
     * @param dto
     */
    addNewCard(
        dto: {listId: ObjectID, title: string, description: string, assignedUserId: string}): Promise<{
        _id: ObjectID,
        title: string,
        assignedUser: {
            userId: string,
            username: string
        }
    }>;

    /**
     * update specified card information
     * @param dto
     * @param cardId
     */
    updateCard(
        dto: {listId: ObjectID, title: string, description: string, assignedUserId: string},
        cardId: ObjectID): Promise<{
        _id: ObjectID,
        title: string,
        description: string,
        assignedUser: {
            userId: string,
            username: string
        }
    }>;
}
