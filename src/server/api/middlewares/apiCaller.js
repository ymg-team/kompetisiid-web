/**
 * Created by yussan on 28/01/17.
 */

import {requestAPIV2} from '../../helpers/apiCaller'

export default function(req, res)
{
    const {method, url, params = {}, nextaction, resType = 'json'} = req.reqdata
    const debugApiReq = require('debug')('app:api-req')
    const debugApiRes = require('debug')('app:api-res')

    params.resType = resType
    // log
    debugApiReq(`${method.toUpperCase()} ${url} at ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`)
    return requestAPIV2(method, url, params).then(response => {

        // log 
        debugApiRes(`${method.toUpperCase()} ${url} response status ${response.statusCode} at ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`)
        if(nextaction) nextaction(result)
        if(resType === 'json') res.json(response.body)
        if(resType === 'text') res.end(response.body)
        if(resType === 'xml'){
            const xml = require('xml')
            res.set('Content-Type', 'text/xml')
            res.end(xml(response.body))
        }
    })
}