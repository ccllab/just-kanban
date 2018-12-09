<template>
    <div id="boardList">
        <div class="container">
            <div class="title">
                Board List
            </div>
            <div class="list">
                <router-link class="item" v-for="board in boardList" :key="board._id" tag="div" :to="{name:'Board', params: {boardId: board._id}}">
                    <div class="boardTitle">{{board.boardName}}</div>
                    <div class="permissionIcon">
                        <i class="fas fa-user-edit" v-if="board.isAdmin"></i>
                    </div>
                </router-link>
                <div class="item addBoard" @click.stop="showBoardCreator = true">
                    Create Board
                </div>
            </div>
            <BoardCreator v-if="showBoardCreator" @close="showBoardCreator = false" />
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class'

import { Board } from '../models/Board.model'
import BoardCreator from './BoardCreator.vue'
import { 
    types as BoardTypes, 
    GetBoardListFunc,
    BoardList as BoardListType 
} from '../store/board/types'

@Component({
    components: {
        BoardCreator
    }
})
export default class BoardList extends Vue {
    @Getter(BoardTypes.BOARD_LIST) boardList: BoardListType
    @Action(BoardTypes.GET_BOARD_LIST) getBoardList: GetBoardListFunc

    public showBoardCreator: boolean = false;
    
    public mounted() {
        this.getBoardList()
    }
}
</script>

<style lang="scss" scoped>
    #boardList {
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .title {
            font-weight: bold;
            font-size: 32px;
            margin-bottom: 10px;
        }

        .list {
            display: flex;
            flex-flow: wrap;
            position: relative;
        }

        .item {
            width: 250px;
            min-height: 120px;
            padding: 5px 10px;
            background-color: white;
            box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.3);
            border-radius: 5px;
            cursor: pointer;
            margin: 0 20px 20px 0;
            transition: 600ms ease;
            background-image: url(/img/createBoardBkg.jpg);
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            color: white;
            font-weight: bold;
            font-size: 22px;
            position: relative;
            
            &:hover {
                transform: scale(1.1);
            }

            .permissionIcon {
                position: absolute;
                bottom: 0;
                right: 0;
                margin: 0 10px 5px 0;
            }

            &.addBoard {
                background-image: none;
                background-color: rgba(9, 45, 66, .4);
                justify-content: center;
                display: flex;
                align-items: center;
                    
                &:hover {
                    background-color: rgba(9, 45, 66, .6);
                    transform: none;
                }
            }
        }
    }
</style>


