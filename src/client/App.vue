<template>
    <div>
        <AppHeader></AppHeader>
        <div class="ui container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import AppHeader from './components/AppHeader';

    /**
     * Vue app
     */
    @Component({
        components: {
            AppHeader
        },
    })
    export default class App extends Vue {
    }
</script>
