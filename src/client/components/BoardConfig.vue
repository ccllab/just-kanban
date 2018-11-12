<template>
    <div id="boardConfig" @click="close">
        <div class="container" @click.stop="">
            <div class="title">
                <i class="icon far fa-clipboard"></i>
                <input type="text" placeholder="Add title for this board..." :value="boardId">   
            </div>
            <div class="boardManager">
                <i class="icon fas fa-user-edit"></i>
                <div class="wrapper">
                    <div class="wrapperTitle">
                        Board Manager
                    </div>
                    <div class="managerList">
                        <div class="manager">Creator </div>
                        <div class="manager">Someone <i class="fas fa-times"></i></div>
                    </div>
                </div>
            </div>    
            <div class="boardMembers">
                <i class="icon fas fa-users"></i>
                <div class="wrapper">
                    <div class="wrapperTitle">
                        Board Member
                    </div>
                    <div class="memberList">
                        <div class="member">You <i class="fas fa-edit"></i></div>
                        <div class="member">Others <i class="fas fa-edit"></i></div>
                        <div class="member">Others <i class="fas fa-edit"></i></div>
                        <div class="member">Others <i class="fas fa-edit"></i></div>
                        <div class="member">Others <i class="fas fa-edit"></i></div>
                        <div class="member">Others <i class="fas fa-edit"></i></div>
                        <div class="member">Others <i class="fas fa-edit"></i></div>
                        <div class="member">Others <i class="fas fa-edit"></i></div>
                        <div class="member">Others <i class="fas fa-edit"></i></div>
                        <div class="member">Others <i class="fas fa-edit"></i></div>
                        <div class="member">Others <i class="fas fa-edit"></i></div>
                        <div class="member">Others <i class="fas fa-edit"></i></div>
                        <div class="member">Others <i class="fas fa-edit"></i></div>
                        <div class="member">Others <i class="fas fa-edit"></i></div>
                        <div class="member">Others <i class="fas fa-edit"></i></div>
                        <div class="member">Others <i class="fas fa-edit"></i></div>
                    </div>
                    <div class="search">
                        <input type="text" placeholder="Enter New member id...">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class BoardConfig extends Vue {
    @Prop(String) boardId: string

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
                    cursor: pointer;

                    i {
                        float: right;
                        top: 3px;
                        position: relative;
                    }

                    &:hover {
                        background-color: #2A92BF;
                        color: white;
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


