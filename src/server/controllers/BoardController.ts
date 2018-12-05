import ApiControllerBase from "./ApiControllerBase";
import {controller, httpPost, request, requestParam, response} from "inversify-express-utils";
import {inject} from "inversify";
import {TYPES} from "../ioc";
import {IBoardService} from "../services";
import * as express from "express";

/**
 * Board api controller
 */
@controller("/api/board")
export class BoardController extends ApiControllerBase {

    /**
     * constructor
     * @param boardService Board management service
     */
    public constructor(@inject(TYPES.IBoardService) private boardService: IBoardService) {
        super();
    }

    /**
     * Add new board
     * @param res response
     * @param req request
     */
    @httpPost("/")
    private async addBoard(
        @response() res: express.Response,
        @request() req: express.Request): Promise<express.Response> {

        if (! await this.isAuthenticated()) {
            return res.status(401).send('Please login, and try again.');
        }

        let {boardName} = req.body;
        let {_id} = this.httpContext.user.details;

        if (!boardName) {
            return Promise.resolve(res.status(400).send({
                error: "Empty Board Name."
            }));
        }

        return this.boardService.createNewBoard(boardName, _id).then((dto) => {
            return res.send(dto);
        }, (err) => {
            return res.status(400).send({
                error: err.message
            });
        });
    }

    /**
     * Get user's board list
     * @param res response
     * @param req request
     */
    @httpPost("/all")
    private async getUserBoards(
        @response() res: express.Response,
        @request() req: express.Request): Promise<express.Response> {

        if (! await this.isAuthenticated()) {
            return res.status(401).send('Please login, and try again.');
        }

        return this.boardService.getUserBoards(this.httpContext.user.details).then((result) => {
            return res.send(result);
        }, (err) => {
            return res.status(400).send({
                error: err.message
            });
        });
    }

    /**
     * Get specified board info
     * @param id board id
     * @param res response
     * @param req request
     */
    @httpPost("/:id")
    private async getBoardInfo(
        @requestParam("id") id: string,
        @response() res: express.Response,
        @request() req: express.Request
    ): Promise<express.Response> {

        if (! await this.isAuthenticated()) {
            return res.status(401).send('Please login, and try again.');
        }

        if (!id) {
            return Promise.resolve(res.status(400).send({
                error: "Board id undefined."
            }));
        }

        if (id === '') {
            return Promise.resolve(res.status(400).send({
                error: "Empty board id."
            }));
        }

        return this.boardService.getBoardInfo(id).then((dto) => {
            return res.send(dto);
        }, (err) => {
            return res.status(400).send({
                error: err.message
            });
        });
    }
}
