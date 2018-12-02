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
