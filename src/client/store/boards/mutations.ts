import { MutationTree } from 'vuex'

import { Board } from '../../models/Board.model'
import { BoardState, types } from './types'

export const mutations: MutationTree<BoardState> = {
  [types.SET_BOARD_LIST](state, payload: Board[]): void {
    state.boardList = payload || []
  },

  [types.SET_CURRENT_BOARD](state, payload: Board): void {
    state.currentBoard = payload || null
  }
}