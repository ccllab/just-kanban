import { GetterTree } from 'vuex'

import { RootState, types } from './types'

export const getters: GetterTree<RootState, null> = {
  [types.ERROR](state) {
    return state.error
  }
}