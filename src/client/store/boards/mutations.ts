import { MutationTree } from 'vuex'

import { Board ,BoardState } from './types'

const types = {
  SET_BOARD_LIST: 'setBoardList',
  SET_CURRENT_BOARD: 'setCurrentBoard'
}

export default types

export const mutations: MutationTree<BoardState> = {
  [types.SET_BOARD_LIST](state, payload: Board[]): void {
    state.boardList = payload || []
  },

  [types.SET_CURRENT_BOARD](state, payload: Board): void {
    state.currentBoard = payload || null
  }
}