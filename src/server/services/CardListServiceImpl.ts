import {ICardListService} from "./interfaces/ICardListService";
import {ObjectID} from "typeorm";
import {inject, injectable} from "inversify";
import {TYPES} from "../ioc";
import {CardListEntity, ICardListRepository, IKanbanBoardRepository} from "../repository";
import {union} from 'lodash';

/**
 * Card list management service impl
 */
@injectable()
export class CardListServiceImpl implements ICardListService {

    /**
     * Constructor
     * @param cardListRepository Card list repo
     * @param boardRepository Board repo
     */
    public constructor(
        @inject(TYPES.ICardListRepository) private cardListRepository: ICardListRepository,
        @inject(TYPES.IKanbanBoardRepository) private boardRepository: IKanbanBoardRepository) {
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
                board.cardListIds.push(cardList._id);
                board.cardListIds = union(board.cardListIds);

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
}
