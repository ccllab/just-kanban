interface CardContructParameters {
  _id: string
  title: string
  status: string,
  index: number,
  assigned: string[]
}

export class Card {
  /**
   * pk
   */
  public _id: string;

  /**
   * Board card title
   */
  public title: string;

  /**
   * Board card status
   */
  public status: string;

  /**
   * Users who are assigned to this card.
   */
  public assigned: string[]

  constructor(para: CardContructParameters) {
    Object.assign(this, para)
  }
}

export interface CardState {
  cardList: Card[]
}

export const types = {
  // actions
  UPDATE_CARD_STAGE: 'updateCardStage',

  // getters
  CARD_LIST: 'cardList',
  CARD_LIST_BY_STAGE: 'cardListByStage',
  CARD_ASSIGNED: 'cardAssigned',

  // mutations
  SET_CARD_LIST: 'setCardList',
  SET_RANDOM_CARD_LIST: 'setRandomCardList',
  SET_CARD_STAGE: 'setCardStage'
}