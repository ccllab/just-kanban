import { ActionTree } from 'vuex'

import { RootState, types } from './types'


export const actions: ActionTree<RootState, null> = {
  [types.SHOW_ERROR]({ commit }, payload: { msg: string, duration: number }) {
    commit(types.SET_ERROR_MSG, payload.msg)

    if (payload.duration) {
      setTimeout(() => {
        commit(types.SET_ERROR_MSG, '')
      }, payload.duration)
    }
  }
}