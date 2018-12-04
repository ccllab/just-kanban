<template>
    <div id="cardEditor" @click="close">
        <div class="container" @click.stop="">
            <div class="title">
                <i class="icon far fa-credit-card"></i>
                <input type="text" placeholder="Add title for this card...">   
            </div>
            <div class="content">
                <div class="left">
                    <div class="describe">
                        <i class="icon fas fa-align-left"></i>
                        <div class="wrapper">
                            <div class="wrapperTitle">Description</div>
                            <textarea type="text" placeholder="Add a more detailed description..."></textarea>
                            <button>Save</button>
                        </div>
                    </div>
                    <div class="comment">
                        <i class="icon far fa-comment"></i>
                        <div class="wrapper">
                            <div class="wrapperTitle">Add Comment</div>
                            <textarea type="text" placeholder="Write a Comment..."></textarea>
                            <button>Save</button>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="buttons">
                        <button><i class="fas fa-user-plus"></i>Add Member</button>
                    </div>
                    <div class="members">
                        <div class="member">K</div>
                        <div class="member">J</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import { Card } from "../models/Card.model";

@Component
export default class CardEditor extends Vue {
    @Prop(Card) card: Card
    @Prop(String) boardId: string
    @Prop(String) cardId: string

    public close(): void {
        this.$router.push({name: 'Board', params: {boardId: this.boardId}})
    }
}
</script>

<style lang="scss" scoped>
    #cardEditor {
        position: fixed;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.8);
        width: 100vw;
        height: 100vh;

        .container {
            max-width: 600px;
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

        .content {
            display: flex;

            .left {
                flex-grow: 1;
            }

            .right {
                width: 150px;
                padding-left: 20px;
                margin-top: 20px;

                .buttons {
                    
                    button {
                        width: 100%;
                        padding: 10px;
                        text-align: left;
                        box-shadow: 0 1px 0 0 #c2ccd1;
                        background-color: #dfe3e6;
                        font-weight: bold;
                        cursor: pointer;

                        i {
                            width: 22px;
                        }

                        &:hover {
                            background-color: #c2ccd1;
                            box-shadow: 0 1px 0 0 #b3bec4;
                            border: none;
                        }
                    }
                }
            }
        }

        .describe,
        .comment {
            display: flex;
            margin-top: 20px;

            .icon {
                margin-top: 5px;
                margin-right: 10px;
            }

            .wrapper {
                flex-grow: 1;
            }

            .wrapperTitle {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 5px;
            }

            textarea {
                width: 100%;
                height: 100px;
                background-color: rgba(9,45,66,.08);
                border: 0px;
                padding: 10px;
                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
                resize: none;
            }

            button {
                background-color: #2A92BF;
                padding: 5px 10px;
                color: white;
                font-weight: bold;
                border-radius: 3px;
                cursor: pointer;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            }
        }

        .describe {
            button {
                display: none;
            }

            textarea:focus + button {
                display: block;
            }
        }

        .comment textarea {
            background-color: white;
        }

        .members {
            display: flex;
            margin-top: 10px;

            .member {
                width: 26px;
                height: 26px;
                font-size: 12px;
                font-weight: bold;
                box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
                border-radius: 50%;
                background-color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 5px;
                cursor: default;
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


