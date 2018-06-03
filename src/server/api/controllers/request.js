/**
 * الرَّحِيم الرَّحْمَنِ اللَّهِ بِسْمِ
 * Created by yussan on 13/11/16.
 */

/**
 * function to handle send comeptition by public
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
