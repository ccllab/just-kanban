<template>
    <div id="app">
        <section class="section">
            <h4>
                Vue adoptation of Ettric's
                <a href="//codepen.io/ettrics/pen/QbPEeg">Codepen</a>
            </h4>
        </section>
        <KanbanBoard :stages="statuses" :blocks="blocks" @update-block="updateBlock">
            <div v-for="stage in statuses" :slot="stage" :key="stage">
                <h2>
                    {{ stage }}
                    <a>+</a>
                </h2>
            </div>
            <div v-for="item in blocks" :slot="item.id" :key="item.id">
                <BoardCard :boardCard="item"></BoardCard>
            </div>
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
    import AuthApiHelper from "./api/AuthApiHelper";

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
        public updateBlock(id: string, status: string): void {

            AuthApiHelper.login();

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

    body {
        background: #33363D;
        color: white;
        font-family: 'Lato', serif;
        font-weight: 300;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }

    .drag-column {
        .drag-column-header > div {
            width: 100%;
            h2 > a {
                float: right;
            }
        }

        &-on-hold {
            .drag-column-header,
            .is-moved,
            .drag-options {
                background: $on-hold;
            }
        }

        &-in-progress {
            .drag-column-header,
            .is-moved,
            .drag-options {
                background: $in-progress;
            }
        }

        &-needs-review {
            .drag-column-header,
            .is-moved,
            .drag-options{
                background: $needs-review;
            }
        }

        &-approved {
            .drag-column-header,
            .is-moved,
            .drag-options {
                background: $approved;
            }
        }
    }

    .section {
        padding: 20px;
        text-align: center;

        a {
            color: white;
            text-decoration: none;
            font-weight: 300;
        }

        h4 {
            font-weight: 400;
            a {
                font-weight: 600;
            }
        }
    }
</style>
