import Vue from 'vue';
import store from './store'
import router from './router';
import App from './App.vue';
import VueCookies from './utils/cookies/VueCookies';
import { ApiRequestor } from './api'

Vue.config.productionTip = false;

ApiRequestor.addFailMiddleProcess((res) => {
    console.log(res.response.status)
})

Vue.use(VueCookies, {
    expires: '3d',
    path: '/'
});

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app');
