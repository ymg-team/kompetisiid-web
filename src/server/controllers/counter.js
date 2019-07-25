/**
 * function to fetch count of _super sidebar
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export function fetchSuperSidebar(req, res, next) {
  req.reqdata = {
    version: 'v42',
    method: 'get',
    url: '/v2/counter/_super-sidebar'
  }

  next()
}

/**
 * function to fetch count of _super sidebar
 */
export function fetchDashboardSidebar(req, res, next) {
  req.reqdata = {
    version: 'v42',
    method: 'get',
    url: '/v2/counter/_dashboard-sidebar'
  }

  next()
}
