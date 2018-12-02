import { GetterTree } from 'vuex'

import { types as authTypes } from '../auth/types'
import { RootState } from '../types'
import { User } from '../auth/types'
import { 
  Card,
  CardState,
  types
} from './types'

export const getters: GetterTree<CardState, RootState> = {
  /**
   * 取得所有 Card
   * @param state 
   */
  [types.CARD_LIST](state): Card[] {
    return state.cardList
  },

  /**
   * 針對不同之 Stage 返回 Card 列表
   * 此 Getter 會返回函數，用以輸入特定 Stage
   * @param state 
   */
  [types.CARD_LIST_BY_STAGE](state): (stage: string) => Card[] {
    return (stage: string) => {
      return state.cardList.filter(card => card.status === stage)
    }
  },

  /**
   * 指示當前登入之用戶針對某個 Card 是否有被指派
   * 此 Getter 會返回函數，用以選擇特定 Card
   * @param state 
   * @param getters 
   */
  [types.CARD_ASSIGNED](state, getters): (id: string) => boolean {
    return (id: string) => {
      let user: User = getters[authTypes.USER]
      let card: Card = state.cardList.find(card => card._id === id)
      return card.assigned.indexOf(user._id) !== -1
    }
  }
}