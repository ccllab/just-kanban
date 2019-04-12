import { ICardApiHelper } from './interfaces/card';
import { ApiRequestor } from '../utils/ApiRequestor';
import InjectAuthToken from './middle-process/InjectAuthToken';

export const CardApi: ICardApiHelper = {

  /**
   * createCard
   * @param param parameter
   * @returns ApiRequestor
   */
  createCard(param) {
    return ApiRequestor.request({
      url: '/api/card',
      method: "POST",
      data: param
    }, InjectAuthToken);
  },

  getCardInfo(id) {
    return ApiRequestor.request({
      url: `/api/card/${id}`,
      method: 'POST'
    }, InjectAuthToken);
  },

  updateCard(id, param) {
    return ApiRequestor.request({
      url: `/api/card/${id}`,
      method: 'PATCH',
      data: param
    }, InjectAuthToken);
  },

  createCardComment(id, param) {
    return ApiRequestor.request({
      url: `/api/card/${id}/comment`,
      method: 'POST',
      data: param
    }, InjectAuthToken);
  }
};