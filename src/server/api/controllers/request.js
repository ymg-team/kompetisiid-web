import { objToQuery } from "string-manager/dist/modules/httpquery"

/**
 * الرَّحِيم الرَّحْمَنِ اللَّهِ بِسْمِ
 * Created by yussan on 13/11/16.
 */

/**
 * @description function to handle send comeptition by public
 */
 export function sendCompetition(req, res, next)
{
    req.reqdata = {
      version: 'v42',
      method: 'post',
      params: req.params,
      url: `/v2/request`,
  }

  next()
}

/**
 * @description function get list of request 
 */
export function getRequest(req, res, next) {
  const query = req.query ? `?${objToQuery(req.query)}` : ''
  req.reqdata = {
    version: 'v42',
    method: 'get',
    params: req.params,
    url: `/v2/request${query}`
  }

  next()
}
