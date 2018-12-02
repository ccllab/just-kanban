/**
 * The kanban board information
 */
interface BoardConsructPatameters {
  _id: string
  name: string
  stages: string[]
  isCreator: boolean
  isAdmin: boolean
  members?: string[]
}

export class Board {
  _id: string
  name: string
  stages: string[]
  isCreator: boolean
  isAdmin: boolean
  members: string[]

  constructor(para: BoardConsructPatameters) {
    Object.assign(this, para)
  }
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
