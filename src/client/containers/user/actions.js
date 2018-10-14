/**
 * Created by yussan on 28/01/17.
 */
import {
  POST_DATA,
  RECEIVE_DATA,
  RECEIVE_MORE_DATA,
  DELETE_DATA,
  REQUEST_DATA
} from "../../../store/consts"

import { CALL_API } from "../../../store/middlewares/api"

export const LOGOUT = "LOGOUT"
export const LOGIN = "LOGIN"
export const OAUTH_LOGIN = "OAUTH_LOGIN"

export function profile(username) {
  return {
    [CALL_API]: {
      method: "get",
      url: `/api/user/${username}`,
      filter: username,
      target: "user_profile",
      typeWaiting: REQUEST_DATA,
      typeSuccess: RECEIVE_DATA
    }
  }
}

export function login(params) {
  return {
    [CALL_API]: {
      method: "post",
      url: "/api/user/login",
      params,
      type: "LOGIN"
    }
  }
}

export function logout() {
  return {
    [CALL_API]: {
      method: "post",
      url: "/api/user/logout",
      target: "user_logout",
      type: LOGOUT
    }
  }
}

export function register(params) {
  return {
    [CALL_API]: {
      method: "post",
      url: "/api/user/register",
      params,
      target: "user_register",
      typeWaiting: REQUEST_DATA,
      typeSuccess: RECEIVE_DATA
    }
  }
}

/**
 * @description function to do oauth login 
 * @param {string} params.provider oauth provider facebook|google 
 * @param {string} params.token token from  oauth
 * @param {string} params.user_id user id from oauth
 */
export function oauthLogin(params) {
  return {
    [CALL_API]: {
      method: "post",
      url: `/api/user/oauth/login`,
      params,
      type: OAUTH_LOGIN
    }
  }
}

export function emailVerification(token) {
  return {
    [CALL_API]: {
      method: "post",
      url: `/api/user/emailverification?token=${token}`,
      target: "user_email_verification",
      typeWaiting: REQUEST_DATA,
      typeSuccess: RECEIVE_DATA
    }
  }
}
