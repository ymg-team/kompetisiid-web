/**
 * Created by yussan on 27/10/16.
 */
import Promise from 'bluebird'
import {requestApi} from '../helpers/ApiCaller'

export const CALL_API = Symbol('CALL_API')

export default store => next => action => {
    if(!action[CALL_API]) return next(action)

    let request = action[CALL_API]
    let {typeSuccess, typeWaiting,
        method, url, params,
        filter, target, formdata = {},
        token = '', extradata = {}} = request

    return new Promise((resolve, reject) => {
        //on request
        if(typeWaiting)
        {
            next({
                type: typeWaiting,
                filter,
                target
            })
        }
        //completing request
        const FRONT_HOST = process.env.FRONT_HOST ? process.env.FRONT_HOST : ''
        requestApi(method, FRONT_HOST+url, params, json => {
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
}


