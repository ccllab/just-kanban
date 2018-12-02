import { ActionTree } from 'vuex'

import { RootState } from '../types'
import { CardState } from './types'
import mTypes from './mutations'

const types = {
  UPDATE_CARD_STAGE: 'updateCardStage'
}

export default types

export const actions: ActionTree<CardState, RootState> = {
  [types.UPDATE_CARD_STAGE]({ commit }, payload: { cardId: string, stage: string }) {
    
    setTimeout(() => {
      commit(mTypes.SET_CARD_STAGE, payload)
    }, 500)
  }
}