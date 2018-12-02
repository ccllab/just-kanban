import { ActionTree } from 'vuex'

import { types as cardTypes } from '../cards/types'
import { RootState } from '../types'
import { 
  Board,
  BoardState,
  types
} from './types'

export const actions: ActionTree<BoardState, RootState> = {
  [types.GET_CURRENT_BOARD]({ commit }, boardId: string): void {
    let currentBoard = new Board({
      _id: boardId,
      name: 'Board Name',
      stages: ['on-hold', 'in-progress', 'needs-review', 'approved'],
      isCreator: false,
      isAdmin: false
    })

    commit(cardTypes.SET_RANDOM_CARD_LIST, { 
      stages: currentBoard.stages,
      count: 20
    })
    commit(types.SET_CURRENT_BOARD, currentBoard)
  },

  [types.GET_BOARD_LIST]({ commit }): void {
    let boardList = [new Board({
      _id: 'asdwdewew',
      name: 'Board1',
      stages: ['on-hold', 'in-progress', 'needs-review', 'approved'],
      isCreator: true,
      isAdmin: true
    }), new Board({
      _id: 'cdsvdsfds',
      name: 'Board2',
      stages: ['on-hold', 'in-progress', 'needs-review', 'approved'],
      isCreator: true,
      isAdmin: true
    })]

    commit(types.SET_BOARD_LIST, boardList)
  }
}