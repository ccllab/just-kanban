import { Module } from 'vuex'

import { CardState } from './types'
import { RootState } from '../types'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'

const state: CardState = {
  cardList: [],
  currentCard: null
}

export const cards: Module<CardState, RootState> = {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}