/**
 * function to fetch count of super sidebar
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export function fetchSuperSidebar(req, res, next) {
  req.reqdata = {
    version: 'v42',
    method: 'get',
    url: '/v2/counter/super-sidebar'
  }

  next()
}
