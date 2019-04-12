/**
 * function to get stats data
 */
export function getStats(req, res, next)
{
  req.reqdata = {
    version: "v42",
    method: 'get',
    url: '/v2/home-counter',
  }

  next()
}