import { GetterTree } from 'vuex'

import { RootState } from '../types'
import { 
  Board,
  BoardState
} from './types'

const types = {
  BOARD_LIST: 'boardList',
  CURRENT_BOARD: 'currentBoard'
}

export default types

export const getters: GetterTree<BoardState, RootState> = {
  [types.BOARD_LIST](state): Board[] {
    return state.boardList
  },

  [types.CURRENT_BOARD](state): Board {
    return state.currentBoard
  }
}