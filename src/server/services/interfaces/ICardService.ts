import {ObjectID} from "typeorm";
import {CardInfoDto} from "..";
import {BoardCardEntity} from "../../repository";

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

    /**
     * delete specified card
     * @param cardId The specified card id.
     * @param cardListId The card list id that card storage.
     * @return The card deleted.
     */
    deleteCard(cardId: ObjectID, cardListId: ObjectID): Promise<BoardCardEntity>;
}
