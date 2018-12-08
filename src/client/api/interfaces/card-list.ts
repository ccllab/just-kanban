import { BaseResponseData } from './base'
import { User } from '../../models/User.model'
import { Card } from '../../models/Card.model'

export interface CardChangeStatusRequest {
  source: {
    _id: string,
    cards: string[]
  },
  distination: {
    _id: string,
    cards: string[]
  }
}
export interface CreateCardListRequest {
  cardListName: string
}

export interface GetCardListResponseData extends BaseResponseData {
  array: [{
    _id: string,
    name: string,
    cards: [Card]
  }]
}
export interface CreateCardListResponseData extends BaseResponseData {
  _id: string,
  name: string
}

export interface ICardListApiHelper {
  getCardLists(boardId: string): Promise<GetCardListResponseData>
  createCardList(boardId: string, param: CreateCardListRequest): Promise<CreateCardListResponseData>
  cardChangeStatus(param: CardChangeStatusRequest): Promise<BaseResponseData>
}