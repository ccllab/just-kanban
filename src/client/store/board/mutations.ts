import { MutationTree } from 'vuex'

import { Board } from '../../models/Board.model'
import { 
  BoardState, 
  BoardList,
  BoardListItem, 
  types } from './types'

export const mutations: MutationTree<BoardState> = {
  [types.SET_BOARD_LIST](state, payload: BoardList): void {
    state.boardList = payload || null
  },

  [types.INSERT_BOARD_TO_LIST](state, payload: BoardListItem): void {
    state.boardList.push(payload)
  },

  [types.SET_CURRENT_BOARD](state, payload: Board): void {
    state.displayedBoard = payload || null
  }
}