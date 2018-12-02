import { GetterTree } from 'vuex'

import { RootState } from '../types'
import { 
  Card,
  CardState,
} from './types'

const types = {
  CARD_LIST: 'cardList',
  CARD_LIST_BY_STAGE: 'cardListByStage'
}
export default types

export const getters: GetterTree<CardState, RootState> = {
  [types.CARD_LIST](state): Card[] {
    return state.cardList
  },

  [types.CARD_LIST_BY_STAGE](state): (stage: string) => Card[] {
    return (stage: string) => {
      return state.cardList.filter(card => card.status === stage)
    }
  }
}