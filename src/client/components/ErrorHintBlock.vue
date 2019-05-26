<template>
  <div id="errHintBlock">
    <transition name="fade">
      <div class="alert alert-danger" role="alert" v-if="errMsg">
        {{ errMsg }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Getter } from 'vuex-class';
  import { types } from '../store/types';

  @Component
  export default class ErrorHintBlock extends Vue {
    @Getter(types.ERROR) errMsg: string
  }

</script>

<style lang="scss">
  #errHintBlock {
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


