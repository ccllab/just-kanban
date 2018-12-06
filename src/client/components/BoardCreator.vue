<template>
    <div id="boardCreator" @click.stop="close">
        <div class="container" @click.stop="">
            <div class="closeBtn" @click.stop="close">
                <i class="fas fa-times"></i>
            </div>
            <div class="title">
                Create Board
            </div>
            <div class="settingForm">
                <div class="boardName">
                    <input type="text" v-model="boardName" placeholder="Add board title">
                </div>
            </div>
            <div class="submitBtn">
                <button @click.stop="createClick">Create</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

import { types as BoardTypes, CreateBoardFunc } from '../store/board/types'

@Component
export default class BoardCreator extends Vue {
    @Action(BoardTypes.CREATE_FAKE_BOARD) createBoard: CreateBoardFunc

    public boardName: string = ''

    public async createClick() {
        if (!this.boardName) return
        
        let result = await this.createBoard(this.boardName)
        if (result) {
            this.$router.push({ name: 'BoardList' })
            this.close()
        }
    }

    public close(): void {
        this.$emit('close');
    }

    public beforeRouteLeave(): void {
        this.close()
    }
}
</script>

<style lang="scss" scoped>
    #boardCreator {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        left: 0;
        top: 0;
        z-index: 2;
        cursor: auto;
        color: white;
        
        .container {
            position: relative;
            right: 0;
            width: 350px;
            margin: 0 auto;
            top: 20%;
            background-image: url(/img/createBoardBkg.jpg);
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            padding: 20px 30px 30px;
        }

        .closeBtn {
            position: absolute;
            right: 0;
            top: 0;
            margin: 3px 10px;
            cursor: pointer;
        } 

        .title {
            font-size: 24px;
            font-weight: bold;
        }

        .settingForm {
            .boardName {
                margin-top: 5px;

                input:hover {
                    background-color: rgba(255, 255, 255, 0.7); 
                }
            }

            input {
                width: 100%;
                padding: 7px 10px;
                font-weight: bold;
            }
        }

        .submitBtn {
            position: absolute;
            bottom: -3px;
            right: 0;
            transform: translateY(100%);

            button {
                background-color: #2A92BF;
                padding: 5px 10px;
                color: white;
                font-weight: bold;
                border-radius: 3px;
                cursor: pointer;
            }
        }
    }
</style>


