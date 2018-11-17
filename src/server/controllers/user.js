/**
 * الرَّحِيم الرَّحْمَنِ اللَّهِ بِسْمِ
 * Created by yussan on 13/11/16.
 */

import * as Session from '../helpers/session'

export function getProfile(req, res, next) {
  req.reqdata = {
    method: 'get',
    params: req.params,
    url: `/user/profile/${req.params.username}`
  }

  next()
}

/**
 * @description function to get username and password and store sessino
 * @param {String} req
 */
export function postLogin(req, res, next) {
  req.reqdata = {
    version: 'v42',
    method: 'post',
    url: '/v2/login',
    params: req.body,
    headers: {
      Authorization: 'yussan-1234567890'
    },
    nextaction: (req, res, next, result) => {
      if (result.status === 200) {
        Session.setData(req, 'userdata', result.data)
      }

      return res.json(result)
    }
  }

  next()
}

export function postOauthLogin(req, res, next) {
  req.reqdata = {
    version: 'v42',
    method: 'post',
    url: '/v2/oauth/login',
    params: req.body,
    headers: {
      Authorization: 'ki-1234567890'
    },
    nextaction: (req, res, next, result) => {
      if (result.status === 200) {
        Session.setData(req, 'userdata', result.data)
      }

      return res.json(result)
    }
  }

  next()
}

/**
 * @description function to handle logout / delete session
 */
export function postLogout(req, res, next) {
  // remove session
  Session.destroy(req, 'userdata')
  return res.json({
    status: 200,
    message: 'logout berhasil'
  })
}

/**
 * @description function to handle register
 */
export function postRegister(req, res, next) {
  req.reqdata = {
    version: 'v42',
    method: 'post',
    url: '/v2/register',
    params: req.body,
    nextaction: (req, res, next, result) => {
      if (result.status === 201) {
        Session.setData(req, 'userdata', result.data)
      }

      return res.json(result)
    }
  }

  next()
}

export function postEmailVerification(req, res, next) {
  req.reqdata = {
    version: 'v42',
    method: 'post',
    url: `/v2/email-verification/${req.params.token}`,
    params: req.params,
    nextaction: (req, res, next, result) => {
      if (result.status === 201) {
        let nextdata = req.session.userdata
        if (nextdata) {
          nextdata.is_verified = 1
          Session.update(req, 'userdata', nextdata)
        }
      }

      return res.json(result)
    }
  }

  next()
}

export function postResendEmailVerification(req, res, next) {
  req.reqdata = {
    version: 'v42',
    method: 'post',
    url: `/v2/email-verification/request`,
    params: {
      user_id: req.session.userdata ? req.session.userdata.id : 0
    }
  }

  next()
}
