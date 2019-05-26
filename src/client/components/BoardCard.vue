<template>
    <div class="card-item" :class="{ isCanEdit: isBoardAdmin || isAssigned }">
        <div>
            {{ card.title }}
            <i class="fas fa-briefcase isAssignedIcon" v-if="isAssigned"></i>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import { Getter } from 'vuex-class';

    import { Card } from '../models/Card.model';
    import { 
        types as boardTypes, 
        IsAssignedCardFunc,
    } from '../store/board/types';

    @Component
    export default class BoardCard extends Vue {
        @Getter(boardTypes.IS_ASSIGNED_CARD) isAssignedCard: IsAssignedCardFunc;
        @Getter(boardTypes.IS_ADMIN) isBoardAdmin: boolean;
        @Prop() public card: Card;

        get isAssigned(): boolean {
            return this.isAssignedCard(this.card);
        }
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
