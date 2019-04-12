import {ObjectID} from "typeorm";
import {CardListAndCardsDto} from "..";

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

    /**
     * Get specified board's card lists and card lists' cards.
     * @param boardId The specified board id
     */
    getCardListsAndCards(boardId: ObjectID): Promise<Array<CardListAndCardsDto>>;

    /**
     * Card drag and drop
     * @param source The cardList info from source.
     * @param destination The cardList info from destination.
     */
    updateCardPosition(
        source: {_id: ObjectID, cards: Array<ObjectID>},
        destination: {_id: ObjectID, cards: Array<ObjectID>}): Promise<boolean>;
}
