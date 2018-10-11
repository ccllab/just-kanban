import VueRouter from 'vue-router';
import AuthHandler from '../components/AuthHandler.vue'; // typescript 小坑，從 .vue 檔案 import 要加上 .vue
import UploadForm from '../components/UploadForm.vue';
import ImageList from '../components/ImageList.vue';

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/oauth2/callback', component: AuthHandler },
        { path: '/upload', component: UploadForm },
        { path: '/', component: ImageList }
    ]
});