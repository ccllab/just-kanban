import {BoardBasicDto, BoardMembersInfoDto, BoardMemberUpdateDto} from "..";
import {User} from "../../repository";
import {ObjectID} from "typeorm";

/**
 * Board management service
 */
export interface IBoardService {

    /**
     * Create new board
     * @param boardName The board name
     * @param userObjectId The user id who create this board
     */
    createNewBoard(boardName: string, userObjectId: ObjectID): Promise<BoardBasicDto>;

    /**
     * Get user's boards
     * @param user The specified user
     */
    getUserBoards(user: User): Promise<Array<BoardBasicDto>>;

    /**
     * Get specified board information by board id
     * @param boardId The board id
     */
    getBoardInfo(boardId: ObjectID): Promise<BoardMembersInfoDto>;

    /**
     * Update specified board
     * @param boardId The board id
     * @param dto The update data
     */
    updateBoardInfo(boardId: string, dto: BoardMemberUpdateDto): Promise<BoardMembersInfoDto>;
}
