/**
 * Created by yussan on 28/01/17.
 */

import { combineReducers } from "redux"
import { setToLoading, receiveData, receiveApiResponse } from "../../../store/helpers/Normalizer"
import { REQUEST_DATA, RECEIVE_DATA } from "../../../store/consts"
import { LOGOUT, OAUTH_LOGIN, LOGIN, REGISTER } from "./actions"

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
  switch(action.type) {
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
  switch(action.type) {
    case REGISTER:
      return receiveApiResponse(state, action) 
    default: 
      return state
  }
}

function logout(state = {}, action) {
  switch (action.type) {
    case LOGOUT:
      if (action.json && action.json.status === 200)
        location.reload()
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
  return state
}

function email_verification(state = {}, action) {
  if (action.target === "user_email_verification") {
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

const reducer = combineReducers({
  profile,
  login,
  register,
  logout,
  session,
  email_verification
})
export default reducer
