import { ActionTree } from 'vuex'
import * as _ from 'lodash'

import { BoardApi } from '../../api'
import { RootState } from '../types'
import { 
  BoardState,
  BoardList,
  BoardListItem,
  types
} from './types'
import { Board } from '../../models/Board.model';

export const actions: ActionTree<BoardState, RootState> = {
  async [types.GET_BOARD_LIST]({ commit }): Promise<boolean> {
    let resData = await BoardApi.getBoardList()

    if (resData.result) {
      let boardList: BoardList = resData.boards
      commit(types.SET_BOARD_LIST, boardList)
      return true
    } else {
      commit(types.SET_BOARD_LIST , [])
      return false
    }
  },

  async [types.GET_BOARD_INFO]({ commit }, boardId: string): Promise<boolean> {
    let resData = await BoardApi.getBoardInfo(boardId)

    if (resData.result) {
      let board: Board = _.pick(resData, ['_id', 'boardName', 'admins', 'members'])
      commit(types.SET_CURRENT_BOARD, board)
      return true
    } else {
      commit(types.SET_CURRENT_BOARD, null)
      return false
    }
  },

  async [types.CREATE_BOARD]({ commit }, boardName: string): Promise<boolean> {
    let resData = await BoardApi.createBoard({ boardName })

    if (resData.result) {
      let boardListItem: BoardListItem = _.pick(resData, ['_id', 'boardName', 'isAdmin'])
      commit(types.INSERT_BOARD_TO_LIST, boardListItem)
      return true
    } else {
      return false
    }
  },

  async [types.UPDATE_BOARD]({ commit }, board: Board): Promise<boolean> {
    let resData = await BoardApi.updateBoard(board._id, {
      boardName: board.boardName,
      admins: board.admins.map(user => user.userId),
      members: board.members.map(user => user.userId)
    })

    if (resData.result) {
      let board: Board = _.pick(resData, ['_id', 'boardName', 'admins', 'members'])
      commit(types.SET_CURRENT_BOARD, board)
      return true
    } else {
      return false
    }
  },

  async [types.GET_FAKE_BOARD_LIST]({ commit }): Promise<boolean> {
    console.warn('Get fake board list mode !')
    let boardList: BoardList = [{
      _id: 'ksdfmodsvs',
      boardName: 'Board 1',
      isAdmin: true
    }, {
      _id: 'kldmfklremver',
      boardName: 'Board 2',
      isAdmin: false
    }]
    commit(types.SET_BOARD_LIST, boardList)
    return true
  },

  async [types.GET_FAKE_BOARD_INFO]({ commit }, boardId: string): Promise<boolean> {
    let board: Board = {
      _id: boardId,
      boardName: 'Fake board',
      admins: [{ userId: 'asdsas', username: 'Jay', email: ''}],
      members: [{ userId: 'asdsas', username: 'Jay', email: '' }]
    }
    commit(types.SET_CURRENT_BOARD, board)
    return true
  },

  async [types.CREATE_FAKE_BOARD]({ commit }, boardName: string): Promise<boolean> {
    console.warn('Create fake card !')
    let boardListItem: BoardListItem = {
      _id: (Math.random() * 1000000000).toString(),
      boardName,
      isAdmin: true
    }
    commit(types.INSERT_BOARD_TO_LIST, boardListItem)
    return true
  },
}