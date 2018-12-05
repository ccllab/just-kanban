import {IBoardService} from "./interfaces/IBoardService";
import {BoardBasicDto} from "./dtos/board/BoardBasicDto";
import {IKanbanBoardRepository, IUserRepository, KanbanBoardEntity, User} from "../repository";
import {BoardMembersInfoDto} from "./dtos/board/BoardMembersInfoDto";
import {inject, injectable} from "inversify";
import {TYPES} from "../ioc";

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
    public async createNewBoard(boardName: string, userObjectId: string): Promise<BoardBasicDto> {
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
    public getBoardInfo(boardId: string): Promise<BoardMembersInfoDto> {
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
    public updateBoardInfo(boardId: string, dto: {name: string, admins: string[], members: string[]}): Promise<BoardMembersInfoDto> {
        throw new Error();
    }
}
