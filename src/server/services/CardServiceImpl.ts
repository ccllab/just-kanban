import {ICardService} from "./interfaces/ICardService";
import {ObjectID} from "typeorm";
import {inject, injectable} from "inversify";
import {TYPES} from "../ioc";
import {BoardCardEntity, IBoardCardRepository, ICardListRepository, IUserRepository} from "../repository";

@injectable()
export class CardServiceImpl implements ICardService {


    /**
     * Constructor
     * @param cardRepository card repo
     * @param cardListRepository card list repo
     * @param userRepository user repo
     */
    public constructor(
        @inject(TYPES.IBoardCardRepository) private cardRepository: IBoardCardRepository,
        @inject(TYPES.ICardListRepository) private cardListRepository: ICardListRepository,
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository) {
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
}
