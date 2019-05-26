import { MutationTree } from 'vuex'

import {
  RootState,
  types
} from './types'

export const mutations: MutationTree<RootState> = {
  [types.SET_ERROR_MSG](state, payload: string) {
    state.error = payload
  }
}