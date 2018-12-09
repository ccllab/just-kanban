import ApiControllerBase from "./ApiControllerBase";
import {controller, httpPatch, httpPost, request, requestParam, response} from "inversify-express-utils";
import {inject} from "inversify";
import {TYPES} from "../ioc";
import {ICardService} from "../services";
import {ObjectID} from "typeorm";
import * as express from "express";

/**
 * Card api controller
 */
@controller('/api/card')
export class CardController extends ApiControllerBase {

    /**
     * Constructor
     * @param cardService card management service
     */
    public constructor(@inject(TYPES.ICardService) private cardService: ICardService) {
        super();
    }

    /**
     * create new card to specified card list
     * @param res response
     * @param req request
     */
    @httpPost('/')
    private async createNewCard(
        @response() res: express.Response,
        @request() req: express.Request): Promise<express.Response> {

        if (! await this.isAuthenticated()) {
            return res.status(401).send('Please login, and try again.');
        }

        let {listId, title, description, assignedUserId} = req.body;

        return this.cardService.addNewCard({
            listId: listId,
            title: title,
            description: description,
            assignedUserId: assignedUserId
        }).then((result) => {
            return res.send(result);
        }, (err) => {
            return res.status(400).send({
                error: err.message
            });
        });
    }

    /**
     * update specified card info
     * @param cardId The specified card id
     * @param res response
     * @param req request
     */
    @httpPatch('/:id')
    private async editCardInfo(
        @requestParam("id") cardId: ObjectID,
        @response() res: express.Response,
        @request() req: express.Request): Promise<express.Response> {

        if (! await this.isAuthenticated()) {
            return res.status(401).send('Please login, and try again.');
        }

        let {listId, title, description, assignedUserId} = req.body;

        return this.cardService.updateCard({
            listId: listId,
            title: title,
            description: description,
            assignedUserId: assignedUserId
        }, cardId).then((result) => {
            return res.send(result);
        }).catch((err) => {
            return res.status(400).send({
                error: err.message
            });
        });
    }
}
