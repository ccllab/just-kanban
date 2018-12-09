import { failMiddleProcess } from '../../utils/ApiRequestor'
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
        msg: res.response.data.error,
        duration: 3000
      })
      break
  }
}