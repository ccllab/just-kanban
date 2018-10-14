<template>
    <div class="drag-container">
        <ul class="drag-list">
            <li v-for="stage in stages" class="drag-column" :class="{['drag-column-' + stage]: true}" :key="stage">
                <span class="drag-column-header">
                  <slot :name="stage">
                    <h2>{{ stage }}</h2>
                  </slot>
                </span>
                <div class="drag-options"></div>
                <ul class="drag-inner-list" ref="list" :data-status="stage">
                    <li class="drag-item" v-for="block in getBlocks(stage)" :data-block-id="block.id" :key="block.id">
                        <slot :name="block.id">
                            <strong>{{ block.status }}</strong>
                            <div>{{ block.id }}</div>
                        </slot>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import * as Dragula from 'dragula';
    import {BoardCardModel} from "../models/BoardCard.model";

    @Component
    export default class KanbanBoard extends Vue {

        /**
         * The stage for kanban board
         */
        @Prop(Array) public stages: Array<string>;

        /**
         * The blocks in kanban board
         */
        @Prop(Array) public blocks: Array<BoardCardModel>;

        /**
         * computed, get blocks
         */
        public get localBlocks(): Array<BoardCardModel> {

            return this.blocks;
        }

        /**
         * Get blocks by status
         * @param status Blocks status
         * @return blocks after filter
         */
        public getBlocks(status: string): Array<BoardCardModel> {

            return this.localBlocks.filter(block => block.status === status);
        }

        /**
         * Create Dragula instance and bind events when mounted.
         */
        public mounted():  void {

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

                this.$emit('update-block', block.dataset.blockId, list.dataset.status, index);
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
