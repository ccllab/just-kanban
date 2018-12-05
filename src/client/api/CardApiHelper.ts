import { ICardApiHelper } from './interfaces/card'
import { ApiRequestor } from '../utils/ApiRequestor'

export const CardApi: ICardApiHelper = {
  createCard(param) {
    return ApiRequestor.request({
      url: '/api/card',
      method: "POST",
      data: param
    })
  },

  getCardInfo(id) {
    return ApiRequestor.request({
      url: `/api/card/${id}`,
      method: 'POST'
    })
  },

  updateCard(id, param) {
    return ApiRequestor.request({
      url: `/api/card/${id}`,
      method: 'PATCH',
      data: param
    })
  },

  createCardComment(id, param) {
    return ApiRequestor.request({
      url: `/api/card/${id}/comment`,
      method: 'POST',
      data: param
    })
  }
}