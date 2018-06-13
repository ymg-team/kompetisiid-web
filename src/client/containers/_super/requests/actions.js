import { requestApi } from '../../../../store/helpers/ApiCaller'
import {
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_MORE_DATA
} from '../../../../store/consts'
import { CALL_API } from '../../../../store/middlewares/api'
import { objToQuery } from 'string-manager/dist/modules/httpquery'

export function fetchRequest(params = {}, filter){
  return {
    [CALL_API]: {
      typeSuccess: RECEIVE_DATA,
      typeWaiting: REQUEST_DATA,
      filter,
      method: 'get',
      target: 'request_kompetisi',
      url: `/api/request/?${objToQuery(params)}`
    }
  }
}
