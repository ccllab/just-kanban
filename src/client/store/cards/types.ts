import { Card } from '../../models/Card.model'

export interface CardState {
  /**
   * 指定看板頁面後的所有卡片
   */
  cardList: Card[],

  /**
   * 查看之指定卡片
   */
  currentCard: Card
}

export const types = {
  // actions
  UPDATE_CARD_STAGE: 'updateCardStage',

  // getters
  CARD_LIST: 'cardList',
  CARD_LIST_BY_STAGE: 'cardListByStage',
  CARD_ASSIGNED: 'cardAssigned',
  CARD_CAN_EDIT: 'cardCanEdit',

  // mutations
  SET_CARD_LIST: 'setCardList',
  SET_RANDOM_CARD_LIST: 'setRandomCardList',
  SET_CARD_STAGE: 'setCardStage'
}