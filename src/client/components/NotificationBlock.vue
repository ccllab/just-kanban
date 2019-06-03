<template>
    <div id="notificationBlock">
        <transition name="fade">
            <div class="alert alert-info" role="alert" v-if="notificationMessage">
                {{ notificationMessage }}
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';
    import { types } from '../store/socket/types';

    @Component
    export default class NotificationBlock extends Vue {
        @Getter(types.MESSAGES) notificationMessage: string
    }

</script>

<style lang="scss">
    #notificationBlock {
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        margin-top: 70px;
        z-index: 10;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>