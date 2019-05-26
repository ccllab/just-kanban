import { BaseResponseData } from './base';
import { Board } from '../../models/Board.model';
import { userId } from '../../models/User.model';

export interface CreateBoardRequest {
  boardName: string
}
export interface UpdateBoardRequest {
  boardName: string,
  admins: {
    insert: userId[],
    remove: userId[]
  },
  members: {
    insert: userId[],
    remove: userId[]
  }
}

export interface GetBoardListResponseData extends BaseResponseData {
  array: [{
    _id: string,
    boardName: string,
    isAdmin: boolean
  }]
}
export interface CreateBoardResponseData extends BaseResponseData {
  _id: string,
  boardName: string,
  isAdmin: boolean
}
export interface GetBoardInfoResponseData extends BaseResponseData, Board {}
export interface UpdateBoardResponseData extends BaseResponseData, Board {}

export interface IBoardApiHelper {
  getBoardList(): Promise<GetBoardListResponseData>;
  createBoard(param: CreateBoardRequest): Promise<CreateBoardResponseData>;
  getBoardInfo(id: string): Promise<GetBoardInfoResponseData>;
  updateBoard(id: string, param: UpdateBoardRequest): Promise<UpdateBoardResponseData>;
}