<template>
    <div>
        Please wait...
    </div>
</template>

<script lang="ts">
    import {Action} from 'vuex-class';
    import {Vue, Component} from "vue-property-decorator";

    /**
     * 登入驗證轉接
     */
    @Component
    export default class AuthHandler extends Vue {

        /**
         * 完成登入後的動作
         */
        @Action('finalizeLogin') public finalizeLogin;

        /**
         * 元件建立完成後呼叫
         */
        public created() {
            this.finalizeLogin(window.location.hash);
        }
    }
</script>