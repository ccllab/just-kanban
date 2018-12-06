import ApiControllerBase from "./ApiControllerBase";
import {controller, httpPatch, httpPost, request, requestParam, response} from "inversify-express-utils";
import {inject} from "inversify";
import {TYPES} from "../ioc";
import {BoardMemberUpdateDto, IBoardService} from "../services";
import {ObjectID} from "typeorm";
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
        @requestParam("id") id: ObjectID,
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

        return this.boardService.getBoardInfo(id).then((dto) => {
            return res.send(dto);
        }, (err) => {
            return res.status(400).send({
                error: err.message
            });
        });
    }

    /**
     * Update specified board
     * @param id The board id
     * @param res Response
     * @param req Request
     */
    @httpPatch("/:id")
    private async updateBoard(
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

        let {boardName, admins, members} = req.body;
        let dto = new BoardMemberUpdateDto();
        dto.boardName = boardName;
        dto.admins = admins;
        dto.members = members;

        return this.boardService.updateBoardInfo(id, dto).then((dto) => {
            return res.send(dto);
        }, err => {
            return res.status(400).send({
                error: err.message
            });
        });
    }
}
