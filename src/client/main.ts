import * as io from 'socket.io-client';
import Vue from 'vue';
import store from './store';
import router from './router';
import App from './App.vue';
import VueSocketio from 'vue-socket.io-extended';
import VueCookies from './utils/VueCookies';
import { ApiRequestor } from './utils/ApiRequestor';
import { HttpErrorProcessor, AuthTokenProccessor } from './api/middle-process' ;
import { Token, TokenManager } from './utils/TokenManager';
import { TokenConfig } from './config';

Vue.config.productionTip = false;
Vue.use(VueSocketio, io(process.env.SERVER_HOST_URL), {store});
Vue.use(VueCookies, {
    expires: '3d',
    path: '/'
});

/**
 * 註冊 api 中介函數
 */
ApiRequestor.addFailMiddleProcess(HttpErrorProcessor);
ApiRequestor.addSuccessMiddleProcess(AuthTokenProccessor);

/**
 * 初始化 Token 管理者
 */
let authToken: Token = {
    tokenName: TokenConfig.auth.key,
    aliasName: TokenConfig.auth.alias
};
let refreshToken: Token = {
    tokenName: TokenConfig.refresh.key,
    aliasName: TokenConfig.refresh.alias
};
TokenManager.register(authToken, refreshToken);
TokenManager.setDefaultStorage(VueCookies.getInstance());

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app');


