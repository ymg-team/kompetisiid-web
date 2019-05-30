import * as Session from '../helpers/session'

/**
 * function to update profile user
 */
export function settingProfile(req, res, next)
{
  req.reqdata = {
    version: "v42",
    method: 'put',
    url: '/v2/settings/profile',
    params: req.body,
    nextaction: (req, res, next, response) => {
      if(response.status == 200) {
        // update session
        Session.setData(req, 'userdata', response.data)
      }   
      return res.json(response)
    }
  }

  next()
}

/**
 * function to setting account user
 */
export function settingAccount(req, res, next) 
{
  req.reqdata = {
    version: "v42",
    method: 'put',
    url: '/v2/settings/account',
    params: req.body,
    nextaction: (req, res, next, response) => {
      if(response.status == 200) {
        // clean session
        Session.destroy(req, 'userdata')
      }   

      return res.json(response)
    }
  }

  next()
}