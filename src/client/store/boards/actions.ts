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
    let currentBoard: Board = {
      _id: boardId,
      boardName: 'Board Name',
      admins: [],
      members: []
    }
  },

  [types.GET_BOARD_LIST]({ commit }): void {
    let boardList: Board[] = [{
      _id: 'boardId',
      boardName: 'Board Name1',
      admins: [],
      members: []
    }, {
      _id: 'boardId',
      boardName: 'Board Name2',
      admins: [],
      members: []
    }]

    commit(types.SET_BOARD_LIST, boardList)
  }
}