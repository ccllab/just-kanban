import Vue from 'vue';
import App from './App.vue';
import VueCookies from './utils/cookies/VueCookies';

Vue.config.productionTip = false;

Vue.use(VueCookies, {
    expires: '3d',
    path: '/'
});

new Vue({
    render: h => h(App)
}).$mount('#app');
