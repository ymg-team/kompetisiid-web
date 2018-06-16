/**
 * Created by yussan on 28/01/17.
 */

import { requestAPIV2 } from '../../helpers/apiCaller'
import Host from '../../../config/host'

export default function(req, res, next)
{
    // console.log('apa ini', req.header('x-forwarded-for') || req.connection.remoteAddress)

    let API_HOST = ''
    const {method, url, params = {}, headers = {}, nextaction, resType = 'json'} = req.reqdata

  // set api server
    if(req.reqdata.version === 'v42') {
      API_HOST = Host[process.env.NODE_ENV].api_v42
    } else {
      API_HOST = Host[process.env.NODE_ENV].api
    }

    params.API_HOST = API_HOST
    params.resType = resType

    // log
    return requestAPIV2(method, url, params, headers).then(response => {

        // log 
        if(typeof nextaction === 'function'){
          nextaction(req, res, next, response.body)
        } else {
          if(resType === 'json') return res.json(response.body)
          if(resType === 'text') return res.end(response.body)
          if(resType === 'xml'){
              const xml = require('xml')
              res.set('Content-Type', 'text/xml')
              res.end(xml(response.body))
          }
        }
    })
}
