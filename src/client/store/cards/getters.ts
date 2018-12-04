import { GetterTree } from 'vuex'

import { User } from '../../models/User.model'
import { Board } from '../../models/Board.model'
import { types as authTypes } from '../auth/types'
import { types as boardTypes } from '../boards/types'
import { RootState } from '../types'
import { 
  CardState,
  types 
} from './types'

export const getters: GetterTree<CardState, RootState> = {
  /**
   * 指示當前登入之用戶針對某個 Card 是否有被指派
   * 此 Getter 會返回函數，用以選擇特定 Card
   * @param state 
   * @param getters 
   */
  [types.CARD_ASSIGNED](state, getters): (id: string) => boolean {
    return (id: string) => {
      return false
    }
  },

  /**
   * 用以指示特定卡片是否可被編輯或拖移改變 status
   * @param state 
   * @param getters 
   */
  [types.CARD_CAN_EDIT](state, getters): (id: string) => boolean {
    return (id: string) => {
      let board: Board = getters[boardTypes.CURRENT_BOARD]
      let isAssignedCard: boolean = getters[types.CARD_ASSIGNED](id)
      return false
    }
  }
}