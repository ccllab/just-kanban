import {ActionTree, Commit, GetterTree, Module, MutationTree} from "vuex";
import {IAuthState} from "./types";
import {IRootState} from "../../types";
import ImgurApiHelper from "../../../api/ImgurApiHelper";
import {parse} from "qs";
import router from "../../../routers/router";

/**
 * imgur oauth2 登入驗證模組
 */
export default class AuthModule implements Module<IAuthState, IRootState> {

    /**
     * 驗證狀態模型
     */
    public state: IAuthState = {
        token: window.localStorage.getItem('imgur_token')
    };

    /**
     * 取得指定狀態資料
     */
    public getters: GetterTree<IAuthState, IRootState> = {

        /**
         * 檢查是否登入
         * @param state 驗證狀態
         * @return 是否登入
         */
        isLoggedIn(state: IAuthState): boolean {
            return !!state.token;
        }
    };

    /**
     * 模組動作
     */
    public actions: ActionTree<IAuthState, IRootState> = {

        /**
         * 登入
         */
        login(): void {
            ImgurApiHelper.login();
        },

        /**
         * 完成登入
         * @param context 模組的上下文
         * @param hash url 的 hash
         */
        finalizeLogin(context: { commit: Commit, rootState: IRootState | any }, hash: string): void {
            const queryObject = parse(hash.replace('#', ''));

            context.commit('setToken', queryObject.access_token);
            window.localStorage.setItem('imgur_token', queryObject.access_token);

            // renew router
            router.push('/');
        },

        /**
         * 登出
         * @param context 模組的上下文
         */
        logout(context: { commit: Commit }): void {
            context.commit('setToken', null);

            // must clean token when logout
            window.localStorage.removeItem('imgur_token');
        }
    };

    /**
     * 狀態更新
     */
    public mutations: MutationTree<IAuthState> = {

        /**
         * 更新 token
         * @param state 驗證狀態
         * @param token oauth2 的 access token
         */
        setToken(state: IAuthState, token: string): void {
            state.token = token;
        }
    };
}