<template>
    <div id="kanbanBoard" v-if="board">
        <div class="boardHeader">
            <div class="boardName">{{ board.boardName }}</div>
            <router-link :to="{name: 'BoardConfig'}" class="config" v-if="isAdmin">
                <i class="fas fa-cog"></i>
            </router-link>
            <div class="memberList" >
                <div class="member" 
                    v-for="member in board.members" 
                    :key="member._id">
                    {{ member.username.slice(0, 2).toUpperCase() }}    
                </div>
            </div>
        </div>
        <div class="drag-container">
            <div class="drag-list">
                <div class="drag-column" 
                    :class="{['drag-column-' + index]: true}"
                    v-for="(list, index) in cardLists"
                    :key="list._id">
                    <span class="drag-column-header">
                        <h2>
                            <input class="stageName" type="text" :value="list.name" placeholder="Enter stage title...">
                            <router-link class="newCard" 
                                :to="{name: 'NewCard', params: { listId: list._id }}" 
                                v-if="isAdmin">+</router-link>
                        </h2>
                    </span>
                    <ul class="drag-inner-list" 
                        ref="list" 
                        :data-status="list.name" 
                        :data-list-id="list._id">
                        <router-link 
                            tag="li" 
                            class="drag-item" 
                            v-for="card in list.cards" 
                            :data-card-id="card._id"
                            :data-is-assigned="isAssignedCard(card)"
                            :key="card._id" 
                            :to="{name: 'CardEdit', params: { listId: list._id, cardId: card._id}}">
                            <BoardCard :card="card"></BoardCard>
                        </router-link>
                    </ul>
                </div>
                <CardListCreator />
            </div>
        </div>
        <router-view />
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import * as Dragula from 'dragula';
    import {debounce} from 'lodash';
    import { Getter, Action } from 'vuex-class'

    import BoardCard from './BoardCard.vue';
    import CardListCreator from './CardListCreator.vue'
    import { Board } from '../models/Board.model'
    import { Card } from '../models/Card.model'
    import { User } from '../models/User.model'
    import { types as authTypes } from '../store/auth/types'
    import { 
        types as boardTypes, 
        GetBoardInfoFunc, 
        GetCardListsFunc, 
        IsAssignedCardFunc,
        DragCardFunc,
        CardLists
    } from '../store/board/types'

    /**
     * The KanbanBoard
     */
    @Component({
        components: {
            BoardCard,
            CardListCreator
        }
    })
    export default class KanbanBoard extends Vue {
        @Getter(boardTypes.CURRENT_BOARD) board: Board
        @Getter(authTypes.USER) user: User
        @Getter(boardTypes.IS_ADMIN) isAdmin: boolean
        @Getter(boardTypes.CARD_LISTS) cardLists: CardLists
        @Getter(boardTypes.IS_ASSIGNED_CARD) isAssignedCard: IsAssignedCardFunc
        @Action(boardTypes.GET_BOARD_INFO) getBoardInfo: GetBoardInfoFunc
        @Action(boardTypes.GET_CARD_LISTS) getCardLists: GetCardListsFunc
        @Action(boardTypes.DRAG_CARD) dragCard: DragCardFunc
        @Prop(String) boardId: string

        public async mounted() {
            let p1 = this.getBoardInfo(this.boardId)
            let p2 = this.getCardLists(this.boardId)
            await Promise.all([p1, p2])
            this.dragulaInit()
        }

        /**
         * Create Dragula instance and bind events when mounted.
         */
        public dragulaInit() {
            // buffer of storing source list id of moving card
            let srcListId: string = ''
            let boardId = this.boardId

            // create Dragula instance
            let drag: Dragula.Drake = Dragula({
                containers: (this.$refs.list) as Element[],
                moves: (el: any, source: any, handle, sibling) => {
                    srcListId = source.dataset.listId
                    let isAssigned: boolean = el.dataset.isAssigned
                    if (this.isAdmin || isAssigned) {
                        return true
                    } else {
                        return false
                    }
                }
             });

            // bind drag event
            drag.on('drag', (el) => {
                el.classList.add('is-moving');
            });

            // bind drop event
            drag.on('drop', async (card, list) => {
                let dstIndex = 0;
                let dstListId: string = list.dataset.listId
                let cardId: string = card.dataset.cardId

                for (dstIndex = 0; dstIndex < list.children.length; dstIndex++) {
                    if (list.children[dstIndex].classList.contains('is-moving')) {
                        break;
                    }
                }

                this.dragCard({ srcListId, dstListId, cardId, dstIndex })
            });

            // bind dragend event
            drag.on('dragend', (el) => {
                el.classList.remove('is-moving');

                window.setTimeout(() => {
                    el.classList.add('is-moved');

                    window.setTimeout(() => {
                        el.classList.remove('is-moved');
                    }, 600);
                }, 100);
            });
        }
    }
</script>

<style lang="scss">
    @import '../assets/kanban.scss';

    #kanbanBoard {
        height: 100%;
        display: flex;
        flex-direction: column;
        
        .boardHeader {
            display: flex;
            align-items: center;
            max-width: 980px;
            width: 100%;
            margin: 0 auto 10px;

            .boardName {
                font-weight: bold;
                font-size: 28px;
                margin-right: 2px;
            }

            .config {
                width: 28px;
                height: 28px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgba(0, 0, 0, 0.4);
                color: white;
                border-radius: 5px;
                margin-left: 10px;
                cursor: pointer;

                &:hover {
                    background-color: rgba(0, 0, 0, 0.6);
                }
            }

            .memberList {
                display: flex;
                align-items: center;
                margin-left: 10px;

                .member {
                    width: 26px;
                    height: 26px;
                    font-size: 12px;
                    font-weight: bold;
                    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
                    border-radius: 50%;
                    background-color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 10px;
                    cursor: default;

                    &.add {
                        background-color: rgba(255, 255, 255, 0.5);
                        cursor: pointer;
                        transition: 200ms;

                        &:hover {
                            background-color: white;
                        }
                    }
                }
            }
        }

        .createCard {
            background-color: #dfe3e6;
            padding: 5px;

            input {
                width: 100%;
                box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.2);
                padding: 10px 5px;
            }

            button {
                background-color: #5aac44;
                box-shadow: 0 2px 4px #3f6f21;
                color: white;
                font-weight: bold;
                padding: 5px;
                margin: 5px 0;
                border-radius: 5px;
                cursor: pointer;
            }
        }
    }
</style>

