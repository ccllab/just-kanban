import {ICardListService} from "./interfaces/ICardListService";
import {ObjectID} from "typeorm";
import {inject, injectable} from "inversify";
import {TYPES} from "../ioc";
import {
    CardListEntity,
    IBoardCardRepository,
    ICardListRepository,
    IKanbanBoardRepository,
    IUserRepository
} from "../repository";
import {uniq} from 'lodash';
import {CardListAndCardsDto} from "./dtos/cardList/CardListAndCardsDto";

/**
 * Card list management service impl
 */
@injectable()
export class CardListServiceImpl implements ICardListService {

    /**
     * Constructor
     * @param cardListRepository Card list repo
     * @param boardRepository Board repo
     * @param cardRepository Board card repo
     * @param userRepository User repo
     */
    public constructor(
        @inject(TYPES.ICardListRepository) private cardListRepository: ICardListRepository,
        @inject(TYPES.IKanbanBoardRepository) private boardRepository: IKanbanBoardRepository,
        @inject(TYPES.IBoardCardRepository) private cardRepository: IBoardCardRepository,
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository) {
    }

    /**
     * Add new card list
     * @param cardListName The name of new card list
     * @param boardId The board id that contain this card list
     * @return Promise
     */
    public addCardList(cardListName: string, boardId: ObjectID): Promise<{_id: ObjectID, name: string}> {

        let cardList = new CardListEntity();
        cardList.name = cardListName;

        return this.cardListRepository.add(cardList).then((cardList) => {

            this.boardRepository.get(boardId).then((board) => {
                if (!board) {
                    return Promise.reject(new Error(`The board ${boardId.toString()} is not exist`));
                }

                board.cardListIds.push(cardList._id);
                board.cardListIds = uniq(board.cardListIds);

                this.boardRepository.update(board).catch(err => {
                    throw err;
                });

            }, err => {
                throw err;
            });

            return Promise.resolve({
                _id: cardList._id,
                name: cardList.name
            });
        }, err => {
            throw err;
        });
    }

    /**
     * Update specified card list name
     * @param newName The new card list name
     * @param cardListId The id of specified card list
     * @return Promise
     */
    public updateCardListName(newName: string, cardListId: ObjectID): Promise<{_id: ObjectID, name: string}> {

        return this.cardListRepository.get(cardListId).then((cardList) => {
            if (!cardList) {
                return Promise.reject(new Error(`The card-list ${cardListId.toString()} is not exist`));
            }

            cardList.name = newName;

            return this.cardListRepository.update(cardList).then((updated) => {
                return Promise.resolve({
                    _id: updated._id,
                    name: updated.name
                });
            }, err => {
                throw err;
            });
        }, err => {
            throw err;
        });
    }

    /**
     * Get specified board's card lists and card lists' cards.
     * @param boardId The specified board id
     */
    public async getCardListsAndCards(boardId: ObjectID): Promise<Array<CardListAndCardsDto>> {
        let board = await this.boardRepository.get(boardId);
        if (!board) {
            return Promise.reject(new Error(`The board ${boardId.toString()} is not exist.`));
        }

        let results: Array<CardListAndCardsDto> = [];
        for (let cardListId of board.cardListIds) {
            let cardList = await this.cardListRepository.get(cardListId);
            if (!cardList) {
                return Promise.reject(new Error(`The card-list ${cardListId.toString()} is not exist.`));
            }

            let dto = new CardListAndCardsDto();
            dto._id = cardList._id;
            dto.name = cardList.name;

            for (let cardId of cardList.cardIds) {
                let card = await this.cardRepository.get(cardId);
                if (!card) {
                    return Promise.reject(new Error(`The card ${cardId.toString()} is not exist.`));
                }

                let isAssigned: boolean = card.assignedUserId && card.assignedUserId !== '';
                let assignedUser = await this.userRepository.getBy({userId: card.assignedUserId});
                if (isAssigned && !assignedUser) {
                    return Promise.reject(new Error(`The assigned-user ${card.assignedUserId} is not exist.`));
                }

                dto.cards.push({
                    _id: card._id,
                    title: card.title,
                    assignedUser: {
                        userId: isAssigned ? assignedUser.userId : '',
                        username: isAssigned ? assignedUser.username : ''
                    }
                });
            }

            results.push(dto);
        }

        return Promise.resolve(results);
    }

    /**
     * Card drag and drop
     * @param source The cardList info from source.
     * @param destination The cardList info from destination.
     */
    public async updateCardPosition(
        source: {_id: ObjectID, cards: Array<ObjectID>},
        destination: {_id: ObjectID, cards: Array<ObjectID>}): Promise<boolean> {

        let sourceCardList = await this.cardListRepository.get(source._id);
        let destinationCardList = await this.cardListRepository.get(destination._id);

        if (!sourceCardList) {
            throw new Error(`The source card-list ${source._id.toString()} is not exist.`);
        }

        if (!destinationCardList) {
            throw new Error(`The destination card-list ${destination._id.toString()} is not exist.`);
        }

        sourceCardList.cardIds = source.cards;
        destinationCardList.cardIds = destination.cards;

        return this.cardListRepository.update(sourceCardList).then(_ => {
            return this.cardListRepository.update(destinationCardList).then(_ => {
                return true;
            }, err => {
                throw err;
            });
        }, err => {
            throw err;
        });
    }
}
