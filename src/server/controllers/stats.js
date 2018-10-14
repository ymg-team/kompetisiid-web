/**
 * function to get stats data
 */
export function getStats(req, res, next)
{
  req.reqdata = {
    method: 'get',
    url: '/stats',
  }

  next()
}