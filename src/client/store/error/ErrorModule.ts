import {ActionTree, GetterTree, Module, MutationTree} from "vuex";
import {RootState} from "../types";
import {types} from './types';
import {ErrorState} from "./types";

export default class ErrorModule implements Module<RootState, ErrorState> {

    public namespaced = false;

    public state: ErrorState = {
        error: ""
    };

    public getters: GetterTree<ErrorState, RootState> = {
        [types.ERROR](state) {
            return state.error;
        }
    };

    public actions: ActionTree<ErrorState, RootState> = {
        [types.SHOW_ERROR]({commit}, payload: { msg: string, duration: number }) {
            commit(types.SET_ERROR_MSG, payload.msg);

            if (payload.duration) {
                setTimeout(() => {
                    commit(types.SET_ERROR_MSG, '');
                }, payload.duration);
            }
        }
    };

    public mutations: MutationTree<ErrorState> = {
        [types.SET_ERROR_MSG](state, payload: string) {
            state.error = payload;
        }
    };
}