import Vue from 'vue';

import store from './store'
import router from './router';
import App from './App.vue';
import VueCookies from './utils/cookies/VueCookies';
import { ApiRequestor } from './utils/ApiRequestor'
import { HttpErrorProcessor, AuthTokenProccessor } from './api/middle-process' 
import { Token, TokenManager } from './utils/TokenManager'
import { TokenConfig } from './config'

Vue.config.productionTip = false;

Vue.use(VueCookies, {
    expires: '3d',
    path: '/'
});

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app');

/**
 * 註冊 api 中介函數
 */
ApiRequestor.addFailMiddleProcess(HttpErrorProcessor)
ApiRequestor.addSuccessMiddleProcess(AuthTokenProccessor)

/**
 * 初始化 Token 管理者
 */
let authToken: Token = {
    tokenName: TokenConfig.auth.key,
    aliasName: TokenConfig.auth.alias
}
let refreshToken: Token = {
    tokenName: TokenConfig.refresh.key,
    aliasName: TokenConfig.refresh.alias
}
TokenManager.register(authToken, refreshToken)
TokenManager.setDefaultStorage(VueCookies.getInstance())