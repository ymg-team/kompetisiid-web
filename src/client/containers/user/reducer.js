/**
 * Created by yussan on 28/01/17.
 */

import { combineReducers } from "redux"
import { setToLoading, receiveData, receiveApiResponse } from "../../../store/helpers/Mutations"
import { alert } from "../../components/Alert"
import { REQUEST_DATA, RECEIVE_DATA } from "../../../store/consts"
import {
  LOGOUT,
  OAUTH_LOGIN,
  LOGIN,
  REGISTER,
  RESEND_EMAIL_VALIDATION_TOKEN,
  EMAIL_VERIFICATION
} from "./actions"

function profile(state = {}, action) {
  if (action.target === "user_profile") {
    switch (action.type) {
      case REQUEST_DATA:
        return setToLoading(state, action)

      case RECEIVE_DATA:
        return receiveData(state, action)

      default:
        return state
    }
  }

  return state
}

function login(state = {}, action) {
  switch (action.type) {
    case OAUTH_LOGIN:
    case LOGIN:
      return receiveApiResponse(state, action)
    case LOGOUT:
      return {}
    default:
      return state
  }
}

function register(state = {}, action) {
  switch (action.type) {
    case REGISTER:
      return receiveApiResponse(state, action)
    default:
      return state
  }
}

function logout(state = {}, action) {
  switch (action.type) {
    case LOGOUT:
      if (action.json && action.json.status === 200) location.href = "/"
      return state
    default:
      if (action.target === "user_logout") {
        switch (action.type) {
          case REQUEST_DATA:
            state.is_loading = true
            return Object.assign({}, state)

          case RECEIVE_DATA:
            state.is_loading = false
            return Object.assign({}, state, action.json)

          default:
            return state
        }
      }

      return state
  }
}

function session(state = {}, action) {
  switch (action.type) {
    default:
      return state
  }
}

/**
 * @description versatile redux store properties
 */
function etc(state = {}, action) {
  switch (action.type) {
    case EMAIL_VERIFICATION:
      if (action.json && action.json.status) {
        alert(
          true,
          action.json.message,
          action.json.status === 201 ? "success" : "error"
        )
        if (action.json.status === 201)
          setTimeout(() => {
            location.href = "/"
          }, 1500)
        state.email_verification = action.json
        return Object.assign({}, state)
      }
      return state
    case RESEND_EMAIL_VALIDATION_TOKEN:
      if (action.json && action.json.status) {
        alert(
          true,
          action.json.message,
          action.json.status === 200 ? "success" : "error"
        )
      }
      return state
    default:
      return state
  }
}

const reducer = combineReducers({
  profile,
  login,
  register,
  logout,
  session,
  etc
})
export default reducer
