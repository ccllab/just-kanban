<template>
    <div class="ui secondary pointing menu">
        <a href="/" class="active item">
            Image Uploader
        </a>
        <div class="right menu">
            <div v-if="isLoggedIn" class="horizontal">
                <router-link to="/" class="item">Galleries</router-link>
                <router-link to="/upload" class="item">Upload</router-link>
                <a class="item" href="#" @click="logout">Logout</a>
            </div>
            <a v-else href="#" class="ui item" @click="login">
                Login
            </a>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    import {Action, Getter} from 'vuex-class';

    /**
     * 頂部功能列
     */
    @Component
    export default class AppHeader extends Vue {

        /**
         * 是否登入
         */
        @Getter('isLoggedIn') public isLoggedIn: boolean;

        /**
         * 登入
         */
        @Action('login') public login;

        /**
         * 登出
         */
        @Action('logout') public logout;
    }
</script>

<style scoped>
    .horizontal {
        display: flex;
        flex-direction: row;
    }
</style>