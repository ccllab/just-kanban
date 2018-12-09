import ApiControllerBase from "./ApiControllerBase";
import {controller, httpPost, request, requestParam, response} from "inversify-express-utils";
import {ObjectID} from "typeorm";
import {inject} from "inversify";
import {TYPES} from "../ioc";
import {ICardListService} from "../services";
import * as express from "express";

@controller('/api/card-list')
export class CardListController extends ApiControllerBase {

    /**
     * Constructor
     */
    public constructor(
        @inject(TYPES.ICardListService) private cardListService: ICardListService
    ) {
        super();
    }

    /**
     * Create new card list for specified board
     * @param boardId The specified board id
     * @param res response
     * @param req request
     */
    @httpPost('/add/:boardId')
    public async createCardList(
        @requestParam("boardId") boardId: ObjectID,
        @response() res: express.Response,
        @request() req: express.Request): Promise<express.Response> {

        if (! await this.isAuthenticated()) {
            return res.status(401).send('Please login, and try again.');
        }

        if (!boardId) {
            return Promise.resolve(res.status(400).send({
                error: "Board id undefined."
            }));
        }

        let {cardListName} = req.body;

        return this.cardListService.addCardList(cardListName, boardId).then((result) => {
            return res.send(result);
        }, err => {
            return res.status(400).send({
                error: err.message
            });
        });
    }

    /**
     * update specified card list name
     * @param cardListId The specified card list
     * @param res response
     * @param req request
     */
    @httpPost("/newname/:cardListId")
    public async updateCardListName(
        @requestParam("cardListId") cardListId: ObjectID,
        @response() res: express.Response,
        @request() req: express.Request): Promise<express.Response> {

        if (! await this.isAuthenticated()) {
            return res.status(401).send('Please login, and try again.');
        }

        if (!cardListId) {
            return Promise.resolve(res.status(400).send({
                error: "Board id undefined."
            }));
        }

        let {cardListName} = req.body;

        return this.cardListService.updateCardListName(cardListName, cardListId).then((result) => {
            return res.send(result);
        }, err => {
            return res.status(400).send({
                error: err.message
            });
        });
    }
}
