import {BoardBasicDto, BoardMembersInfoDto} from "..";
import {User} from "../../repository";

/**
 * Board management service
 */
export interface IBoardService {

    /**
     * Create new board
     * @param boardName The board name
     * @param userObjectId The user id who create this board
     */
    createNewBoard(boardName: string, userObjectId: string): Promise<BoardBasicDto>;

    /**
     * Get user's boards
     * @param user The specified user
     */
    getUserBoards(user: User): Promise<Array<BoardBasicDto>>;

    /**
     * Get specified board information by board id
     * @param boardId The board id
     */
    getBoardInfo(boardId: string): Promise<BoardMembersInfoDto>;

    /**
     * Update specified board
     * @param boardId The board id
     * @param dto The update data
     */
    updateBoardInfo(boardId: string, dto: {name: string, admins: string[], members: string[]}): Promise<BoardMembersInfoDto>;
}
