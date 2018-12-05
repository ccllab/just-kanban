import { BaseResponseData } from './base'
import { Board } from '../../models/Board.model'

export interface CreateBoardRequest {
  boardName: string
}
export interface UpdateBoardRequest {
  boardName: string,
  admins: string[],
  members: string[]
}

export interface GetBoardListResponseData extends BaseResponseData {
  boards: [{
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