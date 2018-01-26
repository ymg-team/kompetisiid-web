/**
 * Created by yussan on 13/11/16.
 */

import {requestAPI} from '../../helpers/apiCaller'

export function postCepat(params, callback)
{
    return requestAPI('post', '/pasang/cepat', params, response => {
        callback(response)
    })
}