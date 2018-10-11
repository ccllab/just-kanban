import Vue from 'vue';
import Vuex, {StoreOptions} from "vuex";
import {IRootState} from "./types";
import AuthModule from './modules/auth/AuthModule';
import ImagesModule from "./modules/images/ImagesModule";

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
    state: {
        version: '1.0.0'
    },
    modules: {
        authModule: new AuthModule(),
        imagesModule: new ImagesModule()
    }
};

export default new Vuex.Store<IRootState>(store);