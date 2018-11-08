<template>
    <div id="app">
        <KanbanBoard :stages="statuses" :blocks="blocks" @update-block="updateBlock">
            <BoardCard v-for="item in blocks" :slot="item.id" :key="item.id" :boardCard="item"></BoardCard>
        </KanbanBoard>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import * as faker from 'faker';
    import {debounce} from 'lodash';
    import KanbanBoard from './components/KanbanBoard.vue';
    import BoardCard from './components/BoardCard.vue';
    import {BoardCardModel} from "./models/BoardCard.model";

    /**
     * Vue app
     */
    @Component({
        components: {
            KanbanBoard,
            BoardCard
        },
    })
    export default class App extends Vue {

        /**
         * The blocks statuses
         */
        public statuses = ['on-hold', 'in-progress', 'needs-review', 'approved'];

        /**
         * The array for storage block.
         */
        public blocks: Array<BoardCardModel> = [];

        /**
         * Set up config after creat App
         */
        public created(): void {
            this.$cookies.set('vue-cookie-test', 'fuckyouass');
        }

        /**
         * push fake data to blocks when mounted
         */
        public mounted():  void {

            // fake data
            for (let i = 0; i <= 10; i += 1) {

                let item: BoardCardModel = new BoardCardModel();

                item.id = i.toString();
                item.status = this.statuses[Math.floor(Math.random() * 4)];
                item.title = faker.company.bs();

                this.blocks.push(item);
            }
        }

        /**
         * Update block
         * @param id The id for updating block.
         * @param status The status for updating block.
         */
        public updateBlock(id: string, status: string, index: number): void {

            console.log(this.$cookies.get('vue-cookie-test'));

            debounce(() => {
                this.blocks.find(b => b.id === id).status = status;
            }, 500)(); // need invoke.
        }
    }
</script>

<style lang="scss">
    @import './assets/kanban.scss';

    $on-hold: #FB7D44;
    $in-progress: #2A92BF;
    $needs-review: #F4CE46;
    $approved: #00B961;

    * {
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
    }

    body {
        color: #17394d;
        background: #33363D;
        line-height: 1.5;
        margin: 0;
        -webkit-font-smoothing: antialiased;
        background-image: url(/img/bkgImg.jpg);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        height: 100vh;
        font-family: Helvetica Neue,Arial,Helvetica,sans-serif;
        overflow: hidden;
    }

    #app {
        display: flex;
        height: 100%;
        flex-direction: column;
    }

    .drag-column {
        .drag-column-header > h2 {
            width: 100%;

            > a {
                float: right;
            }
        }

        &-on-hold {
            .drag-column-header,
            .is-moved .card-item,
            .drag-options {
                background: $on-hold;
            }
        }

        &-in-progress {
            .drag-column-header,
            .is-moved .card-item,
            .drag-options {
                background: $in-progress;
            }
        }

        &-needs-review {
            .drag-column-header,
            .is-moved .card-item,
            .drag-options{
                background: $needs-review;
            }
        }

        &-approved {
            .drag-column-header,
            .is-moved .card-item,
            .drag-options {
                background: $approved;
            }
        }
    }
</style>
