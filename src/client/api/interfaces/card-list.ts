import { BaseResponseData } from './base'

export interface GetCardListResponse extends BaseResponseData {
  cardList: [{
    _id: string,
    name: string,
    cards: [{
      _id: string,
      title: string,
      isAssigned: string
    }]
  }]
}

export interface CardChangeStatusRequest {
  source: {
    _id: string,
    cards: string[]
  },
  distination: {
    _id: string,
    cards: []
  }
}

export interface ICardListApiHelper {
  getCardList(boardId: string): Promise<GetCardListResponse>
  cardChangeStatus(param: CardChangeStatusRequest): Promise<BaseResponseData>
}