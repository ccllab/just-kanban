interface CardContructParameters {
  _id: string
  title: string
  status: string,
  index: number
}

export class Card {
  /**
   * pk
   */
  public _id: string;

  /**
   * Board block title
   */
  public title: string;

  /**
   * Board block status
   */
  public status: string;

  constructor(para: CardContructParameters) {
    Object.assign(this, para)
  }
}

export interface CardState {
  cardList: Card[]
}