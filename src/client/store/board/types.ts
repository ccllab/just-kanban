import { Board } from '../../models/Board.model'

export type BoardListItem = {
  _id: string,
  boardName: string,
  isAdmin: boolean
}
export type BoardList = BoardListItem[]

export interface BoardState {
  boardList: BoardList,
  displayedBoard: Board
}

export type GetBoardListFunc = () => Promise<boolean>
export type GetBoardInfo = (boardId: string) => Promise<boolean>
export type CreateBoard = (boardName: string) => Promise<boolean>

export const types = {
  // actions 
  GET_BOARD_LIST: 'getBoardList',
  GET_BOARD_INFO: 'getBoardInfo',
  CREATE_BOARD: 'createBoard',

  GET_FAKE_BOARD_LIST: 'getFakeBoardList',
  CREATE_FAKE_BOARD: 'createFakeBoard',

  // getters
  BOARD_LIST: 'boardList',
  CURRENT_BOARD: 'currentBoard',

  // mutations
  SET_BOARD_LIST: 'setBoardList',
  INSERT_BOARD_TO_LIST: 'insertBoardToList',
  SET_CURRENT_BOARD: 'setCurrentBoard'
}
