import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

import { RootState } from './types'
import { auth } from './auth'
import { boards } from './boards'
import { cards } from './cards'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  modules: {
    auth,
    boards,
    cards
  },
  strict: true
}

export default new Vuex.Store<RootState>(store)
