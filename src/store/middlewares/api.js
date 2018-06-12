/**
 * Created by yussan on 27/10/16.
 */
import {requestApi} from '../helpers/ApiCaller'
import Host from '../../config/host'

export const CALL_API = Symbol('CALL_API')

export default store => next => action => {

  if (action[CALL_API]) {
    // get data using api v1
    let request = action[CALL_API]
    let {
      typeSuccess, typeWaiting,
      method, url, params,
      filter, target, formdata = {},
      token = '', extradata = {}
    } = request

    return new Promise((resolve, reject) => {
      //on request
      if (typeWaiting) {
        next({
          type: typeWaiting,
          filter,
          target
        })
      }
      //completing request
      requestApi(method, typeof window != 'undefined' ? url : Host[process.env.NODE_ENV].front + url, params, json => {
        // if(method.toLowerCase() === 'post') openNotif(json)

        next({
          type: typeSuccess,
          filter,
          json,
          target,
          extradata
        })

        resolve()
      }, token)
    })
  } else {
    return next(action)
  }
}


