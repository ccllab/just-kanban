import {ICardService} from "./interfaces/ICardService";
import {ObjectID} from "typeorm";
import {inject, injectable} from "inversify";
import {TYPES} from "../ioc";
import {
    BoardCardEntity,
    IBoardCardRepository,
    ICardCommentRepository,
    ICardListRepository,
    IUserRepository
} from "../repository";
import {CardInfoDto} from "./dtos/card/CardInfoDto";

@injectable()
export class CardServiceImpl implements ICardService {


    /**
     * Constructor
     * @param cardRepository card repo
     * @param cardListRepository card list repo
     * @param userRepository user repo
     * @param commentRepository comment repo
     */
    public constructor(
        @inject(TYPES.IBoardCardRepository) private cardRepository: IBoardCardRepository,
        @inject(TYPES.ICardListRepository) private cardListRepository: ICardListRepository,
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
        @inject(TYPES.ICardCommentRepository) private commentRepository: ICardCommentRepository) {
    }

    /**
     * Get specified card info
     * @param cardId The specified card id.
     */
    public async getCardInfo(cardId: ObjectID): Promise<CardInfoDto> {
        let card = await this.cardRepository.get(cardId);
        if (!card) {
            return Promise.reject(new Error(`The card ${cardId.toString()} is not exist.`));
        }

        let assignedUser = await this.userRepository.getBy({userId: card.assignedUserId});
        if (!assignedUser) {
            return Promise.reject(new Error(`The assignedUser ${card.assignedUserId} is not exist.`));
        }

        let dto = new CardInfoDto();
        dto._id = card._id;
        dto.description = card.description;
        dto.title = card.title;
        dto.assignedUser = {
            userId: assignedUser.userId,
            username: assignedUser.username
        };

        for (let commentId of card.comments) {
            let comment = await this.commentRepository.get(commentId);
            if (!comment) {
                return Promise.reject(new Error(`The comment ${commentId.toString()} is not exist.`));
            }

            dto.comments.push({
                _id: comment._id,
                content: comment.content
            });
        }

        return Promise.resolve(dto);
    }

    /**
     * Add new board card
     * @param dto new card info dto
     * @return Promise
     */
    public async addNewCard(dto: {listId: ObjectID, title: string, description: string, assignedUserId: string}): Promise<{
        _id: ObjectID,
        title: string,
        assignedUser: {
            userId: string,
            username: string
        }
    }> {
        let card = new BoardCardEntity();
        let assignedUser = await this.userRepository.getBy({userId: dto.assignedUserId});
        if (!assignedUser) {
            return Promise.reject(new Error(`The assigned user ${dto.assignedUserId} is not exist.`));
        }

        card.title = dto.title;
        card.description = dto.description;
        card.assignedUserId = assignedUser ? dto.assignedUserId : "";

        return this.cardRepository.add(card).then(async (added) => {
            let cardList = await this.cardListRepository.get(dto.listId);
            cardList.cardIds.push(added._id);
            this.cardListRepository.update(cardList).catch(err => {
                throw err;
            });

            return Promise.resolve({
                _id: added._id,
                title: added.title,
                assignedUser: {
                    userId: assignedUser ? assignedUser.userId : "",
                    username: assignedUser ? assignedUser.username : ""
                }
            });
        }, err => {
            throw err;
        });
    }

    /**
     * update specified card information
     * @param dto card info dto
     * @param cardId The specified card id.
     */
    public async updateCard(
        dto: {listId: ObjectID, title: string, description: string, assignedUserId: string},
        cardId: ObjectID): Promise<{
        _id: ObjectID,
        title: string,
        description: string,
        assignedUser: {
            userId: string,
            username: string
        }
    }> {
        let assignedUser = await this.userRepository.getBy({userId: dto.assignedUserId});
        if (!assignedUser) {
            return Promise.reject(new Error(`The assigned user ${dto.assignedUserId} is not exist.`));
        }

        return this.cardRepository.get(cardId).then((card) => {
            card.title = dto.title;
            card.description = dto.description;
            card.assignedUserId = assignedUser ? assignedUser.userId : "";

            return this.cardRepository.update(card).then((updated) => {
                return {
                    _id: updated._id,
                    title: updated.title,
                    description: updated.description,
                    assignedUser: {
                        userId: assignedUser ? assignedUser.userId : "",
                        username: assignedUser ? assignedUser.username : ""
                    }
                };
            }, (err) => {
                throw err;
            });
        }, (err) => {
            throw err;
        });
    }

    /**
     * delete specified card
     * @param cardId The specified card id.
     * @param cardListId The card list id that card storage.
     * @return The card deleted.
     */
    public async deleteCard(cardId: ObjectID, cardListId: ObjectID): Promise<BoardCardEntity> {
        let card = await this.cardRepository.get(cardId);
        if (!card) {
            return Promise.reject(new Error(`The card ${cardId.toString()} is not exist.`));
        }

        card.comments.forEach(async (id) => {
            let comment = await this.commentRepository.get(id);
            this.commentRepository.delete(comment).catch(err => {
                throw err;
            });
        });

        this.cardRepository.delete(card).catch(err => {
            throw err;
        });

        let cardList = await this.cardListRepository.get(cardListId);
        if (!cardList) {
            return Promise.reject(new Error(`The cardList ${cardListId.toString()} is not exist.`));
        }

        cardList.cardIds.objectIdRemove(cardId);
        this.cardListRepository.update(cardList).catch(err => {
            throw err;
        });

        return Promise.resolve(card);
    }
}
