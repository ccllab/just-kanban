<template>
    <div id="welcomeView">
        <div class="container">
            <div class="wallText">
                Just Kanban
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class WelcomeVuew extends Vue {

    }
</script>

<style lang="scss">
    #welcomeView {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .container {
            width: 100%;
            padding: 0 30px;
        }

        .wallText {
            background-color: white;
            text-align: center;
            font-size: 42px;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.6);
            font-family: 'Spicy Rice', cursive;
            max-width: 400px;
            margin: 0 auto;
        }
    }
</style>


