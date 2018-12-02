import Vue from 'vue';
import vueRouter from 'vue-router';

import WelcomeView from '../views/WelcomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import BoardRoute from './boards'
import store from '../store'
import types from '../store/auth/getters'

Vue.use(vueRouter);

const router =  new vueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: WelcomeView, meta: { needNonLogin: true }},
    { path: '/login', name:'Login', component: LoginView, meta: { needNonLogin: true }},
    { path: '/signup', name: 'SignUp', component: SignUpView, meta: { needNonLogin: true }},
    BoardRoute,
  ]
})

/**
 * 全局路由守衛
 * 頁面導向權限管理
 */
router.beforeEach((to, from, next) => {
  let isLogin: boolean = store.getters[types.IS_LOGIN]
  let needLogin: boolean = to.meta.needLogin
  let needNonLogin: boolean = to.meta.needNonLogin

  if (needLogin && !isLogin) {
    next({ name: 'Login' })
    return
  } else if (needNonLogin && isLogin) {
    next({ name: 'BoardList' })
    return
  }

  next()
})

export default router