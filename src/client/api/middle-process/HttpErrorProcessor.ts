import { failMiddleProcess } from '../ApiRequestor'
import store from '../../store'
import { types } from '../../store/types'

export const HttpErrorProcessor: failMiddleProcess = (res) => {
  switch (res.response.status) {
    case 401:
      store.dispatch(types.SHOW_ERROR, {
        msg: '權限不足！',
        duration: 3000
      })
      break

    default:
      store.dispatch(types.SHOW_ERROR, {
        msg: '發生了一些錯誤！',
        duration: 3000
      })
      break
  }
}