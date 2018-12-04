import { User } from '../auth/types'

/**
 * The kanban board information
 */
export interface Board {
  _id: string
  boardName: string
  admins: User[]
  members: User[]
} 

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
