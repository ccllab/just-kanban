<template>
    <div class="card-item">
        <div>
            {{ boardCard.title }}
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {BoardCardModel} from "../models/BoardCard.model";

    /**
     * The board card in KanbanBoard
     */
    @Component
    export default class BoardCard extends Vue {

        /**
         * The board card info.
         */
        @Prop(BoardCardModel) public boardCard: BoardCardModel;
    }
</script>

<style lang="scss">
    .card-item {
        max-height: 150px;
        padding: 10px;
        background: white;
        box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.2);
        border-radius: 2px;
        cursor: pointer;
    }
</style>
