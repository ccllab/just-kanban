import Vue from 'vue';
import vueRouter from 'vue-router';

Vue.use(vueRouter);

export default new vueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: null }
  ]
})