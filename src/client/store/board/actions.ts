import { ActionTree } from 'vuex'

import { RootState } from '../types'
import { 
  BoardState,
  types
} from './types'

export const actions: ActionTree<BoardState, RootState> = {
  [types.GET_CURRENT_BOARD]({ commit }, boardId: string): void {

  },

  [types.GET_BOARD_LIST]({ commit }): void {

  }
}