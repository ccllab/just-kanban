import { ICardListApiHelper } from './interfaces/card-list'
import { ApiRequestor } from './ApiRequestor'

export const CardListApi: ICardListApiHelper = {
  getCardList(boardId) {
    return ApiRequestor.request({
      url: `/api/card-list/${boardId}`,
      method: 'POST'
    })
  },

  cardChangeStatus(param) {
    return ApiRequestor.request({
      url: 'api/card-list/drag',
      method: 'POST',
      data: param
    })
  }
}