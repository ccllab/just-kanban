import { GetterTree } from 'vuex'

import { Board } from '../../models/Board.model'
import { RootState } from '../types'
import { 
  BoardState,
  BoardList,
  CardLists,
  types,
  IsAssignedCardFunc
} from './types'
import { types as authTypes } from '../auth/types'
import { User } from '../../models/User.model'
import { Card } from '../../models/Card.model';

export const getters: GetterTree<BoardState, RootState> = {
  [types.BOARD_LIST](state): BoardList {
    return state.boardList
  },

  [types.CURRENT_BOARD](state): Board {
    return state.displayedBoard
  },

  [types.IS_ADMIN](state, getters): boolean {
    let user: User = getters[authTypes.USER]
    return state.displayedBoard.admins.findIndex(u => u.userId === user.userId) !== -1
  },

  [types.CARD_LISTS](state): CardLists {
    return state.cardLists
  },

  [types.CURRENT_CARD](state): Card {
    return state.displayedCard
  },

  [types.IS_ASSIGNED_CARD](state, getters): IsAssignedCardFunc {
    return (card: Card) => {
      let user: User = getters[authTypes.USER]
      return card.assignedUser.userId === user.userId
    }
  }
}