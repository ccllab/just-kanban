import '../utils/extensions/extension'; // import extension method
import {IBoardService} from "./interfaces/IBoardService";
import {BoardBasicDto} from "./dtos/board/BoardBasicDto";
import {IKanbanBoardRepository, IUserRepository, KanbanBoardEntity, User} from "../repository";
import {BoardMembersInfoDto} from "./dtos/board/BoardMembersInfoDto";
import {inject, injectable} from "inversify";
import {TYPES} from "../ioc";
import {union} from 'lodash';
import {BoardMemberUpdateDto} from "./dtos/board/BoardMemberUpdateDto";
import {ObjectID} from "typeorm";
import * as mongodb from 'mongodb';

/**
 * Board management service impl
 */
@injectable()
export class BoardServiceImpl implements IBoardService {

    /**
     * Constructor
     * @param boardRepository Board entity repo
     * @param userRepository User entity repo
     */
    public constructor(
        @inject(TYPES.IKanbanBoardRepository) private boardRepository: IKanbanBoardRepository,
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository) {
    }

    /**
     * Create new board
     * @param boardName The board name
     * @param userObjectId The user id who create this board
     * @return Promise
     */
    public async createNewBoard(boardName: string, userObjectId: ObjectID): Promise<BoardBasicDto> {
        if (await this.boardRepository.getBy({boardName: boardName})) {
            throw new Error("The board name already used");
        }

        let board = new KanbanBoardEntity();
        board.boardName = boardName;
        board.admins.push(userObjectId);
        board.memberIds.push(userObjectId);

        return this.boardRepository.add(board).then(async (board) => {
            let dto = new BoardBasicDto();
            dto._id = board._id;
            dto.boardName = board.boardName;
            dto.isAdmin = true;

            let user = await this.userRepository.get(userObjectId);
            user.boardIds.push(board._id);

            this.userRepository.update(user).catch(err => {
                throw err;
            });

            return dto;
        }, (err) => {
            throw err;
        });
    }

    /**
     * Get user's boards
     * @param user The specified user
     * @return Promise
     */
    public async getUserBoards(user: User): Promise<Array<BoardBasicDto>> {
        let results: Array<BoardBasicDto> = [];

        for (let boardId of user.boardIds) {
            let dto = new BoardBasicDto();
            let board = await this.boardRepository.get(boardId);

            dto._id = board._id;
            dto.boardName = board.boardName;

            for (let adminId of board.admins) {
                if (adminId.toString() === user._id.toString()) {
                    dto.isAdmin = true;
                    break;
                }
            }

            results.push(dto);
        }

        return results;
    }

    /**
     * Get specified board information by board id
     * @param boardId The board id
     * @return Promise
     */
    public getBoardInfo(boardId: ObjectID): Promise<BoardMembersInfoDto> {
        return this.boardRepository.get(boardId).then(async (board) => {
            let dto = new BoardMembersInfoDto();
            dto._id = board._id;
            dto.boardName = board.boardName;

            for (let userId of board.admins) {
                let user = await this.userRepository.get(userId);
                dto.admins.push({
                    userId: user.userId,
                    username: user.username
                });
            }

            for (let userId of board.memberIds) {
                let user = await this.userRepository.get(userId);
                dto.members.push({
                    userId: user.userId,
                    username: user.username
                });
            }

            return dto;
        }, (err) => {
            throw err;
        });
    }

    /**
     * Update specified board
     * @param boardId The board id
     * @param dto The update data
     * @return Promise
     */
    public updateBoardInfo(boardId: string, dto: BoardMemberUpdateDto): Promise<BoardMembersInfoDto> {
        return this.boardRepository.get(boardId).then(async (board) => {
            board.boardName = dto.boardName;

            dto.admins.insert = union(dto.admins.insert);
            dto.admins.remove = union(dto.admins.remove);
            dto.members.insert = union(dto.members.insert);
            dto.members.remove = union(dto.members.remove);

            /**
             * inner func insert boardId to user.
             * @param userIds array of user id.
             * @param originUsers The user list that not updated.
             */
            let insertBoardIdToUser = async (userIds: string[], originUsers: ObjectID[]) => {
                let boardObjId = mongodb.ObjectID.createFromHexString(boardId);

                for (let userId of userIds) {
                    let user = await this.userRepository.getBy({userId});
                    user.boardIds.push(boardObjId); // todo bug storage as a string
                    user.boardIds = union(user.boardIds);

                    this.userRepository.update(user).catch(err => {
                        throw err;
                    });

                    originUsers.push(user._id);
                }
            };

            // invoke
            await insertBoardIdToUser(dto.admins.insert, board.admins);
            await insertBoardIdToUser(dto.members.insert, board.memberIds);

            // get users that remove from this board(both admins and members)
            let userRemoving = dto.admins.remove.intersect(dto.members.remove);
            for (let userId of userRemoving) {
                let user = await this.userRepository.getBy({userId});
                user.boardIds = user.boardIds.objectIdRemove(boardId);
                user.boardIds = union(user.boardIds);

                this.userRepository.update(user).catch(err => {
                    throw err;
                });
            }

            // update specified board admins and members
            for (let userId of dto.admins.remove) {
                let user = await this.userRepository.getBy({userId});
                board.admins = board.admins.objectIdRemove(user._id);
            }

            for (let userId of dto.members.remove) {
                let user = await this.userRepository.getBy({userId});
                board.memberIds = board.memberIds.objectIdRemove(user._id);
            }

            board.admins = union(board.admins);
            board.memberIds = union(board.memberIds);
            let updated = await this.boardRepository.update(board);

            return this.getBoardInfo(updated._id);
        }, err => {
            throw err;
        });
    }
}
