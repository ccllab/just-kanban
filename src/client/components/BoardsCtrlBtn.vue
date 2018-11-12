<template>
    <div id="boardsCtrlBtn">
        <div class="container" @click="iconBtnClick">
            <div class="iconBtn">
                    <i class="fas fa-bars"></i>
            </div>
            <div class="list" v-if="showMenu">
                    <router-link :to="{ name: 'BoardList' }">
                        <div class="item">
                            <i class="fas fa-list"></i>
                            Board List
                        </div>
                    </router-link>
                    <div class="item" @click="createBoardClick">
                        <i class="fas fa-plus"></i>
                        Create Board
                    </div>
            </div>
        </div>
        <BoardCreator v-if="showBoardCreator" @close="showBoardCreator = false"/>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import BoardCreator from './BoardCreator.vue';

@Component({
    components: {
        BoardCreator
    }
})
export default class BoardsCtrlBtn extends Vue {
    public showMenu: boolean = false;
    public isClicked: boolean = false;
    public showBoardCreator: boolean = false;

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

    public createBoardClick(): void {
        this.showBoardCreator = true;
    }
}
</script>

<style lang="scss" scoped>
#boardsCtrlBtn {
    display: inline-block;
    position: relative;
    -webkit-user-select: none;
    cursor: pointer;
    
    .container {
        padding: 5px 10px;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.3);
        position: relative;

        .list {
            position: absolute;
            background-color: white;
            color: black;
            font-size: 14px;
            z-index: 1;
            margin-top: 10px;
            padding: 4px 0;
            width: 130px;
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


