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
    params: req.body,
    url: `/v2/request/send`,
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
    url: `/v2/request${query}`
  }

  next()
}

/**
 * @description function to handle action request 
 * @method PUT 
 */
export function actionRequest(req, res, next) {
  req.reqdata = {
    version: 'v42',
    method: 'put',
    headers: {
      Authorization: 'yussan-1234567890'
    },
    params: {
      message: req.body.note,
      status: req.body.status
    },
    url: `/v2/request/action/${req.params.id}`
  }

  next()
}
