<template>
  <div id="card-list-creator" :class="{ isEditing }" @click.stop>
    <div class="list-hint" v-if="!isEditing" @click.stop="isEditing = true">
      + Add List
    </div>
    <div class="edit-block" v-if="isEditing">
      <input type="text" 
        placeholder="Enter list title..." 
        v-model="listName"
        @keydown.enter="btnAddClick">
      <button class="btn btn-success btn-add" @click="btnAddClick">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'

import { types as boardTypes, CreateCardListsFunc } from '../store/board/types'

@Component
export default class CardListCreator extends Vue {
  @Action(boardTypes.CREATE_CARD_LIST) createCardList: CreateCardListsFunc

  public listName: string = ''
  public isEditing: boolean = false

  public mounted() {
    window.addEventListener("click", () => {
      this.isEditing = false
    })
  }

  public async btnAddClick() {
    if (!this.listName) return
    
    let result = await this.createCardList(this.listName)
    if (result) {
      this.listName = ''
      this.isEditing = false
    }
  }
}
</script>

<style lang="scss">
  #card-list-creator {
    width: 300px;
    background-color: rgba(0,0,0,.24);
    border-radius: 5px;
    flex-shrink: 0;

    &:hover {
      background-color: rgba(0,0,0,.32);
    }

    &.isEditing {
      background-color: #dfe3e6;
    }

    .list-hint {
      cursor: pointer;
      color: white;
      padding: 5px;
      font-weight: bold;
    }

    .edit-block {
      padding: 5px;

      input {
        width: 100%;
        padding: 5px;
        margin-bottom: 5px;
        border-radius: 5px;
        border: 1px solid #5ba4cf;
        box-shadow: 0 0 0 1px #5ba4cf;
      }

      .btn-add {
        display: block;
      }
    }
  }
</style>


