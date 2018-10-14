import {CALL_API} from './middlewares/api'

/**
 * Created by yussan on 20/10/16.
 */
export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const RECEIVE_MORE_DATA = 'RECEIVE_MORE_DATA'
export const DELETE_DATA = 'DELETE_DATA'
export const POST_DATA = 'POST_DATA'

// for tester
export const expectedAction = {
  [CALL_API]: {
    method: '',
    url: '',
    successType: ''
  }
}