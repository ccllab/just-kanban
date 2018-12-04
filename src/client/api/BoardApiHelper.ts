import { IBoardApiHelper } from './interfaces/board'
import { ApiRequestor } from './ApiRequestor'

export const BoardApi: IBoardApiHelper = {
  /**
   * Get Board List
   */
  getBoardList() {
    return ApiRequestor.request({
      url: '/api/board/all',
      method: 'POST'
    })
  },

  /**
   * Create Board
   * @param param 
   */
  createBoard(param) {
    return ApiRequestor.request({
      url: '/api/board',
      method: 'POST',
      data: param
    })
  },

  /**
   * Get information of the indicated board
   * @param id Board ID
   */
  getBoardInfo(id) {
    return ApiRequestor.request({
      url: `/api/board/${id}`,
      method: 'POST'
    })
  },

  /**
   * Update the indicated board information
   * @param id Board ID
   * @param param 
   */
  updateBoard(id, param) {
    return ApiRequestor.request({
      url: `/api/board/${id}`,
      method: 'PATCH',
      data: param
    })
  }
}