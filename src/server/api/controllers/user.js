/**
 * الرَّحِيم الرَّحْمَنِ اللَّهِ بِسْمِ
 * Created by yussan on 13/11/16.
 */

import * as Session from '../../helpers/session'

export function getProfile(req, res, next)
{
    req.reqdata = {
        method: 'get',
        params: req.params,
        url: `/user/profile/${req.params.username}`,
    }

    next()
}

export function postLogin(req, res, next)
{
    req.reqdata = {
        version: 'v42',
        method: 'post',
        url: '/v2/login',
        params: req.params,
        nextaction: (req, res, next, result) => {

            if(result.status === 200) {
              Session.setData(req, 'userdata', result.data)
              // req.session.userdata = result.data
              // return req.session.save((err) => {
              //   if(!err)
              //     return res.json(result)
              // })
            }

            return res.json(result)
        }
    }

    next()
}

export function postRegister(req, res, next)
{
    req.reqdata = {
        method: 'post',
        url: '/user/register',
        params: req.params,
        nextaction: result => {
            if(result.meta.code === 201) Session.setData(req, 'userdata', result)
        }
    }

    next()
}

export function postLogout(req, res, next)
{
    req.reqdata = {
        method: 'post',
        url: '/user/logout',
        params: req.params,
        nextaction: result => {
            Session.destroy(req, 'userdata')
        }
    }

    next()
}

export function postEmailVerification(req, res, next)
{
    req.reqdata = {
        method: 'post',
        url: `/user/emailverification?token=${req.query.token}`,
        params: req.params,
        nextaction: result => {
            if(result.meta.code === 201){
                let nextdata = req.session.userdata
                if(nextdata)
                {
                    nextdata.data.is_verified = 1
                    Session.update(req, 'userdata', nextdata)
                }
            }
        }
    }

    next()
}
