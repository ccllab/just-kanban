import { IBoardApiHelper } from './interfaces/board';
import { ApiRequestor } from '../utils/ApiRequestor';
import InjectAuthToken from './middle-process/InjectAuthToken';

export const BoardApi: IBoardApiHelper = {

  /**
   * Get Board List
   * @returns ApiRequestor
   */
  getBoardList() {
    return ApiRequestor.request({
      url: '/api/board/all',
      method: 'POST'
    }, InjectAuthToken);
  },

  /**
   * Create Board
   * @param param parameter
   * @returns ApiRequestor
   */
  createBoard(param) {
    return ApiRequestor.request({
      url: '/api/board',
      method: 'POST',
      data: param
    }, InjectAuthToken);
  },

  /**
   * Get information of the indicated board
   * @param id Board ID
   * @returns ApiRequestor
   */
  getBoardInfo(id) {
    return ApiRequestor.request({
      url: `/api/board/${id}`,
      method: 'POST'
    }, InjectAuthToken);
  },

  /**
   * Update the indicated board information
   * @param id Board ID
   * @param param parameter
   * @returns ApiRequestor
   */
  updateBoard(id, param) {
    return ApiRequestor.request({
      url: `/api/board/${id}`,
      method: 'PATCH',
      data: param
    }, InjectAuthToken);
  }
};