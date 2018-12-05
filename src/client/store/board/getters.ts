import { GetterTree } from 'vuex'

import { Board } from '../../models/Board.model'
import { RootState } from '../types'
import { 
  BoardState,
  types
} from './types'

export const getters: GetterTree<BoardState, RootState> = {
  [types.BOARD_LIST](state): Board[] {
    return state.boardList
  },

  [types.CURRENT_BOARD](state): Board {
    return state.currentBoard
  }
}