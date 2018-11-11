<template>
    <div id="kanbanBoard">
        <div class="boardHeader">
            <div class="boardName">Board1</div>
            <router-link :to="{name: 'BoardConfig'}" class="config">
                <i class="fas fa-cog"></i>
            </router-link>
            <div class="memberList">
                <div class="member">K</div>
                <div class="member">J</div>
                <div class="member add">
                    <i class="fas fa-user-plus"></i>
                </div>
            </div>
        </div>
        <div class="drag-container">
            <div class="drag-list">
                <div v-for="stage in stages" class="drag-column" :class="{['drag-column-' + stage]: true}" :key="stage">
                    <span class="drag-column-header">
                        <h2>
                            {{ stage }}
                            <router-link class="newCard" :to="{name: 'NewCard'}">+</router-link>
                        </h2>
                    </span>
                    <div class="drag-options"></div>
                    <ul class="drag-inner-list" ref="list" :data-status="stage">
                        <router-link tag="li" class="drag-item" v-for="block in getBlocks(stage)" :data-block-id="block._id" :key="block._id" :to="{name: 'CardEdit', params: {cardId: block._id}}">
                            <BoardCard :boardCard="block"></BoardCard>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
        <router-view />
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import * as Dragula from 'dragula';
    import {debounce} from 'lodash';
    import * as faker from 'faker';
    import AuthApiHelper from '../api/AuthApiHelper';
    import BoardCard from './BoardCard.vue';
    import {BoardCardModel} from "../models/BoardCard.model";

    /**
     * The KanbanBoard
     */
    @Component({
        components: {
            BoardCard
        }
    })
    export default class KanbanBoard extends Vue {
        /**
         * The stage for kanban board
         */
        public stages = ['on-hold', 'in-progress', 'needs-review', 'approved'];

        /**
         * The blocks in kanban board
         */
        public blocks: Array<BoardCardModel> = [];

        /**
         * Get blocks by status
         * @param status Blocks status
         * @return blocks after filter
         */
        public getBlocks(status: string): Array<BoardCardModel> {
            return this.blocks.filter(block => block.status === status);
        }

        /**
         * Update block
         * @param id The id for updating block.
         * @param status The status for updating block.
         */
        public updateBlock(id: string, status: string, index: number): void {

            AuthApiHelper.login();

            debounce(() => {
                this.blocks.find(b => b._id === id).status = status;
            }, 500)(); // need invoke.
        }
    
        public createFakeCard(): void {
            // fake data
            for (let i = 0; i <= 10; i += 1) {

                let item: BoardCardModel = new BoardCardModel();

                item._id = i.toString();
                item.status = this.stages[Math.floor(Math.random() * 4)];
                item.title = faker.company.bs();

                this.blocks.push(item);
            }
        }

        /**
         * Create Dragula instance and bind events when mounted.
         */
        public mounted():  void {
            this.createFakeCard()

            // create Dragula instance
            let drag: Dragula.Drake = Dragula({
                containers: (this.$refs.list) as Element[]
            });

            // bind drag event
            drag.on('drag', (el) => {
                el.classList.add('is-moving');
            });

            // bind drop event
            drag.on('drop', (block, list) => {
                let index;

                for (index = 0; index < list.children.length; index += 1) {
                    if (list.children[index].classList.contains('is-moving')) {
                        break;
                    }
                }

                this.updateBlock( block.dataset.blockId, list.dataset.status, index);
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
                margin-right: 20px;
                cursor: pointer;

                &:hover {
                    background-color: rgba(0, 0, 0, 0.6);
                }
            }

            .memberList {
                display: flex;
                align-items: center;

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

