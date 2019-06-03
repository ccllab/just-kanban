import {ActionTree, Commit, GetterTree, Module, MutationTree} from "vuex";
import {AuthState, LoginParameters, SignUpParameters, types} from "./types";
import {RootState} from "../types";
import {User} from "../../models/User.model";
import {AuthApi} from "../../api";
import * as _ from "lodash";
import {TokenManager} from "../../utils/TokenManager";

export default class AuthModule implements Module<AuthState, RootState> {

    public namespaced = false;

    public state: AuthState = {
        user: null,
        isAuthenticated: false
    };

    public getters: GetterTree<AuthState, RootState> = {
        [types.USER](state): User | boolean {
            return !!state.user && state.user;
        },

        [types.IS_LOGIN](state): boolean {
            return !!state.user;
        },

        [types.IS_AUTHENTICATED](state): boolean {
            return state.isAuthenticated;
        }
    };

    public actions: ActionTree<AuthState, RootState> = {
        async [types.AUTH_SIGNUP](context: { commit: Commit, rootState: RootState | any }, payload: SignUpParameters): Promise<boolean> {
            let resData = await AuthApi.signUp(payload);

            if (resData.result) {
                let user: User = _.pick(resData, ['userId', 'username', 'email']);
                context.commit(types.SET_USER, user);

                return true;
            } else {
                context.commit(types.SET_USER, null);

                return false;
            }
        },

        async [types.AUTH_LOGIN](context: { commit: Commit, rootState: RootState | any }, para: LoginParameters): Promise<boolean> {
            let resData = await AuthApi.login(para);

            if (resData.result) {
                let user: User = _.pick(resData, ['userId', 'username', 'email']);
                context.commit(types.SET_USER, user);

                return true;
            } else {
                context.commit(types.SET_USER, null);

                return false;
            }
        },

        async [types.AUTH_INIT](context: { commit: Commit, rootState: RootState | any }): Promise<void> {
            let resData = await AuthApi.getUserInfo();

            if (resData.result) {
                let user: User = _.pick(resData, ['userId', 'username', 'email']);
                context.commit(types.SET_USER, user);
            }

            context.commit(types.SET_IS_AUTHENTICATED);
        },

        [types.AUTH_LOGOUT]({ commit }): void {
            commit(types.SET_USER, null);
            TokenManager.clear();
        }
    };

    public mutations: MutationTree<AuthState> = {
        [types.SET_USER](state, payload: User): void {
            state.user = payload ? payload : null;
        },

        [types.SET_IS_AUTHENTICATED](state): void {
            state.isAuthenticated = true;
        }
    };
}