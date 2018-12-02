import { ActionTree } from 'vuex'

import { RootState } from '../types'
import { CardState, types } from './types'

export const actions: ActionTree<CardState, RootState> = {
  [types.UPDATE_CARD_STAGE]({ commit }, payload: { cardId: string, stage: string }) {
    
    setTimeout(() => {
      commit(types.SET_CARD_STAGE, payload)
    }, 500)
  }
}