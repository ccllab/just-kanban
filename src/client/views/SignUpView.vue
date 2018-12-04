<template>
    <div id="signUpView">
        <div class="container">
            <div class="signUpForm">
                <div class="title">
                Sign Up
                </div>
                <div class="inputList">
                    <div class="inputItem">
                        <input type="text" placeholder="ID" v-model="userId">
                    </div>
                    <div class="inputItem">
                        <input type="text" placeholder="Name" v-model="username">
                    </div>
                    <div class="inputItem">
                        <input type="email" placeholder="Email" v-model="email">
                    </div>
                    <div class="inputItem">
                        <input type="password" placeholder="Password" v-model="password">
                    </div>
                    <div class="inputItem">
                        <input type="password" placeholder="Password Confirm" v-model="confirm">
                    </div>
                </div>
                <div class="submitBtn">
                    <button @click.stop="signupClick">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class'

@Component
export default class LoginView extends Vue {
    public userId: string = ''
    public username: string = ''
    public email: string = ''
    public password: string = ''
    public confirm: string = ''

    public signupClick() {

    }
}
</script>

<style lang="scss" scoped>
    #signUpView {
        display: flex;
        justify-content: center;
        align-items: center;

        .container {
            min-width: 250px;
            padding: 20px;
            background-color: white;
            box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.3);

            .title {
                font-weight: bold;
                font-size: 32px;
                margin-bottom: 10px;
            }

            .inputItem {
                + .inputItem {
                    margin-top: 10px;
                }

                input{
                    width: 100%;
                    padding: 5px 10px;
                    border: 1px solid #2A92BF;
                }
            }

            .submitBtn {
                margin-top: 10px;

                button {
                    width: 100%;
                    padding: 5px;
                    font-weight: bold;
                    background-color: #2A92BF;
                    color: white;
                    border: 0;
                    cursor: pointer;
                }
            }
        }
    }
</style>


