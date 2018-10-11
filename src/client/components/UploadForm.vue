<template>
    <div class="dropper">
        <!-- $ 代表告訴 vue 要拿接到的事件下面 target.files -->
        <input type="file" multiple @change="uploadImages($event.target.files)" accept="image/*"/>
        <span>Drag files here!</span>
    </div>
</template>

<script lang="ts">
    import {Action} from 'vuex-class';
    import {Vue, Component} from 'vue-property-decorator';

    /**
     * 上傳圖片表單區塊
     */
    @Component
    export default class UploadForm extends Vue {

        /**
         * 上傳圖片
         */
        @Action('uploadImages') public uploadImages;
    }
</script>

<style scoped>
    .dropper {
        height: 30vh;
        border: 2px dashed black;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .dropper:hover {
        background-color: #eee;
    }

    input {
        width: 100%;
        height: 30vh;
        position: absolute;
        opacity: 0;
    }
</style>