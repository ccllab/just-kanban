<template>
    <div id="boardConfig" @click="close">
        <div class="container" @click.stop="" v-if="copyedBoard">
            <div class="title">
                <i class="icon far fa-clipboard"></i>
                <input 
                    type="text" 
                    placeholder="Add title for this board..." 
                    v-model="copyedBoard.boardName">   
            </div>
            <div class="boardManager">
                <i class="icon fas fa-user-edit"></i>
                <div class="wrapper">
                    <div class="wrapperTitle">
                        Board Manager
                    </div>
                    <div class="managerList">
                        <div class="manager" v-for="adminUser in copyedBoard.admins" :key="adminUser.userId">
                            {{ adminUser.username }} <i class="fas fa-times" @click.stop="deleteAdmin(adminUser.userId)"></i>
                        </div>
                    </div>
                </div>
            </div>    
            <div class="boardMembers">
                <i class="icon fas fa-users"></i>
                <div class="wrapper">
                    <div class="wrapperTitle">
                        Board Member
                    </div>
                    <div class="memberList" v-if="copyedBoard.members.length">
                        <div class="member" v-for="member in copyedBoard.members" :key="member._id">
                            {{ member.username }} 
                            <div class="memEditBlk">
                                <label :for="member.userId"><i class="fas fa-edit"></i></label>
                                <input class="memEditBtn" type="checkbox" :id="member.userId">
                                <div class="memCtrlBtns">
                                    <div class="setAdmin" @click.stop="addAdmin(member.userId)"><i class="fas fa-user-plus"></i></div>
                                    <div class="deleteMem" @click.stop="deleteMember(member.userId)"><i class="fas fa-user-times"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="search">
                        <input type="text" placeholder="Enter New member id...">
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-primary update-btn" v-if="isEdited" @click="updateClick"> Update </button>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class'
import * as _ from 'lodash'

import { Board } from '../models/Board.model';
import { 
    types as boardTypes, 
    GetBoardInfoFunc, 
    UpdateBoardFunc 
} from '../store/board/types'

@Component
export default class BoardConfig extends Vue {
    @Action(boardTypes.GET_FAKE_BOARD_INFO) getBoardInfo: GetBoardInfoFunc
    @Action(boardTypes.UPDATE_BOARD) updataboard: UpdateBoardFunc
    @Getter(boardTypes.CURRENT_BOARD) board: Board
    @Prop(String) boardId: string

    /**
     * 暫存介面上 board 更新之內容
     */
    public copyedBoard: Board = null

    /**
     * 指示有無更新過內容
     */
    get isEdited(): boolean {
        if (!this.copyedBoard || !this.board)
            return false

        return !_.isEqual(this.copyedBoard, this.board)
    }

    public async  mounted() {
        await this.getBoardInfo(this.boardId)
        this.copyedBoard = _.cloneDeep(this.board)
    }

    public deleteAdmin(userId: string) {
        let index = this.copyedBoard.admins.findIndex(user => user.userId === userId)
        if (index !== -1) {
            this.copyedBoard.admins.splice(index, 1)
        }
    }

    public addAdmin(userId: string) {
        let isExist = this.copyedBoard.admins.findIndex(user => user.userId === userId) !== -1
        if (isExist) return

        let user = this.copyedBoard.members.find(user => user.userId === userId)
        if (!user) return

        this.copyedBoard.admins.push(user)
    }

    public deleteMember(userId: string) {
        this.deleteAdmin(userId)
        let index = this.copyedBoard.members.findIndex(user => user.userId === userId)
        if (index !== -1) {
            this.copyedBoard.members.splice(index, 1)
        }
    }

    public async updateClick() {
        let result = await this.updataboard(this.copyedBoard)
        console.log(result)
        if (!result) {
            this.copyedBoard = _.cloneDeep(this.board)
            console.log(1)
        }
    }

    public close(): void {
        this.$router.push({name: 'Board', params: {boardId: this.boardId}})
    }
}
</script>

<style lang="scss" scoped>
    #boardConfig {
        position: fixed;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.8);
        width: 100vw;
        height: 100vh;

        .container {
            max-width: 500px;
            margin: 0 auto;
            background-color: #ebeef0;
            padding: 20px;
            margin-top: 50px;
            color: #17394d;
            position: relative;
        }

        .title {
            display: flex;
            align-items: center;

            .icon {
                margin-right: 10px;
            }

            input {
                font-size: 26px;
                font-weight: bold;
                flex-grow: 1;
            }
        }

        .boardManager,
        .boardMembers {
            display: flex;
            margin-top: 20px;

            .icon {
                margin-top: 5px;
                transform: translateX(-2px);
            }

            .wrapper {
                width: 100%;
            }

            .wrapperTitle {
                font-weight: bold;
                font-size: 20px;
            }
        }

        .boardManager {
            .managerList {
                display: flex;
                flex-flow: wrap;
                margin-top: 5px;
            }

            .manager {
                padding: 2px 30px 2px 10px;
                margin-right: 10px;
                background-color: white;
                border-radius: 6px;
                box-shadow: 0px 1px 11px rgba(0, 0, 0, 0.3);
                position: relative;
                cursor: default;
                font-weight: bold;

                i {
                    position: absolute;
                    right: 8px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                }
            }
        }

        .boardMembers {
            .icon {
                transform: translateX(-5px);
            }

            .memberList {
                background: white;
                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
                margin-top: 5px;
                padding: 10px 0;
                max-height: 290px;
                overflow-y: scroll;

                .member {
                    padding: 5px 10px;
                    font-weight: bold;

                    .memEditBlk {
                        float: right;
                        display: flex;
                        

                        input {
                            display: none;
                        }

                        .memCtrlBtns {
                            display: flex;
                            margin-right: -60px;
                            transition: 300ms;

                            .setAdmin,
                            .deleteMem {
                                margin-left: 5px;
                                cursor: pointer;
                            }

                            .setAdmin:hover {
                                color: #28a745;
                            }

                            .deleteMem:hover {
                                color: #dc3545;
                            }
                        }

                        input:checked + .memCtrlBtns {
                            margin-right: 0;
                        }
                    }

                    label {
                        margin: 0;
                        margin-right: 10px;
                        cursor: pointer;
                    }

                    i {
                        float: right;
                        top: 3px;
                        position: relative;
                    }
                }
            }

            .search {
                margin-top: 10px;

                input {
                    padding: 10px;
                    width: 100%;
                    background-color: white;
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
                    font-weight: bold;
                }
            }
        }

        .update-btn {
            position: absolute;
            right: 0;
            bottom: 0;
            transform: translate(0, calc(100% + 5px));
        }

        .icon {
            font-size: 22px;
            width: 22px;
            margin-right: 10px;
        }

        input {
            background-color: #ebeef0;
            color: #17394d;
        }
    }
</style>


