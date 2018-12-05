<template>
    <div class="card-item" :class="{ isCanEdit }">
        <div>
            {{ boardCard.title }}
            <i class="fas fa-briefcase isAssignedIcon" v-if="isAssigned"></i>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import { Getter } from 'vuex-class'

    import { Card } from '../models/Card.model'

    /**
     * The board card in KanbanBoard
     */
    @Component
    export default class BoardCard extends Vue {
        @Prop(Card) public boardCard: Card;
    }
</script>

<style lang="scss">
    .card-item {
        max-height: 150px;
        padding: 10px;
        background: white;
        box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.2);
        border-radius: 2px;
        position: relative;

        &.isCanEdit {
            cursor: pointer;
        }
    }

    .isAssignedIcon {
        position: absolute;
        font-size: 22px;
        right: 0;
        bottom: 0;
        transform: translate(10%, 35%);
    }
</style>
