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
import sealMiddleware from '../../helpers/seal'

export const LOGOUT = "LOGOUT"
export const LOGIN = "LOGIN"
export const REGISTER = "REGISTER"
export const OAUTH_LOGIN = "OAUTH_LOGIN"
export const EMAIL_VERIFICATION = "EMAIL_VERIFICATION"
export const RESEND_EMAIL_VALIDATION_TOKEN = "RESEND_EMAIL_VALIDATION_TOKEN"
export const FETCH_COUNT_SUPER_SIDEBAR = "FETCH_COUNT_SUPER_SIDEBAR"

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
      url: `/api/user/login/${sealMiddleware.generateSeal()}`,
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
      type: REGISTER,
      method: "post",
      url: `/api/user/register/${sealMiddleware.generateSeal()}`,
      params
    }
  }
}

export function emailValidation() {
}

export function resendEmailValidationToken(params) {
  return {
    [CALL_API]: {
      type: RESEND_EMAIL_VALIDATION_TOKEN,
      method: "post",
      url: `/api/user/resend-email-verification/${sealMiddleware.generateSeal()}`
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
      url: `/api/user/email-verification/${token}`,
      type: EMAIL_VERIFICATION
    }
  }
}

export function getStats() {
  return {
    [CALL_API]: {
      url: `/api/stats/${sealMiddleware.generateSeal()}`,
      method: "get",
      typeWaiting: REQUEST_DATA,
      typeSuccess: RECEIVE_DATA,
      target: "stats"
    }
  }
}

/**
 * @description function to fetch count of super sidebar
 */
export function fetchCountSuperSidebar() {
  return {
    [CALL_API]: {
      url: `/api/counter/super-sidebar/${sealMiddleware.generateSeal()}`,
      method: "get",
      type: FETCH_COUNT_SUPER_SIDEBAR,
      filter: "count_super_sidebar"
    }
  }
}