import { GetterTree } from 'vuex'

import { Board } from '../../models/Board.model'
import { RootState } from '../types'
import { 
  BoardState,
  BoardList,
  types
} from './types'

export const getters: GetterTree<BoardState, RootState> = {
  [types.BOARD_LIST](state): BoardList {
    return state.boardList
  },

  [types.CURRENT_BOARD](state): Board {
    return state.displayedBoard
  }
}