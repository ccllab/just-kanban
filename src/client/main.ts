import Vue from 'vue';

import store from './store'
import router from './router';
import App from './App.vue';
import VueCookies from './utils/cookies/VueCookies';
import { ApiRequestor } from './api'
import { HttpErrorProcessor } from './api/middle-process/HttpErrorProcessor' 

Vue.config.productionTip = false;

/**
 * 註冊 api 錯誤處理函數
 */
ApiRequestor.addFailMiddleProcess(HttpErrorProcessor)

Vue.use(VueCookies, {
    expires: '3d',
    path: '/'
});

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app');
