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
    method: 'post',
    url: `/user/emailverification?token=${req.query.token}`,
    params: req.params,
    nextaction: result => {
      if (result.meta.code === 201) {
        let nextdata = req.session.userdata
        if (nextdata) {
          nextdata.data.is_verified = 1
          Session.update(req, 'userdata', nextdata)
        }
      }
    }
  }

  next()
}
