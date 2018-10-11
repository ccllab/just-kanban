<template>
    <div>
        <div v-if="isLoggedIn" class="image-container">
            <img v-for="image in allImages" :src="image.link" :key="image.id"/>
        </div>
        <h2 v-else>Login to get started.</h2>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    import {Getter, Action} from 'vuex-class';

    /**
     * 圖片清單
     */
    @Component
    export default class ImageList extends Vue {

        /**
         * 圖片集合
         */
        @Getter('allImages') public allImages;

        /**
         * 是否登入
         */
        @Getter('isLoggedIn') public isLoggedIn;

        /**
         * 載入登入者的圖片
         */
        @Action('fetchImages') public fetchImages;

        /**
         * 元件建立完成後呼叫
         */
        public created() {
            if (this.isLoggedIn) {
                this.fetchImages();
            }
        }
    }
</script>

<style scoped>
    .image-container {
        column-count: 3;
        column-gap: 0;
    }

    img {
        max-width: 100%;
        padding: 5px;
    }
</style>