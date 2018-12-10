import {ICardCommentService} from "./interfaces/ICardCommentService";
import {ObjectID} from "typeorm";
import {inject, injectable} from "inversify";
import {TYPES} from "../ioc";
import {CardCommentEntity, IBoardCardRepository, ICardCommentRepository} from "../repository";

/**
 * Card comment service impl
 */
@injectable()
export class CardCommentServiceImpl implements ICardCommentService {

    /**
     * Constructor
     * @param cardCommentRepo Board card comment repo
     * @param cardRepo Board card repo
     */
    public constructor(
        @inject(TYPES.ICardCommentRepository) private cardCommentRepo: ICardCommentRepository,
        @inject(TYPES.IBoardCardRepository) private cardRepo: IBoardCardRepository) {
    }

    /**
     * Add new comment to specified card
     * @param cardId The specified card id
     * @param content The content of comment.
     */
    public async addComment(cardId: ObjectID, content: string): Promise<{_id: ObjectID, content: string}> {
        let card = await this.cardRepo.get(cardId);

        if (!card) {
            return Promise.reject(new Error("The card is not exist."));
        }

        let comment = new CardCommentEntity();
        comment.content = content;

        return this.cardCommentRepo.add(comment).then((added) => {
            card.comments.push(added._id);
            this.cardRepo.update(card).catch((err) => {
                throw err;
            });

            return Promise.resolve({
                _id: added._id,
                content: added.content
            });
        }, (err) => {
            throw err;
        });
    }
}
