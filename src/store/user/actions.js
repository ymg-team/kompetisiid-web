/**
 * Created by yussan on 28/01/17.
 */
import {
  RECEIVE_DATA,
  REQUEST_DATA
} from "../consts"

import { CALL_API } from "../middlewares/api"
import sealMiddleware from "../../client/helpers/seal"
import { objToQuery } from "string-manager/dist/modules/httpquery"

export const LOGOUT = "LOGOUT"
export const LOGIN = "LOGIN"
export const REGISTER = "REGISTER"
export const OAUTH_LOGIN = "OAUTH_LOGIN"
export const OAUTH_REGISTER = "OAUTH_REGISTER"
export const EMAIL_VERIFICATION = "EMAIL_VERIFICATION"
export const RESEND_EMAIL_VALIDATION_TOKEN = "RESEND_EMAIL_VALIDATION_TOKEN"
export const FETCH_COUNT_SUPER_SIDEBAR = "FETCH_COUNT_SUPER_SIDEBAR"
export const FORGOT_PASSWORD = "FORGOT_PASSWORD"
export const CHANGE_PASSWORD = "CHANGE_PASSWORD"
export const FETCH_USERS = "FETCH_USERS"
export const FETCH_MORE_USERS = "FETCH_MORE_USERS"

/**
 * function to fetch members
 * @param {string} filter
 * @param {string} email
 */
export function fetchUsers({query, filter}) {
  return {
    [CALL_API] : {
      url: `/api/user/list/${sealMiddleware.generateSeal()}${query ? `?${objToQuery(query)}` : ""}`,
      method: "GET",
      type: query.lastid ? FETCH_MORE_USERS : FETCH_USERS,
      filter
    }
  }
}

/**
 * function to forgot password
 * @param {string} filter
 * @param {string} email
 */
export function forgotPassword({filter, email}) {
  return {
    [CALL_API] : {
      url: `/api/user/forgot-password/${sealMiddleware.generateSeal()}`,
      method: "POST",
      filter,
      params : {
        email
      },
      type: FORGOT_PASSWORD
    }
  }
}

/**
 * function to change password
 * @param {string} params.filter
 * @param {string} params.token
 * @param {string} params.password
 * @param {string} params.password_conf
 */
export function changePassword(params = {}) {
  const {filter} = params
  return {
    [CALL_API]: {
      url: `/api/user/change-password/${sealMiddleware.generateSeal()}`,
      method: "POST",
      filter,
      params,
      type: CHANGE_PASSWORD
    }
  }
}


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

// export function emailValidation() {}

export function resendEmailValidationToken(params) {
  return {
    [CALL_API]: {
      type: RESEND_EMAIL_VALIDATION_TOKEN,
      method: "post",
      url: `/api/user/resend-email-verification/${sealMiddleware.generateSeal()}`
    }
  }
}

// /**
//  * @description function to do oauth register
//  * @param {string} params.provider oauth provider facebook|google
//  * @param {string} params.token token from  oauth
//  * @param {string} params.user_id user id from oauth
//  */
// export function oauthRegister(params) {
//   return {
//     [CALL_API]: {
//       method: "post",
//       url: `/api/user/oauth/register`,
//       params,
//       type: OAUTH_REGISTER
//     }
//   }
// }

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

/**
 * @description function to verification email
 * @param {string} token , token from email inbox
 */
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
 * @description function to fetch count of _super sidebar
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

/**
 * @description function to fetch count
 */
export function fetchCountDashboardSidebar() {
  return {
    [CALL_API]: {
      url: `/api/counter/dashboard-sidebar/${sealMiddleware.generateSeal()}`,
      method: "get",
      type: FETCH_COUNT_SUPER_SIDEBAR,
      filter: "count_super_sidebar"
    }
  }
}
