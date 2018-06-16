/**
 * Created by yussan on 28/01/17.
 */
import {POST_DATA, RECEIVE_DATA, RECEIVE_MORE_DATA, DELETE_DATA, REQUEST_DATA} from '../consts'
import {CALL_API} from '../middlewares/api'

export function profile(username)
{
    return {
        [CALL_API] : {
            method: 'get',
            url: `/api/user/${username}`,
            filter: username,
            target: 'user_profile',
            typeWaiting: REQUEST_DATA,
            typeSuccess: RECEIVE_DATA
        }
    }
}

export function login(params)
{
    return {
        [CALL_API] : {
            method: 'post',
            url: '/api/user/login',
            params,
            target: 'user_login',
            typeWaiting: REQUEST_DATA,
            typeSuccess: RECEIVE_DATA
        }
    }
}

export function logout() {
  return {
    [CALL_API] : {
      method: 'post',
      url: '/api/user/logout',
      target: 'user_logout',
      typeWaiting: REQUEST_DATA,
      typeSuccess: RECEIVE_DATA
  }
  }
}

export function register(params)
{
    return {
        [CALL_API] : {
            method: 'post',
            url: '/api/user/register',
            params,
            target: 'user_register',
            typeWaiting: REQUEST_DATA,
            typeSuccess: RECEIVE_DATA
        }
    }
}

export function oauth(type, params)
{
    return {
        [CALL_API] : {
            method: 'post',
            url: `/api/user/oauth/${type}`,
            params,
            target: `user_oauth_${type}`,
            typeWaiting: REQUEST_DATA,
            typeSuccess: RECEIVE_DATA
        }
    }
}

export function emailVerification(token)
{
    return {
        [CALL_API] : {
            method: 'post',
            url: `/api/user/emailverification?token=${token}`,
            target: 'user_email_verification',
            typeWaiting: REQUEST_DATA,
            typeSuccess: RECEIVE_DATA
        }
    }
}

