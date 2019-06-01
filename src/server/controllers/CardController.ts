import ApiControllerBase from "./ApiControllerBase";
import {controller, httpDelete, httpPatch, httpPost, request, requestParam, response} from "inversify-express-utils";
import {inject} from "inversify";
import {TYPES} from "../ioc";
import {ICardCommentService, ICardService} from "../services";
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
     * @param cardCommentService card comment service
     */
    public constructor(
        @inject(TYPES.ICardService) private cardService: ICardService,
        @inject(TYPES.ICardCommentService) private cardCommentService: ICardCommentService) {

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
     * Get card information
     * @param cardId The specified card id
     * @param res response
     * @param req request
     */
    @httpPost('/:id')
    private async getCardInfo(
        @requestParam("id") cardId: ObjectID,
        @response() res: express.Response,
        @request() req: express.Request): Promise<express.Response> {

        if (! await this.isAuthenticated()) {
            return res.status(401).send('Please login, and try again.');
        }

        if (!cardId) {
            return Promise.resolve(res.status(400).send({
                error: "card id undefined."
            }));
        }

        return this.cardService.getCardInfo(cardId).then((result) => {
            return res.send(result);
        }, err => {
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

        if (!cardId) {
            return Promise.resolve(res.status(400).send({
                error: "card id undefined."
            }));
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

    /**
     * Create new card comment
     * @param cardId The specified card id
     * @param res response
     * @param req request
     */
    @httpPost('/:id/comment')
    private async addCardComment(
        @requestParam("id") cardId: ObjectID,
        @response() res: express.Response,
        @request() req: express.Request): Promise<express.Response> {

        if (! await this.isAuthenticated()) {
            return res.status(401).send('Please login, and try again.');
        }

        if (!cardId) {
            return Promise.resolve(res.status(400).send({
                error: "card id undefined."
            }));
        }

        let {content} = req.body;

        return this.cardCommentService.addComment(cardId, content).then((result) => {
            return res.send(result);
        }, (err) => {
            return res.status(400).send({
                error: err.message
            });
        });
    }

    /**
     * Delete specified card
     * @param res response
     * @param req request
     */
    @httpDelete('/')
    private async deleteCard(
        @response() res: express.Response,
        @request() req: express.Request): Promise<express.Response> {

        if (! await this.isAuthenticated()) {
            return res.status(401).send('Please login, and try again.');
        }

        let {cardId, cardListId} = req.body;

        return this.cardService.deleteCard(cardId, cardListId).then(result => {
            return res.send(result);
        }, (err) => {
            return res.status(400).send({
                error: err.message
            });
        });
    }
}
