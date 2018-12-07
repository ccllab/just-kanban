import { MutationTree } from 'vuex'
import * as _ from 'lodash'

import { Board } from '../../models/Board.model'

import { 
  BoardState, 
  BoardList,
  BoardListItem, 
  CardList,
  CardLists,
  DragCardParameters,
  AddNewCarParameters,
  types } from './types'
import { Card } from '../../models/Card.model';

export const mutations: MutationTree<BoardState> = {
  [types.SET_BOARD_LIST](state, payload: BoardList): void {
    state.boardList = payload || null
  },

  [types.INSERT_BOARD_TO_LIST](state, payload: BoardListItem): void {
    state.boardList.push(payload)
  },

  [types.SET_CURRENT_BOARD](state, payload: Board): void {
    state.displayedBoard = payload || null
  },

  [types.SET_CARD_LISTS](state, payload: CardLists): void {
    state.cardLists = payload || null
  },

  [types.ADD_NEW_CARD_LIST](state, payload: CardList) {
    state.cardLists || (state.cardLists = [])
    state.cardLists.push(payload)
  },

  [types.SET_CURRENT_CARD](state, payload: Card): void {
    state.displayedCard = payload
  },

  [types.UPDATE_CARD_LISTS](state, payload: DragCardParameters): void {
    let srcList = state.cardLists.find(list => list._id === payload.srcListId)
    let dstList = state.cardLists.find(list => list._id === payload.dstListId)
    let card = srcList.cards.find(card => card._id === payload.cardId)
    _.pullAllWith(srcList.cards, [card], _.isEqual)
    dstList.cards.splice(payload.dstIndex, 0, card)
  },

  [types.ADD_NEW_CARD](state, payload: AddNewCarParameters): void {
    let list = state.cardLists.find(list => list._id === payload.listId)
    if (!list) return
    list.cards.push(payload.card)
  }
}