<template>
    <div id="loginView">
        <div class="container">
            <div class="loginForm">
                <div class="title">
                Login
                </div>
                <div class="inputList">
                    <div class="inputItem">
                        <input type="email" id="kanbanEmail" placeholder="Email">
                    </div>
                    <div class="inputItem">
                        <input type="password" id="kanbanPassword" placeholder="Password">
                    </div>
                </div>
                <div class="submitBtn">
                    <button>Login</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class LoginView extends Vue {

}
</script>

<style lang="scss" scoped>
    #loginView {
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
                }
            }
        }
    }
</style>


