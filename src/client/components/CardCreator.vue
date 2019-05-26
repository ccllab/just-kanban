<template>
    <div id="cardCreator" @click="close">
        <div class="container" @click.stop="" v-if="board">
            <div class="title">
                <i class="icon far fa-credit-card"></i>
                <input type="text" placeholder="Add title for this card..." v-model="title">   
            </div>
            <div class="content">
                <div class="left">
                    <div class="describe">
                        <i class="icon fas fa-align-left"></i>
                        <div class="wrapper">
                            <div class="wrapperTitle">Description</div>
                            <textarea type="text" v-model="description" placeholder="Add a more detailed description..."></textarea>
                        </div>
                    </div>
                </div>
                <div class="right">
					<div class="assign-member-block">
						<div class="assign-member-title">
							<i class="fas fa-user-plus"></i>
							Assign Member
						</div>
						<div class="members">
							<label class="member" 
								:id="`member-${member.userId}`"
								v-for="member in board.members"
								:key="member.userId">
								<input type="radio" 
									name="assignedUser" 
									:value="member.userId" 
									v-model="assignedUserId"
									:for="`member-${member.userId}`">
								<div class="member-name">
									{{ member.username.slice(0, 2).toUpperCase()}}
								</div>
							</label>
						</div>
					</div>
                </div>
            </div>
			<button class="btn btn-primary btn-save" @click.stop="btnSaveClick">Save</button>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { Board } from '../models/Board.model';
import { userId } from '../models/User.model';
import { types as boardTypes, CreateCardFunc } from '../store/board/types';

@Component
export default class CardEditor extends Vue {
	@Getter(boardTypes.CURRENT_BOARD) board: Board;
	@Action(boardTypes.CREATE_CARD) createCard: CreateCardFunc;
	@Prop() listId: string;

	public assignedUserId: userId = '';
	public title: string = '';
	public description: string = '';
	
	public async btnSaveClick(): Promise<void> {
		// 至少 title 不可空白
		if (!this.title) return;

		let { listId, title, description, assignedUserId } = this;
		let result = await this.createCard({
			listId,
			title,
			description,
			assignedUserId
        });
        if (result) this.close();
	}

    public close(): void {
        this.$router.push({ name: 'Board', params: { boardId: this.board._id }});
    }
}
</script>

<style lang="scss" scoped>
    #cardCreator {
        position: fixed;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.8);
        width: 100vw;
        height: 100vh;

        .container {
            max-width: 650px;
            margin: 0 auto;
            background-color: #ebeef0;
            padding: 20px;
            margin-top: 50px;
			color: #17394d;
			position: relative;
        }

		.btn-save {
			position: absolute;
			right: 0;
			bottom: 0;
			transform: translateY(calc(100% + 5px));
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
                width: 165px;
                padding-left: 20px;
                margin-top: 20px;

                .assign-member-block {
					.assign-member-title {
						font-weight: bold;
					}
				}
            }
        }

        .describe {
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

        .members {
            display: flex;
			margin-top: 10px;
			flex-wrap: wrap;

            .member-name {
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
                cursor: pointer;
			}
			
			input[type=radio] {
				display: none;

				&:checked + .member-name {
					box-shadow: 1px 1px 10px rgba(0, 0, 0, 1);
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


