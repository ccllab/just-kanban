import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import AuthModule from "./auth/AuthModule";
import BoardModule from "./board/BoardModule";
import ErrorModule from "./error/ErrorModule";
import NotificationMessageModule from "./socket/NotificationMessageModule";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {},
  modules: {
    authModule: new AuthModule(),
    boardModule: new BoardModule(),
    errorModule: new ErrorModule(),
    messageModule: new NotificationMessageModule()
  },
  strict: true
};

export default new Vuex.Store<RootState>(store);
