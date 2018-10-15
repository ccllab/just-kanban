<template>
    <div>
        <div>
            <strong>id:</strong> {{ boardCard.id }}
        </div>
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
