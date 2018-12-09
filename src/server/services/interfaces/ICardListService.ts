import {ObjectID} from "typeorm";

/**
 * Card list management service interface
 */
export interface ICardListService {

    /**
     * Add new card list
     * @param cardListName
     * @param boardId
     */
    addCardList(cardListName: string, boardId: ObjectID): Promise<{_id: ObjectID, name: string}>;

    /**
     * Update specified card list name
     * @param newName
     * @param cardListId
     */
    updateCardListName(newName: string, cardListId: ObjectID): Promise<{_id: ObjectID, name: string}>;
}
