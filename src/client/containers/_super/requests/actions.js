import { requestApi } from '../../../../store/helpers/ApiCaller'
import {
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_MORE_DATA
} from '../../../../store/consts'

export function fetchRequest(params, filter){
  return {
    [CALL_API]: {
      typeSuccess: RECEIVE_DATA,
      typeWaiting: REQUEST_DATA,
      filter,
      method: 'get',
      target: 'kompetisi_jelajah',
      url: `${url}?${queryToObj(params)}`
    }
  }
}
