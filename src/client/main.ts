import Vue from 'vue';

import store from './store'
import router from './router';
import App from './App.vue';
import VueCookies from './utils/cookies/VueCookies';
import { ApiRequestor } from './utils/ApiRequestor'
import { HttpErrorProcessor } from './api/middle-process/HttpErrorProcessor' 
import { AuthTokenProccessor } from './api/middle-process/AuthTokenProcessor'

Vue.config.productionTip = false;

/**
 * 註冊 api 中介函數
 */
ApiRequestor.addFailMiddleProcess(HttpErrorProcessor)
ApiRequestor.addSuccessMiddleProcess(AuthTokenProccessor)

Vue.use(VueCookies, {
    expires: '3d',
    path: '/'
});

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app');
