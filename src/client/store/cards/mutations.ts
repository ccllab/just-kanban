import { MutationTree } from 'vuex'
import * as faker from 'faker';

import { 
  Card,
  CardState,
  types
} from './types'

export const mutations: MutationTree<CardState> = {
  [types.SET_CARD_LIST](state, payload: Card[]) {
    state.cardList = payload || []
  },

  [types.SET_RANDOM_CARD_LIST](state, payload: {stages: string[], count: number}) {
    state.cardList = []
    for (let i = 0; i < payload.count; i++) {
      let card = new Card({
        _id: i.toString(),
        title: faker.company.bs(),
        status: payload.stages[Math.floor(Math.random() * payload.stages.length)],
        index: 0,
        assigned: [Math.floor(Math.random() * payload.stages.length) ? '123' : '8888']
      })
      state.cardList.push(card)
    }
  },

  [types.SET_CARD_STAGE](state, payload: { cardId: string, stage: string }) {
    let { cardId, stage } = payload
    state.cardList.find(card => card._id === cardId).status = stage
  }
}