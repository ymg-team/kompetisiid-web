/**
 * Created by yussan on 13/11/16.
 */
import {POST_DATA, RECEIVE_DATA, RECEIVE_MORE_DATA, DELETE_DATA, REQUEST_DATA} from '../../../store/consts'
import {CALL_API} from '../../../store/middlewares/api'
export function submitCepat(params)
{
  return {
    [CALL_API] : {
      method: 'post',
      url: '/api/request/send-competition',
      params,
      target: 'pasang_cepat',
      typeWaiting: REQUEST_DATA,
      typeSuccess: RECEIVE_DATA
    }
  }
}
