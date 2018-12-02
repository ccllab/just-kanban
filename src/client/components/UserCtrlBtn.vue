<template>
    <div id="userCtrlBtn">
        <div class="container" @click="iconBtnClick">
            <div class="iconBtn">
                    <span>K</span>
            </div>
            <div class="list" v-if="showMenu">
                <router-link :to="{name: 'Login'}" v-if="!isLogin">
                    <div class="item">
                        <i class="fas fa-user"></i>
                        Login
                    </div>
                </router-link>
                <router-link :to="{name: 'SignUp'}" v-if="!isLogin">
                    <div class="item">
                        <i class="fas fa-book-reader"></i>
                        Sign Up
                    </div>
                </router-link>
                <div class="item" v-if="isLogin">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import { Getter } from 'vuex-class'

import types from '../store/auth/getters'

@Component
export default class UserCtrlBtn extends Vue {
    @Getter(types.IS_LOGIN) isLogin: boolean

    public showMenu: boolean = false;
    public isClicked: boolean = false;

    public created(): void {
        document.addEventListener('click', this.documentClick);
    }

    public iconBtnClick():void {
        this.showMenu = !this.showMenu;
        this.isClicked = true;
    }

    public documentClick(): void {
        this.isClicked || (this.showMenu = false);
        this.isClicked = false;
    }
}
</script>

<style lang="scss" scoped>
#userCtrlBtn {
    display: inline-block;
    cursor: pointer;
    position: relative;
    -webkit-user-select: none;

    .container {
        position: relative;

        .iconBtn {
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 1);
            color: black;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
        }

        .list {
            position: absolute;
            background-color: white;
            color: black;
            font-size: 14px;
            z-index: 1;
            margin-top: 5px;
            padding: 4px 0;
            width: 100px;
            right: 0;
            box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.3);
            border-radius: 4px;

            .item {
                padding: 4px 10px;
                cursor: pointer;

                &:hover {
                    background-color: #2A92BF;
                    color: white;
                }

                .fas {
                    margin-right: 5px;
                    width: 12px;
                }
            }
        }
    }
}
</style>


