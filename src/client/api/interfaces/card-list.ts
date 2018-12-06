import { BaseResponseData } from './base'

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
export interface CreateCardListRequest {
  cardListName: string
}

export interface GetCardListResponseData extends BaseResponseData {
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
export interface CreateCardListResponseData extends BaseResponseData {
  _id: string,
  name: string
}

export interface ICardListApiHelper {
  getCardList(boardId: string): Promise<GetCardListResponseData>
  createCardList(boardId: string, param: CreateCardListRequest): Promise<CreateCardListResponseData>
  cardChangeStatus(param: CardChangeStatusRequest): Promise<BaseResponseData>
}