import { failMiddleProcess } from '../../utils/ApiRequestor';
import store from '../../store';
import { types as rootTypes } from '../../store/types';
import { types as authTypes } from '../../store/auth/types';

/**
 * HttpErrorProcessor
 * @param res res
 */
export const HttpErrorProcessor: failMiddleProcess = (res) => {
  switch (res.response.status) {
    case 401:
      let isAuthenticated = store.getters[authTypes.IS_AUTHENTICATED];
      if (!isAuthenticated) break;

      store.dispatch(rootTypes.SHOW_ERROR, {
        msg: '權限不足！',
        duration: 3000
      });
      break;

    default:
      store.dispatch(rootTypes.SHOW_ERROR, {
        msg: res.response.data.error,
        duration: 3000
      });
      break;
  }
};