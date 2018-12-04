import { Board } from '../../models/Board.model'

export interface BoardState {
  boardList: Board[],
  currentBoard: Board
}

export const types = {
  // actions 
  GET_CURRENT_BOARD: 'getCurrentBoard',
  GET_BOARD_LIST: 'getBoardList',

  // getters
  BOARD_LIST: 'boardList',
  CURRENT_BOARD: 'currentBoard',

  // mutations
  SET_BOARD_LIST: 'setBoardList',
  SET_CURRENT_BOARD: 'setCurrentBoard'
}
