import { requestApi } from '../../../../store/helpers/ApiCaller'
import {
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_MORE_DATA
} from '../../../../store/consts'
import { CALL_API } from '../../../../store/middlewares/api'
import { objToQuery } from 'string-manager/dist/modules/httpquery'

/**
 * @description function to request list send competition by parameters
 * @param {Object} params
 * @param {String} params.status, oneof: posted, reject, waiting
 * @param {String} filter
 */
export function fetchRequest(params = {}, filter) {
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

/**
 * @description function to action send competition
 * @param {Number} id, action of request id
 * @param {String} params.note, note will send to sender
 * @param {status} params.status, one of posted, reject 
 */
export function actionRequest(params) {
  return {
    [CALL_API]: {
      typeSuccess: RECEIVE_DATA, 
      typeWaiting: REQUEST_DATA,
      params,
      target: 'action_request_kompetisi',
      method: 'put',
      url: `/api/request/${params.id}`
    }
  }
}
