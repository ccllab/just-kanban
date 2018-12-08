import { ICardListApiHelper } from './interfaces/card-list'
import { ApiRequestor } from '../utils/ApiRequestor'
import InjectAuthToken from './middle-process/InjectAuthToken'

export const CardListApi: ICardListApiHelper = {
  getCardLists(boardId) {
    return ApiRequestor.request({
      url: `/api/card-list/${boardId}`,
      method: 'POST'
    }, InjectAuthToken)
  },

  cardChangeStatus(param) {
    return ApiRequestor.request({
      url: '/api/card-list/drag',
      method: 'POST',
      data: param
    }, InjectAuthToken)
  },

  createCardList(boardId, param) {
    return ApiRequestor.request({
      url: `/api/card-list/add/${boardId}`,
      method: 'POST',
      data: param
    }, InjectAuthToken)
  }
}