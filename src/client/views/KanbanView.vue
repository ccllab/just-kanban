<template>
    <div id="kanbanView">
        <router-view />
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class KanbanView extends Vue {

}
</script>

<style lang="scss">
    #kanbanView {
        padding-top: 30px;
    }
</style>

