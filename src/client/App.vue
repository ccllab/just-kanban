<template>
    <div id="app">
        <ErrorHintBlock />
        <NavHeader class="navHeader"/>
        <router-view class="viewContainer"/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    
    import NavHeader from './components/NavHeader.vue';
    import ErrorHintBlock from './components/ErrorHintBlock.vue'

    /**
     * Vue app
     */
    @Component({
        components: {
            NavHeader,
            ErrorHintBlock
        },
    })
    export default class App extends Vue {
        /**
         * Set up config after creat App
         */
        public created(): void {
            this.$cookies.set('vue-cookie-test', 'fuckyouass');
        }
    }
</script>

<style lang="scss">
    * {
        box-sizing: border-box;
    }

    a {
        text-decoration: none!important;
        color: #17394d;
    }

    input,
    button {
        outline: none;
        border: 0;
    }

    body {
        color: #17394d;
        background: #33363D;
        line-height: 1.5;
        margin: 0;
        -webkit-font-smoothing: antialiased;
        background-image: url(/img/bkgImg.jpg);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        height: 100vh;
        font-family: Helvetica Neue,Arial,Helvetica,sans-serif;
        overflow: hidden;
    }

    #app {
        display: flex;
        height: 100%;
        flex-direction: column;

        .viewContainer {
            flex-grow: 1;
            height: 100%;
            overflow: hidden;
        }
    }

    .container {
        width: auto;
        max-width: none;
    }

    .btn {
        font-weight: bold;
        background-color: #2A92BF;
    }
</style>
