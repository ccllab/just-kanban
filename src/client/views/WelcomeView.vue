<template>
    <div id="welcomeView">
        <div class="container">
            <div class="wallText">
                Just Kanban
            </div>
            <div class="Links">
                <router-link class="login" :to="{name: 'Login'}">Login</router-link>
                <router-link class="signup" :to="{name: 'SignUp'}">Sign Up</router-link>
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

        .Links {
            text-align: center;
            margin-top: 20px;

            a {
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.6);
                padding: 15px 30px;
                color: white;
                font-weight: bold;
                border-radius: 10px;
                transition: 300ms;
                display: inline-block;

                &.login {
                    background-color: #5aac44;
                }

                &.signup {
                    margin-left: 10px;
                    background-color: #FB7D44;
                }

                &:hover {
                    transform: translateY(5px);
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
                }
            }
        }
    }
</style>


