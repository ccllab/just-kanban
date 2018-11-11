import Vue from 'vue';
import vueRouter from 'vue-router';

import WelcomeView from '../views/WelcomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import BoardRoute from './boards'

Vue.use(vueRouter);

export default new vueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: WelcomeView },
    { path: '/login', name:'Login', component: LoginView },
    { path: '/signup', name:'SignUp', component: SignUpView },
    BoardRoute,
  ]
})