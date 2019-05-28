import {ActionTree, GetterTree, Module, MutationTree} from "vuex";
import {MessageState, types} from "./types";
import {RootState} from "../types";

export default class NotificationMessageModule implements Module<MessageState, RootState> {

    public state: MessageState = {
        message: ''
    };

    public getters: GetterTree<MessageState, RootState> = {
        [types.MESSAGES](state) {
            return state.message;
        }
    };

    public actions: ActionTree<MessageState, RootState> = {
        socket_notificationMessage({commit}, payload: { message: string, duration: number }) {
            commit(types.SET_MESSAGE, payload.message);

            if (payload.duration) {
                setTimeout(() => {
                    commit(types.SET_MESSAGE, '');
                }, payload.duration);
            }
        }
    };

    public mutations: MutationTree<MessageState> = {
        SOCKET_NOTIFICATION_MESSAGE(state, message: string) {
            state.message = message;
        }
    };
}