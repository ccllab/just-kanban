import {ObjectID} from "typeorm";

/**
 * CardList and its cards
 */
export class CardListAndCardsDto {

    /**
     * CardList Id
     */
    public _id: ObjectID;

    /**
     * CardList name
     */
    public name: string;

    /**
     * Cards
     */
    public cards: Array<{
        _id: ObjectID,
        title: string,
        assignedUser: {
            userId: string,
            username: string
        }
    }> = [];
}
