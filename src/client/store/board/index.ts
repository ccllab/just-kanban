import { Module } from 'vuex'

import { BoardState } from './types'
import { RootState } from '../types'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'

const state: BoardState = {
  boardList: [],
  displayedBoard: null,
  cardLists: [],
  displayedCard: null
}

export const boards: Module<BoardState, RootState> = {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}