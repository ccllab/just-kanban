import { ActionTree } from 'vuex'

import board_mTypes from './mutations'
import card_mTypes from '../cards/mutations'
import { RootState } from '../types'
import { 
  Board,
  BoardState
} from './types'

const types = {
  GET_CURRENT_BOARD: 'getCurrentBoard',
  GET_BOARD_LIST: 'getBoardList'
}

export default types

export const actions: ActionTree<BoardState, RootState> = {
  [types.GET_CURRENT_BOARD]({ commit }, boardId: string): void {
    let currentBoard = new Board({
      _id: boardId,
      name: 'Board Name',
      stages: ['on-hold', 'in-progress', 'needs-review', 'approved'],
      isCreator: true,
      isAdmin: true
    })

    commit(card_mTypes.SET_RANDOM_CARD_LIST, { 
      stages: currentBoard.stages,
      count: 20
    })
    commit(board_mTypes.SET_CURRENT_BOARD, currentBoard)
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

    commit(board_mTypes.SET_BOARD_LIST, boardList)
  }
}